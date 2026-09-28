import React, { useState } from "react";
import { Lock, X, ShoppingBag, KeyRound, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import UnlockLoader from "./premium/UnlockLoader";

const UnlockedModal = ({ onClose, site }) => {
  const [showInput, setShowInput] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const navigate = useNavigate();

  const handleUnlock = async () => {
    const trimmedCode = code.trim();

    if (trimmedCode === "") {
      setError("Please enter your activation code.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Ask the backend if this code is real and unused.
      const response = await api.post("/activation/verify", {
        code: trimmedCode,
      });

      // Save the verified code + site so we can claim the badge
      // once the user is logged in (claim requires auth).
      localStorage.setItem("activationCode", trimmedCode);
      localStorage.setItem("activationSite", response.data.site);

      // Code is confirmed valid — hand off to the full-screen
      // unlock animation. It calls onComplete() itself when done.
      setLoading(false);
      setShowLoader(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not verify that code. Please try again."
      );
      setLoading(false);
    }
  };

  // Once the code is verified, show the branded unlock animation
  // and only navigate to /premium once it finishes playing.
  if (showLoader) {
    return (
      <UnlockLoader onComplete={() => navigate(`/premium/${site?.slug}`)} />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6">
      <div className="bg-[#F8F4EE] rounded-3xl shadow-2xl p-6 w-full max-w-[340px] relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-500 hover:text-black"
        >
          <X size={22} />
        </button>

        {/* Lock Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-[#D6A94F] flex items-center justify-center">
            <Lock className="text-white" size={28} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mt-4 text-[#7B1E23]">
          Unlock Your Heritage Journey
        </h2>

        {/* Description */}
        <p className="text-center text-[#6D5B4B] mt-3 leading-6 text-sm">
          You've experienced the complimentary preview.
          Purchase an authentic <strong>HeritageLink</strong> souvenir and
          enter the activation code found inside the package to unlock
          the complete heritage experience.
        </p>

        {/* Features */}
        <div className="mt-5 space-y-1 text-[14px] text-[#4B2E2A]">
          <p>🎬 Animated Heritage Story</p>
          <p>🎧 Full Audio Experience</p>
          <p>👨‍🎨 Meet the Artisan</p>
          <p>🖼 Premium Heritage Gallery</p>
          <p>📜 Hidden Cultural Stories</p>
          <p>🏅 Digital Heritage Badge</p>
        </div>

        {/* Purchase Button */}
        {!showInput && (
          <button
            onClick={() => setShowInput(true)}
            className="w-full mt-6 bg-[#7B1E23] hover:bg-[#65161B] text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
          >
            <ShoppingBag size={18} />
            I Purchased the Souvenir
          </button>
        )}

        {/* Activation Code */}
        {showInput && (
          <div className="mt-5">
            <label className="block text-sm font-semibold text-[#7B1E23] mb-2">
              Enter Activation Code
            </label>

            <div className="relative">
              <KeyRound
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                placeholder="e.g. HL-BB-92731"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (error) setError("");
                }}
                disabled={loading}
                className="w-full border border-[#D6A94F] rounded-xl py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[#D6A94F] disabled:opacity-60"
              />
            </div>

            {error && (
              <p className="text-red-600 text-xs font-medium mt-2">
                {error}
              </p>
            )}

            <button
              onClick={handleUnlock}
              disabled={loading}
              className="w-full mt-5 bg-[#D6A94F] hover:bg-[#C9983C] text-white py-2.5 rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Verifying...
                </>
              ) : (
                "Continue"
              )}
            </button>
          </div>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          className="w-full mt-3 border border-[#7B1E23] text-[#7B1E23] py-2.5 rounded-xl font-semibold hover:bg-[#F2E7DD] transition"
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default UnlockedModal;