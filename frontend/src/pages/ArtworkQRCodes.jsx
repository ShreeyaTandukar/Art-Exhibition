import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { fetchAllHeritage } from "../services/heritageService";
import HeritageLoader from "../components/HeritageLoader";

const ArtworkQRCodes = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadArtworks = async () => {
      try {
        setLoading(true);
        setError("");

        const allSites = await fetchAllHeritage();
        setSites(allSites);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Could not load the artworks."
        );
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, []);

  // Builds the URL stored inside the QR code.
  // encodeURIComponent keeps slugs with spaces / apostrophes safe.
  const getArtworkUrl = (site) =>
    `${window.location.origin}/premium/${encodeURIComponent(site.slug)}`;

  const downloadQRCode = (site) => {
    const svg = document.getElementById(`qr-${site._id}`);

    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);

    // The QR itself is drawn at qrSize, surrounded by a white
    // border (quiet zone). Without this border, scanners often
    // fail to detect the downloaded image.
    const qrSize = 1000;
    const margin = 150;
    const totalSize = qrSize + margin * 2;

    const canvas = document.createElement("canvas");
    canvas.width = totalSize;
    canvas.height = totalSize;

    const context = canvas.getContext("2d");

    const img = new Image();

    img.onload = () => {
      // White background for the whole image
      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, totalSize, totalSize);

      // Draw the QR in the middle, leaving the margin on every side
      context.drawImage(img, margin, margin, qrSize, qrSize);

      const pngUrl = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${site.slug}-QR.png`;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src =
      "data:image/svg+xml;charset=utf-8," +
      encodeURIComponent(svgData);
  };

  if (loading) {
    return (
      <HeritageLoader message="Loading artwork QR codes..." />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#EFE8DE] flex items-center justify-center px-5">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <h1 className="text-xl font-bold text-[#4B2E2A]">
            Could not load QR codes
          </h1>

          <p className="mt-3 text-[#7B1E23]">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EFE8DE] px-5 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4B2E2A]">
            Individual Artwork QR Codes
          </h1>

          <p className="mt-3 text-[#8B7355]">
            {sites.length} artworks found
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sites.map((site) => {
            const artworkUrl = getArtworkUrl(site);

            return (
              <div
                key={site._id}
                className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center"
              >
                <h2 className="text-lg font-bold text-[#4B2E2A] text-center">
                  {site.name}
                </h2>

                <div className="mt-5 bg-white p-3 rounded-2xl border border-[#E8DFD0]">
                  <QRCodeSVG
                    id={`qr-${site._id}`}
                    value={artworkUrl}
                    size={220}
                    level="H"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => downloadQRCode(site)}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-[#7B1E23] text-white font-semibold hover:opacity-90 transition"
                >
                  Download QR
                </button>

                <p className="mt-4 text-xs text-gray-500 text-center break-all">
                  {artworkUrl}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArtworkQRCodes;