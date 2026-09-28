import React, { useEffect, useState } from "react";
import HeritageLoader from "../components/HeritageLoader";
import { getArtBySlug } from "../data/exhibitionArts";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, BadgeCheck, CheckCircle2 } from "lucide-react";
import api from "../utils/api";
import { useLanguage } from "../context/LanguageContext";
import { getLocalizedSite } from "../utils/localizeSite";
import { useHeritageCollection } from "../hooks/useHeritageCollection";

import PremiumNavbar from "../components/premium/PremiumNavbar";
import DiscoverHero from "../components/premium/DiscoverHero";
import AudioPlayer from "../components/AudioPlayer";
import DiscoverGallery from "../components/premium/DiscoverGallery";
import HeritageInfo from "../components/premium/HeritageInfo";
import PremiumFooter from "../components/premium/PremiumFooter";

// PAGE 1 — "Discover the Heritage"
//
// This is the page a HeritageLink QR code opens directly:
//   /premium/:slug
//
// The slug comes straight from the QR code, so the same component works
// for every artwork in the database — nothing here is hardcoded to a
// specific piece. It intentionally stays light (title, image, audio,
// gallery, short facts) and ends with a single CTA into Page 2, rather
// than trying to hold the entire experience on one long page.
const PremiumDiscover = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchSite = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get(`/sites/${slug}`);
        if (!cancelled) {
          setSite(response.data.site);
        }
      } catch (err) {
        // Fall back to exhibition catalogue data from the provided images
        const fallback = getArtBySlug(slug);
        if (!cancelled) {
          if (fallback) {
            setSite(fallback);
            setError("");
          } else {
            setError(
              err.response?.data?.message ||
                "Could not load this heritage artwork."
            );
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchSite();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // FEATURE 2 hand-off. Opening this page is what counts as "explored", so
  // a scanned QR and a directly-opened QR link both update the badge. The
  // hook is a no-op for signed-out visitors and never blocks the content.
  const { alreadyCollected, justCollected } = useHeritageCollection(site?._id);

  if (loading) {
    return <HeritageLoader message={t("loadingPremium")} />;
  }

  if (error || !site) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F4EE] px-6 text-center">
        <p className="text-[#7B1E23] font-semibold text-lg">
          {error || t("siteNotFound")}
        </p>
      </div>
    );
  }

  const localizedSite = getLocalizedSite(site, language);

  return (
    <div className="pb-24">
      <PremiumNavbar site={localizedSite} />

      {/* Badge feedback. "Already explored" is information, not an error —
          the content below opens exactly the same either way. */}
            {(justCollected || alreadyCollected) && (
        <div className="px-5 pt-20 pb-0">
          <div
            className={`rounded-xl px-3 py-2 flex items-center gap-2 border text-xs ${
              justCollected
                ? "bg-[#FFF8E8] border-[#EED7A0] text-[#4B2E2A]"
                : "bg-[#F3EFE7] border-[#E0D6C4] text-[#6B5A48]"
            }`}
          >
            {justCollected ? (
              <BadgeCheck size={16} className="text-[#D6A94F] shrink-0" />
            ) : (
              <CheckCircle2 size={16} className="text-[#8B7355] shrink-0" />
            )}
            <p className="font-medium leading-snug">
              {justCollected
                ? "Added to your Heritage Badge."
                : "Already explored."}
            </p>
          </div>
        </div>
      )}

      <DiscoverHero
        site={localizedSite}
        tightTop={Boolean(justCollected || alreadyCollected)}
      />

     
      <AudioPlayer site={localizedSite} />
      <DiscoverGallery site={localizedSite} />
      <HeritageInfo site={localizedSite} />

      <div className="px-6 mt-8 mb-4">
        <button
          onClick={() => navigate(`/premium/${slug}/story`)}
          className="w-full bg-[#7B1E23] hover:bg-[#65161B] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition duration-300 shadow-lg shadow-[#7B1E23]/20"
        >
          Continue the Story
          <ArrowRight size={20} />
        </button>
        <p className="text-center text-xs text-[#8B7355] mt-3">
          Page 2 — Video, artisan & deeper cultural story
        </p>
      </div>

      <PremiumFooter />
    </div>
  );
};

export default PremiumDiscover;
