
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { ArrowRight, MapPin, Sparkles } from "lucide-react";

import { fetchAllHeritage } from "../services/heritageService";

import PremiumNavbar from "../components/premium/PremiumNavbar";

import PremiumFooter from "../components/premium/PremiumFooter";

import HeritageLoader from "../components/HeritageLoader";

const HeritageHome = () => {
    const navigate = useNavigate();

    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setLoading(true);
            setError("");

            try {
                const data = await fetchAllHeritage();

                if (!cancelled) {
                    setSites(Array.isArray(data) ? data : []);
                }
            } catch {
                if (!cancelled) {
                    setSites([]);
                    setError("Unable to load heritage collection.");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        load();

        return () => {
            cancelled = true;
        };
    }, []);

    if (loading) {
        return (
            <HeritageLoader message="Loading heritage collection..." />
        );
    }

    return (
        <div className="min-h-dvh bg-[#F8F4EE] flex flex-col">
            <PremiumNavbar site={null} />

            <main className="flex-1 pt-28 pb-16 px-5 md:px-8 max-w-6xl mx-auto w-full">
                <div className="text-center mb-10 md:mb-14">
                    <div className="inline-flex items-center gap-2 bg-[#FFF5D8] text-[#7B1E23] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                        <Sparkles size={14} />

                        Heritage Collection
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-[#4B2E2A]">
                        Discover Heritage Arts
                    </h1>

                    <p className="mt-3 text-[#8B7355] max-w-xl mx-auto leading-relaxed">
                        Explore the full catalogue of cultural treasures. Select any piece
                        to open its detailed story, history, and digital experience.
                    </p>
                </div>

                {error && (
                    <div className="text-center py-8">
                        <p className="text-[#7B1E23] font-semibold">
                            {error}
                        </p>
                    </div>
                )}

                {sites.length === 0 && !error && (
                    <div className="text-center py-16">
                        <p className="text-[#8B7355]">
                            No heritage items available yet.
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {sites.map((site) => (
                        <button
                            key={site._id || site.slug}
                            type="button"
                            onClick={() => navigate(`/premium/${site.slug}`)}
                            className="group text-left bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-[#E8DFD0] transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#D6A94F] focus:ring-offset-2"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE8DE]">
                                {site.heroImage ||
                                site.image ||
                                site.coverImage ||
                                (site.gallery && site.gallery[0]) ? (
                                    <img
                                        src={
                                            site.heroImage ||
                                            site.image ||
                                            site.coverImage ||
                                            site.gallery[0]
                                        }
                                        alt={site.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[#D6A94F]/40">
                                        <MapPin size={48} />
                                    </div>
                                )}

                                {site.tagline && (
                                    <span className="absolute top-3 left-3 bg-[#4B2E2A]/90 text-[#D6A94F] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                                        {site.tagline}
                                    </span>
                                )}
                            </div>

                            <div className="p-5">
                                <h2 className="text-lg font-bold text-[#4B2E2A] group-hover:text-[#7B1E23] transition-colors line-clamp-1">
                                    {site.name}
                                </h2>

                                {(site.artisan?.name || site.locationLabel) && (
                                    <p className="mt-1 text-xs text-[#8B7355] flex items-center gap-1">
                                        {site.artisan?.name
                                            ? `Artist: ${site.artisan.name}`
                                            : site.locationLabel}
                                    </p>
                                )}

                                <p className="mt-2 text-sm text-[#6B5B4F] leading-relaxed line-clamp-3">
                                    {site.shortDescription ||
                                        site.description ||
                                        site.history?.slice(0, 120) ||
                                        "Discover the story behind this cultural treasure."}
                                </p>

                                <div className="mt-4 flex items-center gap-1.5 text-[#D6A94F] text-sm font-semibold">
                                    Explore

                                    <ArrowRight
                                        size={16}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </main>

            <PremiumFooter />
        </div>
    );
};

export default HeritageHome;


