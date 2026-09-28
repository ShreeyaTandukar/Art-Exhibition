import React, { useEffect, useState } from "react";

const LOGOS = [
  { src: "/images/logos/mba-pulse.png", alt: "MBA Pulse" },
  { src: "/images/logos/inosphere.png", alt: "inoSphere" },
  { src: "/images/logos/islington-college.png", alt: "Islington College" },
  { src: "/images/logos/ing.png", alt: "ING" },
  { src: "/images/logos/kayo-creative.png", alt: "Kayo Creative Studio" },
  { src: "/images/logos/passpass-pulse.png", alt: "PassPass Pulse" },
];

const HeritageLoader = ({
  size = "large",
  fullScreen = true,
  message = "",
  duration = 0,
  onComplete,
}) => {
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % LOGOS.length);
    }, 550);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!duration || !onComplete) return;
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 400);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  const containerClass = fullScreen
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-5"
    : "flex flex-col items-center justify-center py-16 px-4";

  return (
    <div
      className={`${containerClass} transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background:
          "radial-gradient(ellipse at center, #2A2420 0%, #1B1B1B 45%, #0D0D0D 100%)",
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      {/* Ambient gold orbs */}
      <div
        className="pointer-events-none absolute w-[28rem] h-[28rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(214,169,79,0.45) 0%, transparent 70%)",
          animation: "orbFloat 6s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute w-64 h-64 rounded-full opacity-20 blur-3xl -translate-x-32 translate-y-20"
        style={{
          background:
            "radial-gradient(circle, rgba(123,30,35,0.5) 0%, transparent 70%)",
          animation: "orbFloat 8s ease-in-out infinite reverse",
        }}
      />

      {/* Decorative rings + logo grid */}
      <div className="relative z-10 flex items-center justify-center mb-2">
        <div
          className="absolute w-[22rem] h-[22rem] md:w-[26rem] md:h-[26rem] rounded-full border border-[#D6A94F]/15"
          style={{ animation: "ringPulse 3s ease-in-out infinite" }}
        />
        <div
          className="absolute w-[18rem] h-[18rem] md:w-[22rem] md:h-[22rem] rounded-full border border-[#D6A94F]/10"
          style={{ animation: "ringPulse 3s ease-in-out infinite 0.5s" }}
        />

        <div
          className={`relative grid grid-cols-3 gap-3 md:gap-5 transition-all duration-700 ${
            entered ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          {LOGOS.map((logo, i) => {
            const isActive = i === active;
            return (
              <div
                key={logo.src}
                className="relative"
                style={{
                  animation: entered ? "cardIn 0.6s ease backwards" : undefined,
                  animationDelay: entered ? `${i * 80}ms` : undefined,
                }}
              >
                {isActive && (
                  <div
                    className="absolute -inset-2 rounded-3xl bg-[#D6A94F]/35 blur-xl"
                    style={{ animation: "glowPulse 0.55s ease-in-out" }}
                  />
                )}

                <div
                  className={`relative w-[4.75rem] h-[4.75rem] md:w-24 md:h-24 rounded-2xl md:rounded-3xl flex items-center justify-center p-2.5 md:p-3 transition-all duration-500 ease-out ${
                    isActive
                      ? "bg-white scale-110 shadow-[0_0_32px_rgba(214,169,79,0.55)] ring-2 ring-[#D6A94F] ring-offset-2 ring-offset-[#1B1B1B]"
                      : "bg-white/90 scale-100 shadow-lg shadow-black/40 opacity-75"
                  }`}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain select-none"
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gold progress bar */}
      <div
        className={`relative z-10 mt-12 w-48 md:w-56 transition-all duration-700 delay-300 ${
          entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        <div className="h-[3px] rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #D6A94F 0%, #F0CB6E 50%, #FFE7A3 100%)",
              animation: "progressSlide 2.2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Bouncing dots */}
      <div
        className={`relative z-10 mt-6 flex items-center gap-2 transition-all duration-700 delay-500 ${
          entered ? "opacity-100" : "opacity-0"
        }`}
      >
        {[0, 1, 2].map((d) => (
          <span
            key={d}
            className="w-1.5 h-1.5 rounded-full bg-[#D6A94F]"
            style={{
              animation: "dotBounce 1.2s ease-in-out infinite",
              animationDelay: `${d * 0.18}s`,
            }}
          />
        ))}
      </div>

      {message ? (
        <p className="relative z-10 mt-5 text-sm text-[#C4B5A5] tracking-wide text-center">
          {message}
        </p>
      ) : null}

      <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(12px, -18px) scale(1.08); }
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.03); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(16px) scale(0.85); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes glowPulse {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes progressSlide {
          0% { width: 0%; margin-left: 0; }
          50% { width: 70%; margin-left: 15%; }
          100% { width: 0%; margin-left: 100%; }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default HeritageLoader;