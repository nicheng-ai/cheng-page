import { Languages } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle language"
    >
      <Languages className="w-5 h-5" />
      <span className="text-sm font-medium">
        {language === 'zh' ? 'EN' : '中文'}
      </span>
    </button>
  );
};
