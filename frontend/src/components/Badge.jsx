import React, { useState } from "react";
import { Lock, Award, ArrowRight } from "lucide-react";
import badgeFallback from "/images/badge.jpg";
import UnlockedModal from "./UnlockedModal";

const Badge = ({ site }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section id="badge" className="bg-[#F8F4EE] px-6 md:px-16 lg:px-24 pb-12 md:pb-20" data-aos="fade-up">

        <div className="md:grid md:grid-cols-2 md:gap-12 md:items-center">

        {/* Heading */}

        <div className="mb-6 md:mb-0">

          <span className="inline-flex items-center gap-2 bg-[#FFF5D8] px-4 py-2 rounded-full">
            <Award size={16} className="text-[#D6A94F]" />

            <span className="text-sm font-semibold text-[#7B1E23]">
              Digital Collectible
            </span>
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-[#4B2E2A] mt-4">
            Collect Your Heritage Badge
          </h2>

          <p className="text-[#7A6A58] mt-3 leading-7 md:text-lg md:leading-8 md:max-w-md">
            Complete your HeritageLink journey and unlock
            an exclusive digital badge celebrating your visit
            to {site?.name || "this heritage site"}.
          </p>

        </div>

        {/* Badge Card */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden md:max-w-md md:mx-auto">

          <div className="relative">

            <img
              src={site?.badge?.image || badgeFallback}
              alt="Heritage Badge"
              className="w-full h-80 object-contain bg-[#FFF8EF] blur-[2px]"
            />

            {/* Overlay */}

            <div className="absolute inset-0 bg-black/35"></div>

            {/* Lock */}

            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <div className="w-20 h-20 rounded-full bg-[#D6A94F] flex items-center justify-center shadow-xl">

                <Lock className="text-white" size={34} />

              </div>

              <h3 className="text-white text-2xl font-bold mt-6">
                Badge Locked
              </h3>

            </div>

          </div>

          <div className="p-7">

            <p className="text-[#6B5A48] leading-8">

              {site?.badge?.description ||
                "Unlock this exclusive digital badge after purchasing your authentic HeritageLink souvenir. Display your achievement and continue collecting badges from heritage sites across Nepal."}

            </p>

            <button
              onClick={() => setShowModal(true)}
              className="w-full mt-7 bg-[#7B1E23] hover:bg-[#65161B] text-white py-4 rounded-2xl font-semibold flex justify-center items-center gap-3 transition"
            >

              Unlock Badge

              <ArrowRight size={20} />

            </button>

          </div>

        </div>

        </div>

      </section>

      {showModal && (
        <UnlockedModal site={site} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default Badge;