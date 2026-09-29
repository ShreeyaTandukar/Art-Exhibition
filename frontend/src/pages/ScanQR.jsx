import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  QrCode,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import QRScanner from "../components/scanner/QRScanner";
import PremiumFooter from "../components/premium/PremiumFooter";
import HeritageLoader from "../components/HeritageLoader";

import { extractQrId } from "../utils/qr";
import { fetchHeritageByQrId } from "../services/heritageService";
import { getArtByQrId } from "../data/exhibitionArts";

const ScanQR = () => {
  const navigate = useNavigate();

  // "scanning" | "looking-up" | "success-loader" | "error"
  const [status, setStatus] = useState("scanning");
  const [errorMessage, setErrorMessage] = useState("");
  const [canRetry, setCanRetry] = useState(true);

  const [scannedSite, setScannedSite] = useState(null);

  const handleResult = useCallback(
    async (rawText) => {
      const qrId = extractQrId(rawText);

      if (!qrId) {
        setErrorMessage(
          "This QR code is not a valid HeritageLink QR code."
        );
        setCanRetry(true);
        setStatus("error");
        return;
      }

      setStatus("looking-up");

      try {
        let site = null;

        try {
          site = await fetchHeritageByQrId(qrId);
        } catch {
          // API unavailable — try the local exhibition catalogue.
          site = getArtByQrId(qrId);
        }

        if (!site?.slug) {
          // Last try: static catalogue by QR id.
          site = getArtByQrId(qrId);
        }

        if (!site?.slug) {
          setErrorMessage(
            "This HeritageLink QR code is no longer available."
          );
          setCanRetry(true);
          setStatus("error");
          return;
        }

        // Save the artwork that was scanned.
        setScannedSite(site);

        // QR successfully validated.
        setStatus("success-loader");
      } catch (error) {
        const serverMessage = error.response?.data?.message;
        const httpStatus = error.response?.status;

        if (httpStatus === 404) {
          setErrorMessage(
            serverMessage ||
              "This QR code is not a valid HeritageLink QR code."
          );
        } else if (httpStatus === 410) {
          setErrorMessage(
            serverMessage ||
              "This HeritageLink QR code is no longer available."
          );
        } else if (!error.response) {
          setErrorMessage(
            "We couldn't reach HeritageLink. Check your connection and try again."
          );
        } else {
          setErrorMessage(
            serverMessage ||
              "Something went wrong reading that QR code."
          );
        }

        setCanRetry(true);
        setStatus("error");
      }
    },
    []
  );

  const scanAgain = () => {
    setErrorMessage("");
    setScannedSite(null);
    setStatus("scanning");
  };

  // Full-screen branded loader after successful QR validation.
  if (status === "success-loader") {
    return (
      <HeritageLoader
        message="Opening Heritage Collection..."
        duration={2200}
        onComplete={() => {
          if (scannedSite?.slug) {
            navigate(`/premium/${scannedSite.slug}`, {
              replace: true,
            });
          } else {
            navigate("/", {
              replace: true,
            });
          }
        }}
      />
    );
  }

  // Inline branded loader while looking up the QR.
  if (status === "looking-up") {
    return (
      <HeritageLoader message="Finding this heritage place..." />
    );
  }

  return (
    <div className="min-h-screen bg-[#EFE8DE] flex flex-col">
      {/* Header */}
      <div className="bg-[#4B2E2A] rounded-b-3xl px-6 md:px-8 py-6 text-white">
        <button
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center gap-2 text-sm font-semibold text-[#D6A94F]"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="flex items-center gap-3">
          <QrCode size={26} className="text-[#D6A94F]" />

          <div>
            <p className="text-[#D6A94F] text-xs uppercase tracking-widest font-semibold">
              HeritageLink
            </p>

            <h1 className="text-2xl font-bold">
              Scan More QR
            </h1>
          </div>
        </div>

        <p className="mt-3 text-sm text-[#E8DCC8] leading-6">
          Point your camera at a HeritageLink QR code to open
          the heritage collection.
        </p>
      </div>

      <div className="flex-1 px-5 md:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-lg p-5 md:p-8">
          {status === "scanning" && (
            <QRScanner
              onResult={handleResult}
              active
            />
          )}

          {status === "error" && (
            <div className="py-14 flex flex-col items-center gap-5 text-center px-4">
              <div className="w-20 h-20 rounded-full bg-[#FFF5D8] flex items-center justify-center">
                <AlertCircle
                  size={38}
                  className="text-[#7B1E23]"
                />
              </div>

              <p className="text-[#4B2E2A] font-semibold text-lg leading-7 max-w-sm">
                {errorMessage}
              </p>

              {canRetry && (
                <button
                  onClick={scanAgain}
                  className="mt-2 bg-[#7B1E23] hover:bg-[#65161B] text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition"
                >
                  <RefreshCw size={18} />
                  Scan Again
                </button>
              )}

              <button
                onClick={() => navigate("/passport")}
                className="text-sm font-semibold text-[#7B1E23] underline underline-offset-4"
              >
                Back to my badge
              </button>
            </div>
          )}
        </div>
      </div>

      <PremiumFooter />
    </div>
  );
};

export default ScanQR;

