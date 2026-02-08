import { useLanguage } from './LanguageContext.tsx';
import zhTranslations from './translations/zh.json';
import enTranslations from './translations/en.json';

type TranslationKey = string;
type Translations = Record<string, any>;

const translations: Record<'zh' | 'en', Translations> = {
  zh: zhTranslations,
  en: enTranslations,
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: TranslationKey): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return { t, language };
};
