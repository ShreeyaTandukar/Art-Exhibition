import React from "react";
import { FileText } from "lucide-react";

const ArtworkDetails = ({ site }) => {
  const rows = [
    { label: "Artwork", value: site?.name },
    { label: "Origin", value: site?.locationLabel },
    { label: "Material", value: site?.material },
    { label: "Craft", value: site?.craft },
    { label: "Artisan", value: site?.artisan?.name },
    { label: "Heritage Site", value: site?.tagline || site?.name },
  ].filter((row) => row.value);

  return (
    <section className="bg-[#EFE8DE] px-6 py-16">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 bg-[#FFF5D8] text-[#7B1E23] px-4 py-2 rounded-full text-sm font-semibold">
          <FileText size={16} />
          Artwork Details
        </span>
        <h2 className="mt-5 text-3xl font-bold text-[#4B2E2A]">
          Complete Information
        </h2>
      </div>

      <div className="bg-white rounded-3xl shadow-lg divide-y divide-[#F2E6CF] max-w-xl mx-auto overflow-hidden">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex justify-between items-center gap-4 px-6 py-4"
          >
            <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold">
              {row.label}
            </span>
            <span className="text-[#4B2E2A] font-medium text-right">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtworkDetails;
