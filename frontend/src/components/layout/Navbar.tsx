import { NavLink } from 'react-router-dom';
import { DarkModeToggle } from '../ui/DarkModeToggle';
import { LanguageToggle } from '../ui/LanguageToggle';
import { useTranslation } from '../../i18n/useTranslation';

export const Navbar = () => {
  const { t } = useTranslation();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-1 py-0.5 text-sm font-medium border-b-2 transition-colors ${
      isActive
        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <NavLink to="/about" className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
          <img 
            src={`${import.meta.env.BASE_URL}blackhole.png`} 
            alt="Logo" 
            className="w-6 h-6 object-contain dark:invert mix-blend-multiply dark:mix-blend-screen"
          />
          {t('nav.name')}
        </NavLink>
        <nav className="flex items-center gap-6">
          <NavLink to="/about" className={navLinkClass}>{t('nav.about')}</NavLink>
          <NavLink to="/publications" className={navLinkClass}>{t('nav.publications')}</NavLink>
          <NavLink to="/blog" className={navLinkClass}>{t('nav.blog')}</NavLink>
          <NavLink to="/travels" className={navLinkClass}>{t('nav.travels')}</NavLink>
        </nav>
        <div className="flex items-center gap-1">
          <DarkModeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
};
