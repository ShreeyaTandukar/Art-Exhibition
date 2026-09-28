import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    Sparkles,
    BookOpen,
    ChevronRight,
} from "lucide-react";

import api from "../utils/api";

import { useLanguage } from "../context/LanguageContext";

import { getLocalizedSite } from "../utils/localizeSite";

import HeritageLoader from "../components/HeritageLoader";

import { getArtBySlug } from "../data/exhibitionArts";

import PremiumNavbar from "../components/premium/PremiumNavbar";

import Artisan from "../components/premium/Atrisan";

import MakingProcess from "../components/premium/MakingProcess";

import ArtworkDetails from "../components/premium/ArtworkDetails";

import PremiumBadge from "../components/premium/PremiumBadge";

import PremiumFooter from "../components/premium/PremiumFooter";

const PremiumStory = () => {
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

    if (loading) {
        return (
            <HeritageLoader message={t("loadingPremium")} />
        );
    }

    if (error || !site) {
        return (
            <div className="min-h-screen bg-[#F8F4EE] flex items-center justify-center px-6">
                <div className="w-full max-w-md bg-white rounded-3xl border border-[#E8DFD0] shadow-lg p-8 text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-[#FFF5D8] flex items-center justify-center">
                        <BookOpen
                            size={24}
                            className="text-[#D6A94F]"
                        />
                    </div>

                    <h2 className="mt-5 text-xl font-bold text-[#4B2E2A]">
                        Artwork Not Found
                    </h2>

                    <p className="mt-2 text-sm text-[#8B7355] leading-relaxed">
                        {error || t("siteNotFound")}
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/premium")}
                        className="mt-6 inline-flex items-center gap-2 bg-[#7B1E23] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#64181C] transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to Collection
                    </button>
                </div>
            </div>
        );
    }

    const localizedSite = getLocalizedSite(site, language);

    return (
        <div className="min-h-screen bg-[#F8F4EE] text-[#4B2E2A]">
            <PremiumNavbar site={localizedSite} />

            <main className="pt-20">
                <section className="px-5 md:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between py-6">
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(`/premium/${slug}`)
                                }
                                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#7B1E23] hover:text-[#4B2E2A] transition-colors w-fit"
                            >
                                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#E8DFD0] shadow-sm group-hover:border-[#D6A94F] transition-colors">
                                    <ArrowLeft size={16} />
                                </span>

                                <span>
                                    Back to Discovery
                                </span>
                            </button>

                            <div className="hidden md:flex items-center gap-2 text-xs text-[#A08B72]">
                                <span>
                                    Heritage Collection
                                </span>

                                <ChevronRight size={13} />

                                <span className="text-[#7B1E23] font-medium truncate max-w-[260px]">
                                    {localizedSite.name}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-5 md:px-8 pb-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative overflow-hidden rounded-3xl bg-[#4B2E2A] px-6 py-8 md:px-10 md:py-10 shadow-lg">
                            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#D6A94F]/10" />

                            <div className="absolute -bottom-24 -left-20 w-52 h-52 rounded-full bg-[#D6A94F]/10" />

                            <div className="relative">
                                <div className="inline-flex items-center gap-2 bg-[#FFF5D8] text-[#7B1E23] px-3.5 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest">
                                    <Sparkles size={13} />

                                    Experience the Story
                                </div>

                                <h1 className="mt-5 text-2xl md:text-4xl font-bold text-white leading-tight">
                                    {localizedSite.name}
                                </h1>

                                {localizedSite.shortDescription && (
                                    <p className="mt-3 max-w-2xl text-sm md:text-base text-[#F1E7D8] leading-relaxed">
                                        {localizedSite.shortDescription}
                                    </p>
                                )}

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {localizedSite.craft && (
                                        <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs text-[#F8F4EE]">
                                            {localizedSite.craft}
                                        </span>
                                    )}

                                    {localizedSite.material && (
                                        <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs text-[#F8F4EE]">
                                            {localizedSite.material}
                                        </span>
                                    )}

                                    {localizedSite.locationLabel && (
                                        <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs text-[#F8F4EE]">
                                            {localizedSite.locationLabel}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="space-y-0">
                    <Artisan site={localizedSite} />

                    <MakingProcess site={localizedSite} />

                    <ArtworkDetails site={localizedSite} />

                    <PremiumBadge site={localizedSite} />
                </div>
            </main>

            <PremiumFooter />
        </div>
    );
};

export default PremiumStory;