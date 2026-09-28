import React, { useState } from "react";
import { features } from "../data/audioGuide";
import { Lock } from "lucide-react";
import UnlockedModal from "./UnlockedModal";

const AudioGuide = ({ site }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section id="audio" className="bg-[#F8F4EE] py-8" data-aos="fade-up">
        <div className="relative px-6">

          {/* Golden Line */}
          <div className="absolute top-6 left-[14%] right-[14%] h-[2px] bg-[#D6A94F] z-0"></div>

          {/* Icons */}
          <div className="relative z-10 grid grid-cols-4">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center"
                >
                  <div className="relative">

                    {/* Lock */}
                    {feature.locked && (
                      <Lock
                        size={12}
                        className="absolute -top-2 left-1/2 -translate-x-1/2 text-[#D6A94F] bg-[#F8F4EE]"
                      />
                    )}

                    {/* Circle */}
                    <div
                      onClick={() => {
                        if (feature.locked) {
                          setShowModal(true);
                        }
                      }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 ${
                        feature.active
                          ? "bg-[#D6A94F] text-white"
                          : "bg-[#F8F4EE] border-2 border-[#D6A94F] text-[#7B1E23]"
                      }`}
                    >
                      <Icon size={20} />
                    </div>

                  </div>

                  <p className="mt-3 text-sm font-medium text-[#4B2E2A]">
                    {feature.title}
                  </p>
                </div>
              );
            })}

          </div>
        </div>

        {/* Description */}
        <div className="mt-8 px-6">
          <p className="text-center text-[13px] leading-6 text-[#7A6A58]">
            Enjoy this complimentary preview. Purchase the artifact to unlock
            the complete interactive journey.
          </p>
        </div>
      </section>

      {/* Modal */}
{showModal && (<UnlockedModal site={site} onClose={() => setShowModal(false)}/>
      )}
    </>
  );
};

export default AudioGuide;