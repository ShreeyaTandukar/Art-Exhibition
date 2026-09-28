import React, { useEffect, useState } from 'react'
import HeritageLoader from "../components/HeritageLoader";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { useLanguage } from "../context/LanguageContext";
import { getLocalizedSite } from "../utils/localizeSite";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AudioGuide from "../components/AudioGuide";
import AudioPlayer from '../components/AudioPlayer';
import Artisan from '../components/Artisan';
import HeritageGallery from '../components/HeritageGallery';
import HiddenStory from '../components/HiddenStory';
import Badge from '../components/Badge';
import WhyChooseUs from '../components/WhyChoose';
import Footer from '../components/Footer';

const Home = () => {
  const { slug } = useParams();
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
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Could not load this heritage site."
          );
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

  if (loading) {
    return <HeritageLoader message={t("loadingSite")} />;
  }

  if (error || !site) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F4EE] px-6 text-center">
        <p className="text-[#7B1E23] font-semibold text-lg">
          {error || t("siteNotFound")}
        </p>
        <p className="text-[#8B7355] mt-2 text-sm">
          Check that "{slug}" has been seeded into the database.
        </p>
      </div>
    );
  }

  // Every child below reads plain site.name / site.history / etc — they
  // have no idea a translation happened, it's all merged in right here.
  const localizedSite = getLocalizedSite(site, language);

  return (
    <>
    <Navbar site={localizedSite} />
    <Hero site={localizedSite} />
    <AudioGuide site={localizedSite} />
    <AudioPlayer site={localizedSite} />
    <Artisan site={localizedSite} />
    <HeritageGallery site={localizedSite} />
    <HiddenStory site={localizedSite} />
    <Badge site={localizedSite} />
    <WhyChooseUs />
    <Footer />

    </>
  );
}

export default Home