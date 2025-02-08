'use client';

import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext'; // Import useLanguage
import { useEffect } from 'react';
import { useTranslation } from '../context/useTranslation'; // <-- Correct import path

export default function WelcomePage() {
  const router = useRouter();
  const { setLocale, locale } = useLanguage(); // Use language context
  const { t } = useTranslation(); // Use translation hook

  const handleStartTestClick = () => {
    router.push('/questions');
  };

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale);
  };

  useEffect(() => {
    document.documentElement.lang = locale; // Update document lang attribute for accessibility
  }, [locale]);


  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>{t('bartleTest')} UI</div> {/* Use translation */}
          <div>
            <button
              className={`bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full ${locale === 'uz' ? 'opacity-100' : 'opacity-70'}`}
              onClick={() => handleLanguageChange('uz')}
            >
              Uzbek
            </button>
            <button
              className={`bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full ml-2 ${locale === 'en' ? 'opacity-100' : 'opacity-70'}`}
              onClick={() => handleLanguageChange('en')}
            >
              English
            </button>
            <button
              className={`bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full ml-2 ${locale === 'ru' ? 'opacity-100' : 'opacity-70'}`}
              onClick={() => handleLanguageChange('ru')}
            >
              Russian
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-20 flex-grow flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">{t('welcomeTitle')}</h1> {/* Use translation */}
        <p className="text-gray-700 text-center mb-8 max-w-lg">
          {t('welcomeDescription')} {/* Use translation */}
        </p>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg"
          onClick={handleStartTestClick}
        >
          {t('startTest')} {/* Use translation */}
        </button>
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 py-4">
        <div className="container mx-auto px-6 text-center text-gray-500">
          © 2025 {t('bartleTest')} Mars. All rights reserved. {/* Use translation */}
        </div>
      </footer>
    </div>
  );
}