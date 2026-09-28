import {
  UserCircle2,
  QrCode,
  ChevronLeft,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../LanguageSwitcher";
import { useAuth } from "../../context/AuthContext";

const PremiumNavbar = ({ site }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Keep header compact — long titles truncate with ellipsis
  const title = site?.name
    ? site.name.length > 28
      ? `${site.name.slice(0, 28).trim()}…`
      : site.name
    : "Art Collection";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-3 px-3 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#4B2E2A]/95 backdrop-blur-xl border border-[#6A4A46]/80 rounded-2xl shadow-xl shadow-black/20 px-3 md:px-5 py-3 flex items-center justify-between gap-3">

          {/* LEFT: Back + MBA-Pulse Logo + Artwork Title */}
          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">

            {/* Back Button */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="shrink-0 w-9 h-9 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-center transition"
              aria-label="Back"
              title="Go back"
            >
              <ChevronLeft
                size={20}
                className="text-[#D6A94F]"
              />
            </button>

            {/* MBA-Pulse Logo + Artwork */}
            <div className="flex items-center gap-2 min-w-0">

              {/* Clickable MBA-Pulse Logo */}
              <div className="relative group shrink-0">

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-[#D6A94F] bg-white flex items-center justify-center hover:scale-105 transition duration-300"
                  aria-label="Return to artwork list"
                >
                  <img
                    src="/images/logos/mba-pulse.png"
                    alt="MBA-Pulse"
                    className="w-full h-full object-cover"
                  />
                </button>

                {/* Hover Hint */}
                <div
                  className="
                    absolute
                    left-1/2
                    -translate-x-1/2
                    top-full
                    mt-3
                    opacity-0
                    group-hover:opacity-100
                    pointer-events-none
                    transition
                    duration-300
                    whitespace-nowrap
                    z-50
                  "
                >
                  <div className="bg-white text-[#4B2E2A] text-xs font-medium px-3 py-2 rounded-lg shadow-lg">
                    Click the logo to return to the artwork list
                  </div>
                </div>

              </div>

              {/* MBA-Pulse Brand + Artwork Name */}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="min-w-0 text-left hover:opacity-90 transition"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-[#D6A94F] text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold">
                    MBA-Pulse
                  </span>
                </div>

                <h2 className="text-white text-sm md:text-base font-bold mt-0.5 truncate max-w-[130px] sm:max-w-[200px] md:max-w-[280px]">
                  {title}
                </h2>
              </button>

            </div>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">

            {/* Language */}
            <div className="hidden sm:block">
              <LanguageSwitcher variant="dark" />
            </div>

            {/* Scan QR */}
            {isAuthenticated && (
              <button
                onClick={() => navigate("/scan")}
                title="Scan QR"
                className="
                  w-9 h-9
                  md:w-auto md:h-auto
                  md:px-3 md:py-2
                  rounded-xl
                  bg-[#D6A94F]
                  text-[#4B2E2A]
                  font-semibold
                  flex items-center justify-center
                  gap-1.5
                  transition
                  hover:brightness-105
                "
              >
                <QrCode size={18} />

                <span className="hidden md:inline text-sm">
                  Scan
                </span>
              </button>
            )}

            {/* Profile / Login */}
            <button
              onClick={() =>
                navigate(
                  isAuthenticated
                    ? "/passport"
                    : "/login"
                )
              }
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-center transition"
              title={
                isAuthenticated
                  ? "My Passport"
                  : "Login"
              }
            >
              <UserCircle2
                size={22}
                className="text-[#D6A94F]"
              />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};

export default PremiumNavbar;