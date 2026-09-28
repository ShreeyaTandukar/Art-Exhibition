import React, { useState } from "react";
import { Lock, Image, ArrowRight } from "lucide-react";

import baghbhairavFallback from "/images/baghbhairavtemple.png";
import imageFallback from "/images/image.png";
import galleryFallback from "/images/gallery.jpg";
import gallery1Fallback from "/images/gallery1.jpg";

import UnlockedModal from "./UnlockedModal";

const HeritageGallery = ({ site }) => {
  const [showModal, setShowModal] = useState(false);

  const featuredImage = site?.heroImage || baghbhairavFallback;

  // Use the site's gallery from the database if it has any images,
  // otherwise fall back to the bundled placeholder photos.
  const thumbnails =
    site?.gallery && site.gallery.length > 0
      ? site.gallery
      : [imageFallback, galleryFallback, gallery1Fallback];

  return (
    <>
      <section id="gallery" className="bg-[#F8F4EE] px-6 pb-12" data-aos="fade-up">

        {/* Heading */}

        <div className="mb-6">

          <span className="inline-flex items-center gap-2 bg-[#FFF5D8] px-4 py-2 rounded-full">
            <Image size={16} className="text-[#D6A94F]" />

            <span className="text-sm font-semibold text-[#7B1E23]">
              Premium Gallery
            </span>
          </span>

          <h2 className="text-3xl font-bold text-[#4B2E2A] mt-4">
            Heritage Gallery
          </h2>

          <p className="text-[#7A6A58] mt-3 leading-7">
            Unlock breathtaking photographs, intricate wood carvings,
            hidden temple corners, cultural festivals, and exclusive
            heritage moments preserved through generations.
          </p>

        </div>

        {/* Featured Image */}

        <div
          onClick={() => setShowModal(true)}
          className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-lg"
        >

          <img
            src={featuredImage}
            alt={site?.name || "Heritage site"}
            className="w-full h-64 object-cover blur-[2px] group-hover:scale-105 transition duration-500"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <div className="w-16 h-16 rounded-full bg-[#D6A94F] flex items-center justify-center">

              <Lock className="text-white" size={28} />

            </div>

            <h3 className="text-white text-2xl font-bold mt-4">
              Premium Gallery
            </h3>

            <p className="text-white/90 text-sm mt-2">
              Tap to Unlock
            </p>

          </div>

        </div>

        {/* Small Gallery */}

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-4">

          {thumbnails.map((img, index) => (

            <div
              key={index}
              onClick={() => setShowModal(true)}
              className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-md"
            >

              <img
                src={img}
                alt=""
                className="w-full h-28 object-cover blur-[2px] group-hover:scale-105 transition duration-300"
              />

              <div className="absolute inset-0 bg-black/35"></div>

              <div className="absolute inset-0 flex items-center justify-center">

                <div className="w-10 h-10 rounded-full bg-[#D6A94F] flex items-center justify-center">

                  <Lock className="text-white" size={18} />

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Bottom Description */}

        <div className="mt-8 text-center">

          <p className="text-[#6B5A48] leading-8">

            Discover stunning heritage photographs,
            intricate temple carvings,
            traditional festivals,
            hidden architectural details,
            and exclusive cultural stories available
            only after unlocking your HeritageLink experience.

          </p>

        </div>

        {/* Unlock Button */}

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#7B1E23] hover:bg-[#65161B] text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 transition duration-300"
        >

          Unlock Gallery

          <ArrowRight size={20} />

        </button>

      </section>

      {showModal && (
        <UnlockedModal
          site={site}
          onClose={() => setShowModal(false)}
        />
      )}

    </>
  );
};

export default HeritageGallery;