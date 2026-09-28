import React, { useState } from "react";
import { X, Puzzle } from "lucide-react";

const DiscoverGallery = ({ site }) => {
  const [lightbox, setLightbox] = useState(false);

  // Always use the artwork hero image (ignore empty gallery + old fallbacks)
  const mainImage =
    site?.heroImage ||
    site?.image ||
    "/images/Handpainted/Rikma-Thapa.jpeg";

  const cols = 3;
  const rows = 3;
  const tiles = Array.from({ length: 9 }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return {
      id: i,
      posX: (col / (cols - 1)) * 100,
      posY: (row / (rows - 1)) * 100,
    };
  });

  return (
    <section className="bg-[#F8F4EE] px-5 py-8">
      <div className="flex items-center gap-2 mb-2">
        <Puzzle size={18} className="text-[#D6A94F]" />
        <h2 className="text-lg font-bold text-[#4B2E2A]">Gallery Puzzle</h2>
      </div>
      <p className="text-xs text-[#8B7355] mb-4">
        Pieces of this artwork — tap any tile for the full image
      </p>

      <div className="grid grid-cols-3 gap-1.5 rounded-2xl border border-[#E8DFD0] shadow-md bg-[#E8DFD0] p-1.5">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            type="button"
            onClick={() => setLightbox(true)}
            className="relative aspect-square rounded-lg overflow-hidden group"
          >
            <div
              className="absolute inset-0 group-hover:scale-110 transition-transform duration-500"
              style={{
                backgroundImage: `url(${mainImage})`,
                backgroundSize: "300% 300%",
                backgroundPosition: `${tile.posX}% ${tile.posY}%`,
              }}
            />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center px-4"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            className="absolute top-6 right-6 text-white"
            onClick={() => setLightbox(false)}
          >
            <X size={28} />
          </button>
          <img
            src={mainImage}
            alt={site?.name || "Artwork"}
            className="max-h-[80vh] max-w-full rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default DiscoverGallery;