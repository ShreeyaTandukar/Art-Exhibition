import React from 'react'
import { PlayCircle, ShieldCheck, ChevronDown } from 'lucide-react';
import heroImageFallback from "/images/baghbhairavtemple.png";

const PremiumHero = ({ site }) => {
    const scrollToVideo = () =>{
        const section = document.getElementById("premium-video");
        section?.scrollIntoView({
            behavior: "smooth",
        });
    };
  return (
    <section className='relative h-screen overflow-hidden'>
        {/* Background */}
        <img
            src={site?.heroImage || heroImageFallback}
            alt={site?.name || "Heritage site"}
            className='absolute inset-0 w-full h-full object-cover'
        />
        {/* Overlay */}
        <div className='absolute inset-0 bg-gradient-to-b from black/30 via-black/60 to-[#23252A]/95'></div>
        {/* Content */}
        <div className='relative z-10 h-full flex flex-col justify-end px-6 pb-16'>
            {/*Premium Badge */}
            <span className='inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-[#D6A94F]/20 border border-[#D6A94F]/40 backdrop-blur-md text-[#F5E6B8] text-sm font-semibold'>
                <ShieldCheck size={16} />
                Premium Heritage Experience
            </span>
            {/* Title */}
            <h1 className='mt-6 text-5xl font-bold text-white leading-tight'>
                {site?.name}
            </h1>
            {/* Subtitle */}
            <p className='mt-4 text-[#E7E0D5] leading-7'>
                  Your HeritageLink souvenir has successfully unlocked the
                  complete cultural experience.

                  Explore animated storytelling, artisan interviews,
                  exclusive galleries, and hidden legends preserved for
                  generations.
            </p>
            {/* Button */}
            <button onClick={scrollToVideo}
                className="mx-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#D6A94F] hover:bg-[#C89B3F] text-[#23252A] rounded-2xl font-bold transition duration-300">
                    <PlayCircle size={26} />
                    Watch Animated Story
                </button>
                {/* Scroll */}
                <div className='flex flex-col items-center mt-10 text-white/80 animate-bounce'>
                    <ChevronDown size={22} />
                    <span className='text-xs mt-1 tracking-widest uppercase'>
                        Continue Journey
                    </span>
                </div>
        </div>
    </section>
  )
}

export default PremiumHero