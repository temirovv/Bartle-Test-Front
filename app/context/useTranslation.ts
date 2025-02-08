import { useLanguage } from './LanguageContext';

export const useTranslation = () => { // <-- IMPORTANT: export const useTranslation
  const { translations } = useLanguage();

  const t = (key: string) => {
    return translations[key] || key;
  };

  return { t };
};