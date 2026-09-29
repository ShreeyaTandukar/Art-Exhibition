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

  // =========================================================
  // DOWNLOAD QR AS SVG
  // =========================================================
  const downloadQRCode = (site) => {
    const svg = document.getElementById(`qr-${site._id}`);

    if (!svg) {
      return;
    }

    // Serialize the QR SVG
    const svgData = new XMLSerializer().serializeToString(svg);

    // Create an SVG document with a white background.
    // The QR itself is 220x220 and the extra space gives
    // scanners a proper quiet zone around the QR.
    const qrSize = 220;
    const margin = 40;
    const totalSize = qrSize + margin * 2;

    const svgWithMargin = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${totalSize}"
        height="${totalSize}"
        viewBox="0 0 ${totalSize} ${totalSize}"
      >
        <rect
          width="${totalSize}"
          height="${totalSize}"
          fill="#FFFFFF"
        />

        <g transform="translate(${margin}, ${margin})">
          ${svgData
            .replace(/<svg[^>]*>/, "")
            .replace(/<\/svg>/, "")}
        </g>
      </svg>
    `;

    // Create SVG file
    const blob = new Blob(
      [svgWithMargin],
      {
        type: "image/svg+xml;charset=utf-8",
      }
    );

    const url = URL.createObjectURL(blob);

    // Download
    const downloadLink = document.createElement("a");

    downloadLink.href = url;
    downloadLink.download = `${site.slug}-QR.svg`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Clean up
    URL.revokeObjectURL(url);
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <HeritageLoader
        message="Loading artwork QR codes..."
      />
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

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

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-[#EFE8DE] px-5 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Page heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4B2E2A]">
            Individual Artwork QR Codes
          </h1>

          <p className="mt-3 text-[#8B7355]">
            {sites.length} artworks found
          </p>
        </div>

        {/* QR cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {sites.map((site) => {
            // This is the URL stored inside the QR.
            //
            // Example:
            // https://art-exhibition-1.onrender.com/premium/bagh-bhairav
            //
            // The updated ScanQR.jsx understands this format
            // and opens the specific artwork.
            const artworkUrl = `${window.location.origin}/premium/${site.slug}`;

            return (
              <div
                key={site._id}
                className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center"
              >
                {/* Artwork name */}
                <h2 className="text-lg font-bold text-[#4B2E2A] text-center">
                  {site.name}
                </h2>

                {/* QR */}
                <div className="mt-5 bg-white p-10 rounded-2xl border border-[#E8DFD0] shadow-sm">

                  <QRCodeSVG
                    id={`qr-${site._id}`}
                    value={artworkUrl}
                    size={220}
                    level="H"
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    includeMargin={true}
                  />

                </div>

                {/* Download SVG */}
                <button
                  type="button"
                  onClick={() => downloadQRCode(site)}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-[#7B1E23] text-white font-semibold hover:opacity-90 transition"
                >
                  Download QR (SVG)
                </button>

                {/* URL shown for reference */}
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