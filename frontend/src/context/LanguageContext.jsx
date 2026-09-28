import React, {createContext, useContext, useState, useEffect, Children} from "react";
import {uiStrings} from "../i18n/uiStrings";

const LanguageContext = createContext(null);

export const LANGUAGE =[
    {code:"en", label: "English", nativeLabel: "English"},
    {code: "ne", label: "Nepali", nativeLabel: "नेपाली"},
    {code: "new", label: "Newari", nativeLabel: "नेवाः"},
];

const STORAGE_KEY = "heritageLinkLanguage";

export const LanguageProvider= ({children}) => {
    const[language, setLanguageState] = useState(()=>{
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved && LANGUAGE.some((l) => l.code ===saved) ? saved: "en";
    });

    useEffect (()=>{
        localStorage.setItem(STORAGE_KEY, language);
    }, [language]);

    const setLanguage = (code) => {
        if(LANGUAGE.some((l) => l.code=== code)){
            setLanguageState(code);
        }
    };

    const t =(key) => {
        return(
            uiStrings[language]?.[key]??
            uiStrings.en?.[key]??
            key
        );
    };
    return(
        <LanguageContext.Provider value={{ language, setLanguage,t}}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);

    if(!context){
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}