import React from "react";
import { features } from "../data/WhyChooseUs";
const WhyChoose = () => {
  return (
    <section id="why" className="bg-[#F8F4EE] px-6 pb-16" data-aos="fade-up">
      {/* Heading */}
      <div className="text-center mb-12">
        <span className="inline-block bg-[#FFF5D8] text-[#7B1E23] px-4 py-2 rounded-full text-sm font-semibold">
          Why HeritageLink?
        </span>

        <h2 className="text-4xl font-bold text-[#4B2E2A] mt-5">
          Why Choose HeritageLink
        </h2>

        <p className="text-[#7A6A58] mt-4 max-w-2xl mx-auto leading-8">
          HeritageLink transforms every souvenir into a meaningful
          cultural experience by connecting visitors with authentic
          stories, local artisans, and Nepal's living heritage.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg border border-[#F2E6CF]
              hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-[#FFF5D8] flex items-center justify-center">
                <Icon size={30} className="text-[#D6A94F]" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-[#4B2E2A] mt-6">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-[#6B5A48] mt-4 leading-8">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChoose;