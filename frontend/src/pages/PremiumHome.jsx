import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { useLanguage } from "../context/LanguageContext";
import { getLocalizedSite } from "../utils/localizeSite";
import PremiumNavbar from '../components/premium/PremiumNavbar'
import PremiumHero from '../components/premium/PremiumHero'
import AnimatedStory from '../components/premium/AnimatedStory'
import Artisan from '../components/premium/Atrisan'
import PremiumHistory from '../components/premium/PremiumHistory'
import PremiumGallery from '../components/premium/PremiumGallery'
import PremiumBadge from '../components/premium/PremiumBadge'
import PremiumFooter from '../components/premium/PremiumFooter'
import HeritageLoader from "../components/HeritageLoader";

const PremiumHome = () => {
  const { slug } = useParams();
  const { language, t } = useLanguage();

  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")

  useEffect (() => {
    let cancelled = false;

    const fetchSite = async () => {
      setLoading(true);
      setError("");

      try{
        const response = await api.get(`/sites/${slug}`);

        if (!cancelled) {
          setSite(response.data.site);
        }
      } catch (err){
        if(!cancelled) {
          setError(
            err.response?.data?.message ||
            "Could not load this heritage site."
          );
        }
      } finally{
        if(!cancelled) {
          setLoading(false);
        }
      }
    };
    fetchSite();

    return () => {
      cancelled = true;
    };
  }, [slug]);
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
    <>
    <PremiumNavbar site={localizedSite} />
    <PremiumHero site={localizedSite} />
    <AnimatedStory site={localizedSite} />
    <Artisan site={localizedSite} />
    <PremiumHistory site={localizedSite} />
    <PremiumGallery site={localizedSite} />
    <PremiumBadge site={localizedSite} />
    <PremiumFooter />
    </>
  )
}

export default PremiumHome