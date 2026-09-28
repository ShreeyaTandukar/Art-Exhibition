import React, { useState } from "react";
import { Lock, ScrollText, ArrowRight } from "lucide-react";
import UnlockedModal from "./UnlockedModal";

import parchment from "/images/parchment.jpeg";

const HiddenStory = ({ site }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section id="story" className="bg-[#F8F4EE] px-6 md:px-16 lg:px-24 pb-12 md:pb-20" data-aos="fade-up">

        {/* Heading */}

        <div className="mb-6 md:text-center">

          <span className="inline-flex items-center gap-2 bg-[#FFF5D8] px-4 py-2 rounded-full">
            <ScrollText size={16} className="text-[#D6A94F]" />

            <span className="text-sm font-semibold text-[#7B1E23]">
              Premium Story
            </span>
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-[#4B2E2A] mt-4">
            Hidden Story
          </h2>

          <p className="text-[#7A6A58] mt-3 leading-7 md:text-lg md:max-w-xl md:mx-auto">
            Discover ancient legends, forgotten traditions,
            and sacred stories passed down through generations.
          </p>

        </div>

        {/* Scroll Card */}

        <div
          onClick={() => setShowModal(true)}
          className="relative overflow-hidden rounded-3xl shadow-2xl border border-[#D6A94F]/40 cursor-pointer group md:max-w-2xl md:mx-auto"
          style={{
            backgroundImage: `url(${parchment})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          {/* Dark overlay */}

          <div className="absolute inset-0 bg-white/35"></div>

          {/* Content */}

          <div className="relative p-10 text-center">

            {/* Lock */}

            <div className="mt-6 flex justify-center">

              <div className="w-20 h-20 rounded-full bg-[#D6A94F] flex items-center justify-center group-hover:scale-110 transition duration-300">

                <Lock className="text-white" size={34} />

              </div>

            </div>

            {/* Title */}

            <h3 className="mt-6 text-3xl font-bold text-[#4B2E2A]">
              Ancient Legend
            </h3>

            {/* Divider */}

            <div className="w-24 h-[2px] bg-[#D6A94F] mx-auto my-5"></div>

            {/* Quote */}

            <p className="italic text-[#5E4633] text-lg leading-8">

              "Some stories are not written in books.
              They live in the voices of those who
              protect Nepal's heritage."

            </p>

            {/* Divider */}

            <div className="w-24 h-[2px] bg-[#D6A94F] mx-auto my-6"></div>

            {/* Description */}

            <p className="text-[#4B2E2A] leading-8">

              {site?.hiddenStory ||
                `Unlock exclusive legends, forgotten rituals, hidden temple secrets, sacred beliefs, and fascinating stories surrounding ${site?.name || "this heritage site"} that very few visitors ever get to hear.`}

            </p>

            {/* Button */}

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className="mt-8 bg-[#7B1E23] hover:bg-[#65161B] text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 mx-auto transition duration-300"
            >
              Unlock Story
              <ArrowRight size={20} />
            </button>

          </div>

        </div>

      </section>

      {showModal && (
        <UnlockedModal site={site} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default HiddenStory;