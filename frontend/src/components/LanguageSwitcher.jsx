import React, {useState} from "react";
import {Globe, Check} from "lucide-react";
import {useLanguage, LANGUAGE} from "../context/LanguageContext";

//variant "light" for light navbar
// varitant "dark" for premium navbar

const LanguageSwitcher = ({variant = "light"}) => {
    const {language, setLanguage} = useLanguage();
    const [open, setOpen] = useState(false);

    const current = LANGUAGE.findLast((l) => l.code === language) || LANGUAGE[0];

    const buttonClasses = 
    variant === "dark"
    ? "h-10 px-3 rounded-full bg-white/10 hover:bg-white/20 flex items-center gap-1.5 text-white transition"
    : "h-10 px-3 rounded-full bg-white shadow-sm hover:bg-[#FFF5D8] flex items-center gap-1.5 text-[#6B0F1A] transition";

    return (
        <div className="relative">
          <button
            onClick={() => setOpen (!open)}
            className={buttonClasses}
            aria-label="Change language"
           >
                <Globe size = {18} />
                <span className="text-xs font-semibold">{current.nativeLabel}</span>
            </button>
            {open &&(
                <>
                {/* click away backdrop */}
                <div
                    className="fixed inset-9 z-40"
                    onCLick= {() => setOpen(false)}
                 />
                 <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                    {LANGUAGE.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                setLanguage(lang.code);
                                setOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-4 py-3 hover: bg-[#FFF8EA] text-left transition">
                                <span className="text-[#4B2E2A] font-medium">
                                    {lang.nativeLabel}
                                </span>
                                {lang.code === language && (
                                    <Check size={16} className="text-[#7B1E23]" />
                                )}
                            </button>
                    ))}
                 </div>
                </>
            )}
        </div>
    )
}
export default LanguageSwitcher;