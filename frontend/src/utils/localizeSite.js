export const getLocalizedSite = (site, language) => {
    if(!site) return site;
    if (language ==="en") return site;

    const translation= site.translations?.[language];
    if(!translation) return site;

    return{
        ...site,
        name: translation.name || site.name,
        tagline: translation.tagline || site.tagline,
        shortDescription: translation.shortDescriptionn || site.shortDescription,
        locationLabel: translation.locationLabel || site.locationLabel,
        history: translation.history || site.history,
        hiddenstory: translation.hiddenstory || site.hiddenstory,
        audioTitle: translation.audioTitle || site.audioTitle,
        chapters:
            translation.chapter && translation.chapters.length > 0
                ? translation.chapters: site.chapters,
        artisan:{
            ...site.artisan,
            ...getLocalizedSite(translation.artisan || {}),
        },
        badge: {
            ...site.badge,
            ...(translation.badge || {}),
        },
    };
};