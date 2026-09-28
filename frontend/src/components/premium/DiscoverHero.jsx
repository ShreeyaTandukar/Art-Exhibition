
import React from "react";

const DiscoverHero = ({ site, tightTop = false }) => {
  const imageSrc =
    site?.heroImage ||
    site?.image ||
    site?.coverImage ||
    (site?.gallery && site.gallery[0]) ||
    "/images/gallery.jpg";

  return (
    <section
      className={`px-5 pb-2 ${
        tightTop ? "pt-2" : "pt-25"
      }`}
    >
      {/* Tagline */}
      {site?.tagline && (
        <p className="text-[#D6A94F] text-[11px] font-bold uppercase tracking-[0.18em] mb-1">
          {site.tagline}
        </p>
      )}

      {/* Artwork Title - shown only once */}
      <h1 className="text-2xl font-bold text-[#4B2E2A] leading-snug">
        {site?.name || "Heritage Artwork"}
      </h1>

      {/* Artist */}
      {site?.artisan?.name && (
        <p className="mt-1 text-sm text-[#8B7355]">
          Artist:{" "}
          <span className="font-semibold text-[#4B2E2A]">
            {site.artisan.name}
          </span>

          {site.artisan.role && ` · ${site.artisan.role}`}
        </p>
      )}

      {/* Main Image */}
      <div className="mt-3 rounded-2xl overflow-hidden shadow-md border border-[#E8DFD0]">
        <img
          src={imageSrc}
          alt={site?.name || "Heritage artwork"}
          className="w-full h-52 md:h-64 object-cover"
        />
      </div>

      {/* Description */}
      {site?.shortDescription && (
        <p className="mt-3 text-sm text-[#6B5A48] leading-relaxed">
          {site.shortDescription}
        </p>
      )}
    </section>
  );
};

export default DiscoverHero;

