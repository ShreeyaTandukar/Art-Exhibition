import React from "react";
import { MapPin, Gem, Hammer, ScrollText } from "lucide-react";

// Short, scannable heritage facts — deliberately concise (per spec: do not
// make this section long). Historical significance is truncated from the
// site's `history` field rather than repeated in full; the deeper version
// lives in the "Cultural Story" section on Page 2.
const truncate = (text, max = 160) => {
  if (!text) return "";
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
};

const HeritageInfo = ({ site }) => {
  const facts = [
    site?.locationLabel && {
      icon: MapPin,
      label: "Origin",
      value: site.locationLabel,
    },
    site?.material && {
      icon: Gem,
      label: "Material",
      value: site.material,
    },
    site?.craft && {
      icon: Hammer,
      label: "Craft & Tradition",
      value: site.craft,
    },
  ].filter(Boolean);

  return (
    <section className="bg-[#EFE8DE] px-6 py-10">
      <h2 className="text-xl font-bold text-[#4B2E2A] mb-4">
        Heritage Information
      </h2>

      {site?.history && (
        <div className="flex gap-3 bg-white rounded-2xl p-4 shadow-sm mb-4">
          <ScrollText size={18} className="text-[#D6A94F] shrink-0 mt-1" />
          <p className="text-[#6B5A48] text-sm leading-6">
            {truncate(site.history)}
          </p>
        </div>
      )}

      {facts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {facts.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-3"
            >
              <Icon size={18} className="text-[#D6A94F] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold">
                  {label}
                </p>
                <p className="text-[#4B2E2A] font-medium mt-1">{value}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default HeritageInfo;
