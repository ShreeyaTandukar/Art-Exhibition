import React from "react";

import {
  UserRound,
  MapPin,
  Palette,
  Mail,
  Phone,
  Sparkles,
  Tag,
} from "lucide-react";

const Artisan = ({ site }) => {
  const artisan = site?.artisan || {};

  const image =
    artisan.image ||
    site?.heroImage ||
    "/images/Handpainted/Rikma-Thapa.jpeg";

  const name = artisan.name || "Artist";
  const role = artisan.role || "Artist";
  const location = artisan.location || "Nepal";

  const bio =
    artisan.bio ||
    site?.shortDescription ||
    "Creator of this HeritageLink artwork.";

  const themes = artisan.themes || site?.themes || [];

  const email = artisan.email || "";
  const phone = artisan.phone || "";

  const priceLabel =
    artisan.priceRange ||
    site?.priceRange ||
    "";

  return (
    <section className="bg-[#EFE8DE] px-5 py-12">

      {/* Heading */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 bg-[#FFF5D8] text-[#7B1E23] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
          <UserRound size={14} />
          The Artist
        </span>

        <h2 className="mt-4 text-2xl md:text-3xl font-bold text-[#4B2E2A]">
          Meet {name}
        </h2>

        <p className="mt-2 text-sm text-[#6B5A48] max-w-md mx-auto leading-relaxed">
          The hands and vision behind this piece.
        </p>
      </div>

      

      {/* Artist Information */}
      <div className="bg-white rounded-2xl border border-[#E8DFD0] shadow-md p-5">

        {/* Name / Role / Location */}
        <div>
          <h3 className="text-xl font-bold text-[#4B2E2A]">
            {name}
          </h3>

          <div className="mt-2 flex flex-wrap gap-3 text-sm text-[#6B5A48]">

            <span className="inline-flex items-center gap-1.5">
              <Palette size={14} className="text-[#D6A94F]" />
              {role}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-[#D6A94F]" />
              {location}
            </span>

          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-[#6B5A48] leading-relaxed border-t border-[#F0E8DC] pt-4 mt-4">
          {bio}
        </p>

        {/* Themes */}
        {(themes.length > 0 || site?.tagline) && (
          <div className="border-t border-[#F0E8DC] pt-4 mt-4">

            <p className="text-[10px] uppercase tracking-widest text-[#D6A94F] font-bold mb-2 flex items-center gap-1.5">
              <Sparkles size={12} />
              Themes & Focus
            </p>

            <div className="flex flex-wrap gap-2">

              {themes.length > 0 ? (
                themes.map((theme) => (
                  <span
                    key={theme}
                    className="text-xs bg-[#FFF5D8] text-[#7B1E23] px-2.5 py-1 rounded-full font-medium"
                  >
                    {theme}
                  </span>
                ))
              ) : (
                site?.tagline && (
                  <span className="text-xs bg-[#FFF5D8] text-[#7B1E23] px-2.5 py-1 rounded-full font-medium">
                    {site.tagline}
                  </span>
                )
              )}

            </div>
          </div>
        )}

        {/* Price */}
        {priceLabel && (
          <div className="border-t border-[#F0E8DC] pt-4 mt-4">

            <div className="flex items-center gap-2 text-sm text-[#4B2E2A]">
              <Tag size={15} className="text-[#D6A94F]" />

              <span>
                <span className="font-semibold">
                  Price:
                </span>{" "}
                {priceLabel}
              </span>
            </div>

          </div>
        )}

        {/* Contact */}
        {(email || phone) && (
          <div className="border-t border-[#F0E8DC] pt-4 mt-4">

            <p className="text-[10px] uppercase tracking-widest text-[#D6A94F] font-bold mb-3">
              Connect with the Artist
            </p>

            <div className="space-y-3">

              {/* Email */}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-sm text-[#4B2E2A] hover:text-[#7B1E23] break-all"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FFF5D8]">
                    <Mail
                      size={15}
                      className="text-[#D6A94F]"
                    />
                  </span>

                  <span>{email}</span>
                </a>
              )}

              {/* Phone */}
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-3 text-sm text-[#4B2E2A] hover:text-[#7B1E23]"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FFF5D8]">
                    <Phone
                      size={15}
                      className="text-[#D6A94F]"
                    />
                  </span>

                  <span>{phone}</span>
                </a>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Artisan;