import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const menuItems = [
    { name: t("navHome"), link: "#home" },
    { name: t("navAudioGuide"), link: "#audio" },
    { name: t("navArtisan"), link: "#artisan" },
    { name: t("navGallery"), link: "#gallery" },
    { name: t("navHiddenStory"), link: "#story" },
    { name: t("navBadge"), link: "#badge" },
    { name: t("navWhyChoose"), link: "#why" },
    { name: t("navContact"), link: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Navbar */}
        <div className="bg-[#F8F4EE]/90 backdrop-blur-md border border-[#E8DFC9] rounded-2xl shadow-lg px-8 py-8 flex items-center justify-between">
          {/* Logo */}
          <div>
            <h1 className="text-lg font-semibold text-[#6B0F1A]">
              HeritageLink
            </h1>

            <p className="text-[9px] uppercase tracking-[4px] text-[#B08D57] mt-1">
              Nepal
            </p>
          </div>

          {/* Right side: language switcher + menu button */}
          <div className="flex items-center gap-2">

            <LanguageSwitcher variant="light" />

            <button
              onClick={() => setOpen(!open)}
              className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-[#FFF8EA] transition"
            >
              {open ? (
                <X size={22} className="text-[#6B0F1A]" />
              ) : (
                <Menu size={22} className="text-[#6B0F1A]" />
              )}
            </button>

          </div>
        </div>

        {/* Dropdown Menu */}
        {open && (
          <div className="mt-2 bg-white rounded-2xl shadow-xl overflow-hidden">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={() => setOpen(false)}
                className="block px-6 py-4 border-b last:border-b-0 border-gray-100 hover:bg-[#FFF8EA] text-[#4B2E2A] font-medium transition"
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;