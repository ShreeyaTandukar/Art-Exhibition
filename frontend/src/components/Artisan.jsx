import React, {useState} from 'react';
import artisanImage from "/images/artisan.jpg";
import {Lock, ArrowRight} from "lucide-react";
import UnlockedModal from './UnlockedModal';

const Artisan = ({site}) => {
    const[showModal, setShowModal] = useState(false);
  return (
    <section id="artisan" className="bg-[#F8F4EE] px-6 pb-12 " data-aos="fade-up">

      <div className="bg-white rounded-3xl overflow-hidden shadow-xl md:flex md:items-stretch">

        {/* Image */}

        <div className="relative md:w-1/2">

          <img
            src={site?.artisan?.image || artisanImage}
            alt="Artisan"
            className="w-full h-72 object-cover blur-[2px]"
          />

          <div className="absolute inset-0 bg-black/45"></div>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8">

            <div className="w-16 h-16 rounded-full bg-[#D6A94F] flex items-center justify-center">

              <Lock className="text-white" size={30}/>

            </div>

            <h2 className="text-white text-3xl font-bold mt-5">

              Meet the Artisan

            </h2>

            <p className="text-white/90 mt-3 leading-7">

              Unlock an exclusive interview with the
              master craftsperson behind your
              authentic HeritageLink souvenir.

            </p>

          </div>

        </div>

        {/* Bottom */}

        <div className="p-7 md:w-1/2 md:flex md:flex-col md:justify-center">

          <div className="inline-flex items-center gap-2 bg-[#FFF5D8] px-4 py-2 rounded-full">

            <Lock size={16} className="text-[#D6A94F]" />

            <span className="text-sm font-semibold text-[#7B1E23]">

              Premium Content

            </span>

          </div>

          <p className="mt-5 text-[#6B5A48] leading-8">

            Watch behind-the-scenes craftsmanship,
            discover traditional techniques,
            and hear the personal story of the artisan
            preserving Nepal's living heritage.

          </p>

          <button
            onClick={()=> setShowModal(true)}
            className="w-full mt-7 bg-[#7B1E23] text-white py-4 rounded-2xl font-semibold flex justify-center items-center gap-3 hover:bg-[#65161B] transition"
          >

            Unlock Experience

            <ArrowRight size={20}/>

          </button>

        </div>

      </div>
      {showModal && (<UnlockedModal site={site} onClose={() => setShowModal(false)}/>
    )}

    </section>
  );
};

export default Artisan