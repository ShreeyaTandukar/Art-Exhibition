import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const AudioPlayer = ({ site }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const image = site?.heroImage || site?.image || "/images/gallery.jpg";
  const audioSrc = site?.audioGuide || "/audio/baghbhairav.mp3";

  useEffect(() => {
    setPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) audioRef.current.load();
  }, [audioSrc]);

  const handlePlay = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);
  const handleLoadedMetadata = () => setDuration(audioRef.current.duration || 0);
  const handleEnded = () => {
    setPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) audioRef.current.currentTime = 0;
  };
  const handleReplay = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    audioRef.current.play();
    setPlaying(true);
  };

  const formatTime = (time) => {
    if (!time || Number.isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <section className="px-5 pt-3 pb-6">
      {/* Compact banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-md h-36 md:h-40">
        <img
          src={image}
          alt={site?.name || "Heritage"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-[#D6A94F] text-[10px] font-bold uppercase tracking-[0.2em]">
            Audio Heritage Guide
          </p>
          <h2 className="text-white text-base md:text-lg font-bold mt-0.5 leading-snug line-clamp-2 drop-shadow-md">
            {site?.name}
          </h2>
          {site?.locationLabel && (
            <p className="text-white/85 text-xs mt-0.5">{site.locationLabel}</p>
          )}
        </div>
      </div>

      {/* Player card — tighter */}
      <div className="bg-white rounded-2xl shadow-md border border-[#E8DFD0] p-4 mt-3">
        <div className="flex gap-3 items-center">
          <img
            src={image}
            alt=""
            className="w-14 h-14 rounded-xl object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-[#D6A94F] font-semibold">
              Audio Introduction
            </p>
            <h3 className="font-bold text-[#4B2E2A] text-sm mt-0.5 truncate">
              {site?.audioTitle || "Heritage Story"}
            </h3>
          </div>
        </div>

        <div className="mt-3">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => {
              const time = Number(e.target.value);
              if (audioRef.current) audioRef.current.currentTime = time;
              setCurrentTime(time);
            }}
            className="w-full h-1.5 accent-[#7B1E23] cursor-pointer"
          />
          <div className="flex justify-between mt-1 text-[11px] text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-3">
          <button
            onClick={handleReplay}
            aria-label="Replay"
            className="w-10 h-10 rounded-full bg-[#FFF5D8] flex items-center justify-center hover:scale-105 transition"
          >
            <RotateCcw size={16} className="text-[#7B1E23]" />
          </button>
          <button
            onClick={handlePlay}
            aria-label={playing ? "Pause" : "Play"}
            className="w-12 h-12 rounded-full bg-[#7B1E23] flex items-center justify-center hover:scale-105 transition shadow-md"
          >
            {playing ? (
              <Pause size={20} fill="white" className="text-white" />
            ) : (
              <Play size={20} fill="white" className="text-white ml-0.5" />
            )}
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      >
        <source src={audioSrc} type="audio/mp3" />
      </audio>
    </section>
  );
};

export default AudioPlayer;