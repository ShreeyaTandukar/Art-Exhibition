import React, { useEffect, useRef, useState, useCallback } from "react";
import { Camera, CameraOff, Upload, Loader2 } from "lucide-react";
import jsQR from "jsqr";

// A deliberately narrow component: it opens a camera, watches for a QR
// code, and reports the raw decoded text upward. It does not know what a
// heritage place is, does not know whether anyone is logged in, and never
// touches the badge. All of that lives in the page that uses it.
//
// Props:
//   onResult(rawText)  — called once per successful decode
//   active             — set false to freeze the camera (e.g. while the
//                        page is showing a result or an error)
const QRScanner = ({ onResult, active = true }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const frameRef = useRef(null);

  // Guards against firing onResult repeatedly for the same code while the
  // parent is still deciding what to do with it.
  const lockedRef = useRef(false);

  // "starting" | "scanning" | "denied" | "unavailable"
  const [cameraState, setCameraState] = useState("starting");
  const [uploadError, setUploadError] = useState("");

  const stopCamera = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  const handleDecoded = useCallback(
    (text) => {
      if (lockedRef.current) return;

      lockedRef.current = true;
      stopCamera();
      onResult(text);
    },
    [onResult, stopCamera]
  );

  // The scanning loop: pull the current video frame into an offscreen
  // canvas and let jsQR look at the pixels.
  const scanFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || lockedRef.current) return;

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      const width = video.videoWidth;
      const height = video.videoHeight;

      if (width && height) {
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d", { willReadFrequently: true });
        context.drawImage(video, 0, 0, width, height);

        const imageData = context.getImageData(0, 0, width, height);
        const code = jsQR(imageData.data, width, height, {
          inversionAttempts: "dontInvert",
        });

        if (code?.data) {
          handleDecoded(code.data);
          return;
        }
      }
    }

    frameRef.current = requestAnimationFrame(scanFrame);
  }, [handleDecoded]);

  useEffect(() => {
    let cancelled = false;

    const startCamera = async () => {
      // Covers desktops with no webcam and browsers that block getUserMedia
      // outside a secure context.
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraState("unavailable");
        return;
      }

      setCameraState("starting");

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // iOS Safari will not autoplay without these attributes set.
          videoRef.current.setAttribute("playsinline", "true");
          await videoRef.current.play();
        }

        setCameraState("scanning");
        frameRef.current = requestAnimationFrame(scanFrame);
      } catch (error) {
        if (cancelled) return;

        const denied =
          error?.name === "NotAllowedError" ||
          error?.name === "SecurityError" ||
          error?.name === "PermissionDeniedError";

        setCameraState(denied ? "denied" : "unavailable");
      }
    };

    if (active) {
      lockedRef.current = false;
      startCamera();
    }

    return () => {
      cancelled = true;
      stopCamera();
    };
  }, [active, scanFrame, stopCamera]);

  // FALLBACK — decode a photo of a QR code instead of using the camera.
  // This is what makes the scanner usable on a laptop with no webcam, or
  // after someone has permanently blocked camera permission.
  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];

    // Let the same file be chosen twice in a row.
    event.target.value = "";

    if (!file) return;

    setUploadError("");

    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        canvas.width = image.width;
        canvas.height = image.height;

        const context = canvas.getContext("2d", { willReadFrequently: true });
        context.drawImage(image, 0, 0);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );

        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code?.data) {
          handleDecoded(code.data);
        } else {
          setUploadError(
            "No QR code found in that image. Try a clearer, closer photo."
          );
        }
      };

      image.onerror = () => {
        setUploadError("That file could not be opened as an image.");
      };

      image.src = reader.result;
    };

    reader.onerror = () => {
      setUploadError("That file could not be read.");
    };

    reader.readAsDataURL(file);
  };

  const showCamera = cameraState === "starting" || cameraState === "scanning";

  return (
    <div className="w-full">
      {/* Viewfinder */}
      <div className="relative w-full aspect-square max-w-sm md:max-w-md mx-auto rounded-3xl overflow-hidden bg-[#2C1A18] border border-[#6A4A46] shadow-lg">
        {showCamera ? (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              playsInline
            />

            {/* Scanning frame */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-2/3 h-2/3">
                <span className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-[#D6A94F] rounded-tl-2xl" />
                <span className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-[#D6A94F] rounded-tr-2xl" />
                <span className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-[#D6A94F] rounded-bl-2xl" />
                <span className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-[#D6A94F] rounded-br-2xl" />
              </div>
            </div>

            {cameraState === "starting" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#2C1A18]/90 text-[#F5E6B8]">
                <Loader2 size={30} className="animate-spin text-[#D6A94F]" />
                <p className="text-sm">Starting camera...</p>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center text-[#F5E6B8]">
            <CameraOff size={44} className="text-[#D6A94F]" />

            <p className="font-semibold">
              {cameraState === "denied"
                ? "Camera permission is required"
                : "Camera unavailable"}
            </p>

            <p className="text-sm text-[#E8DCC8] leading-6">
              {cameraState === "denied"
                ? "HeritageLink needs camera access to read QR codes. Allow it in your browser's address bar, then reload — or upload a photo of the QR code instead."
                : "No camera could be opened on this device. You can upload a photo of the QR code instead."}
            </p>
          </div>
        )}
      </div>

      {/* Instruction */}
      {showCamera && (
        <p className="mt-6 text-center text-[#4B2E2A] font-semibold flex items-center justify-center gap-2">
          <Camera size={18} className="text-[#D6A94F]" />
          Scan a HeritageLink QR Code
        </p>
      )}

      {/* Image upload fallback — always offered, not just on failure */}
      <div className="mt-6 max-w-sm md:max-w-md mx-auto">
        <label className="w-full border-2 border-[#D6A94F] rounded-2xl py-3 text-[#7B1E23] font-bold flex items-center justify-center gap-2 hover:bg-[#FFF5D8] transition cursor-pointer">
          <Upload size={18} />
          Upload a QR code image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileUpload}
          />
        </label>

        {uploadError && (
          <p className="mt-3 text-center text-sm text-[#7B1E23]">
            {uploadError}
          </p>
        )}
      </div>

      {/* Offscreen workspace for both camera frames and uploaded images */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default QRScanner;
