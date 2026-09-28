import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  QrCode,
  UserCircle2,
  Home,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const PremiumFooter = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <footer className="bg-[#4B2E2A] text-white px-6 py-12 mt-10">
      <div className="max-w-4xl mx-auto">

        {/* Brand */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-white mx-auto flex items-center justify-center shadow-lg overflow-hidden">
            <img
              src="/images/logos/mba-pulse.png"
              alt="MBA-pulse"
              className="w-full h-full object-contain p-2"
            />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mt-5 text-[#D6A94F]">
            MBA Pulse
          </h2>

          <p className="mt-3 text-[#E8DCC8] leading-7 max-w-md mx-auto text-sm">
            Discover meaningful experiences, explore new places, and keep
            track of everything you find along the way.
          </p>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
          <button
            onClick={() => navigate("/")}
            className="flex flex-col items-center gap-2 bg-[#5C3A36] hover:bg-[#6A4A46] rounded-2xl py-4 px-3 transition"
          >
            <Home size={20} className="text-[#D6A94F]" />
            <span className="text-xs font-semibold">
              Catalogue
            </span>
          </button>

          <button
            onClick={() =>
              navigate(isAuthenticated ? "/scan" : "/login")
            }
            className="flex flex-col items-center gap-2 bg-[#5C3A36] hover:bg-[#6A4A46] rounded-2xl py-4 px-3 transition"
          >
            <QrCode size={20} className="text-[#D6A94F]" />
            <span className="text-xs font-semibold">
              Scan QR
            </span>
          </button>

          <button
            onClick={() =>
              navigate(isAuthenticated ? "/passport" : "/login")
            }
            className="flex flex-col items-center gap-2 bg-[#5C3A36] hover:bg-[#6A4A46] rounded-2xl py-4 px-3 transition"
          >
            <UserCircle2 size={20} className="text-[#D6A94F]" />
            <span className="text-xs font-semibold">
              {isAuthenticated ? "My Profile" : "Login"}
            </span>
          </button>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#6A4A46] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#C4B5A5]">
          <div className="flex items-center gap-2">
            <Heart size={16} className="text-red-400" />
            <span>Made with love</span>
          </div>

          <p>© 2026 MBA Pulse. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default PremiumFooter;