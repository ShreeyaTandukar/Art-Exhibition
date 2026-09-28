import React from "react";
import { Hammer, CheckCircle2 } from "lucide-react";

// Generic fallback so the section still looks complete for a site whose
// `makingProcess` hasn't been filled in yet in the database.
const fallbackSteps = [
  { title: "Selecting the Material", description: "The artisan chooses raw material suited to the piece, judged by grain, density, and quality." },
  { title: "Preparing the Material", description: "The material is cleaned, cut, and shaped into a rough working form." },
  { title: "Designing & Sketching", description: "The design is sketched directly onto the material, guided by traditional patterns." },
  { title: "Hand Carving", description: "Fine hand tools are used to carve the form, a process that can take days or weeks." },
  { title: "Detailing", description: "Intricate details are added by hand, bringing texture and character to the piece." },
  { title: "Finishing", description: "The surface is smoothed, treated, and finished to protect and enhance the work." },
  { title: "Final Artwork", description: "The completed piece is inspected and prepared for its journey to a new home." },
];

const MakingProcess = ({ site }) => {
  const steps =
    site?.makingProcess && site.makingProcess.length > 0
      ? site.makingProcess
      : fallbackSteps;

  return (
    <section className="bg-[#F8F4EE] px-6 py-16">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 bg-[#FFF5D8] text-[#7B1E23] px-4 py-2 rounded-full text-sm font-semibold">
          <Hammer size={16} />
          The Craft
        </span>
        <h2 className="mt-5 text-4xl font-bold text-[#4B2E2A]">
          How It Is Made
        </h2>
        <p className="mt-4 text-[#6B5A48] leading-8 max-w-xl mx-auto">
          Every {site?.name || "HeritageLink artwork"} passes through
          traditional hands, one careful step at a time.
        </p>
      </div>

      <div className="space-y-5 max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex gap-4 bg-white rounded-2xl shadow-sm p-5"
          >
            {step.image ? (
              <img
                src={step.image}
                alt={step.title}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#FFF5D8] flex items-center justify-center shrink-0">
                <span className="text-[#7B1E23] font-bold">{index + 1}</span>
              </div>
            )}

            <div>
              <h3 className="font-bold text-[#4B2E2A] flex items-center gap-2">
                {step.title}
                {index === steps.length - 1 && (
                  <CheckCircle2 size={16} className="text-[#D6A94F]" />
                )}
              </h3>
              {step.description && (
                <p className="text-[#6B5A48] text-sm leading-6 mt-1">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MakingProcess;
