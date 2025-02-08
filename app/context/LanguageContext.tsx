'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Define the shape of our translation object
interface Translations {
  [key: string]: string;
}
export type LocaleType = 'en' | 'uz' | 'ru'; // Add 'export' keyword here

interface LanguageContextProps {
  locale: string;
  setLocale: (locale: string) => void;
  translations: Translations;
  loadTranslations: (locale: string) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<string>('en'); // Default language is English
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false); // Track if translations are loaded

  const loadTranslations = useCallback(async (loc: string) => {
    try {
      const translationModule = await import(`../../locales/${loc}.json`); // Changed variable name to translationModule
      setTranslations(translationModule.default); // Access default export
      setIsLoaded(true);
    } catch (error) {
      console.error("Error loading translations for locale:", loc, error);
      setTranslations({});
      setIsLoaded(false);
    }
  }, []);


  useEffect(() => {
    loadTranslations(locale); // Load translations on initial load and locale change
  }, [locale, loadTranslations]);

  const value: LanguageContextProps = {
    locale,
    setLocale,
    translations,
    loadTranslations,
  };

  return (
    <LanguageContext.Provider value={value}>
      {isLoaded ? children : <div>Loading Language...</div>} {/* Optionally show loading state */}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
