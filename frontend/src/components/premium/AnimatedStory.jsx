import React, { useState } from "react";
import { PlayCircle, Clock3, Sparkles } from "lucide-react";
import heroVideoFallback from "/videos/baghbhairav.mp4";
import heroImageFallback from "/images/baghbhairavtemple.png";

const AnimatedStory = ({ site }) => {
  const [showVideo, setShowVideo] = useState(false);

  const image = site?.heroImage || heroImageFallback;
  const video = site?.video || heroVideoFallback;

  return (
    <section
      id="premium-video"
      className="bg-[#F8F4EE] px-5 py-10"
    >
      {/* Heading */}

      <div className="text-center">

        <span className="inline-flex items-center gap-2 bg-[#FFF5D8] text-[#7B1E23] px-4 py-2 rounded-full text-sm font-semibold">
          <Sparkles size={16} />
          Premium Story
        </span>

        <h2 className="mt-5 text-4xl font-bold text-[#4B2E2A]">
          Animated Heritage Story
        </h2>

        <p className="mt-4 text-[#6B5A48] leading-8">
          Experience the complete legend of
          {" "}{site?.name || "this heritage site"} through cinematic
          storytelling.
        </p>

      </div>

      {/* Before clicking */}

      {!showVideo && (

        <div className="mt-12">

          <div className="rounded-3xl overflow-hidden shadow-xl">

            <img
              src={image}
              alt={site?.name || "Heritage site"}
              className="w-full h-60 object-cover"
            />

          </div>

          <button
            onClick={() => setShowVideo(true)}
            className="mt-8 w-full bg-[#7B1E23] hover:bg-[#64191D] text-white py-4 rounded-2xl flex justify-center items-center gap-3 transition"
          >
            <PlayCircle size={26} />
            Watch Animated Story
          </button>

        </div>

      )}

      {/* After clicking */}

      {showVideo && (

        <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">

          {/* Left */}

          <div>

            <h3 className="text-3xl font-bold text-[#4B2E2A]">
              The Legend Begins
            </h3>

            <div className="flex items-center gap-2 mt-4 text-[#B08D57]">

              <Clock3 size={18} />

              <span>3 Minutes</span>

            </div>

            <p className="mt-6 text-[#6B5A48] leading-8">

              This premium animated film tells the
              legendary story of {site?.name || "this heritage site"},
              its origin, traditions,
              and its role in Nepal's living heritage.

            </p>

          </div>

          {/* Right */}

          <div className="rounded-3xl overflow-hidden shadow-2xl">

           <video
                controls
                poster={image}
                className="w-full h-72 object-cover"
            >
            <source src={video} type="video/mp4" />
            </video>

            {/* Replace this image with a real video later */}

          </div>

        </div>

      )}

    </section>
  );
};

export default AnimatedStory;