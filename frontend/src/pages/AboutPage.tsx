import { Mail, FlaskConical, Target } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { useResearch } from '../hooks/useResearch';
import { useSocialLinks } from '../hooks/useSocialLinks';
import { useNews } from '../hooks/useNews';
import { useTranslation } from '../i18n/useTranslation';
import { profileImageUrl } from '../api/client';

// GitHub Octocat — official mark
const GithubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

// LinkedIn — official mark
const LinkedinIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// Google Scholar — graduation cap
const ScholarIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
  </svg>
);

// 小红书 — red rounded square with stylised "书" mark
const RedNoteIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#FF2442"/>
    <path d="M7 8.5h6.5M7 12h10M7 15.5h8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="17" cy="8.5" r="1.5" fill="white"/>
  </svg>
);

// Southeast University — simplified academic building
const SEUIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v1h1v11H2v2h20v-2h-1V8h1V7L12 2zm0 2.3L19 8H5l7-3.7zM5 9h2v9H5V9zm4 0h2v9H9V9zm4 0h2v9h-2V9zm4 0h2v9h-2V9z"/>
  </svg>
);

const iconMap: Record<string, React.ReactNode> = {
  github: <GithubIcon />,
  mail: <Mail className="w-4 h-4" />,
  linkedin: <LinkedinIcon />,
  scholar: <ScholarIcon />,
  rednote: <RedNoteIcon />,
};


export const AboutPage = () => {
  const { profile, loading: pLoading } = useProfile();
  const { research, loading: rLoading } = useResearch();
  const { socialLinks } = useSocialLinks();
  const { news, loading: nLoading } = useNews();
  const { t, language } = useTranslation();

  if (pLoading || rLoading || nLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        {t('common.loading')}
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      {/* Hero */}
      <section className="flex flex-col-reverse md:flex-row gap-8 lg:gap-12 items-start mb-16">
        <div className="flex-1 min-w-0">
          <div className="flex items-end gap-4 mb-3">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-950 dark:text-gray-50">
              {language === 'en' ? (profile?.name_english || profile?.name) : profile?.name}
            </h1>
            {/* Show the other-language name as subtitle on the same line */}
            <span className="text-2xl sm:text-3xl text-gray-500 dark:text-gray-400 mb-0.5 font-normal">
              {language === 'en' ? profile?.name_chinese : profile?.name_english}
            </span>
          </div>
          
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 font-medium mb-6">
            {profile?.title}
          </p>
          
          <div
            className="text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-8 break-words [&_a]:break-all mb-7 [&_strong]:font-semibold [&_strong]:text-gray-950 dark:[&_strong]:text-gray-50 text-justify"
            dangerouslySetInnerHTML={{ __html: profile?.bio || '' }}
          />
          {socialLinks && (
            <div className="flex flex-wrap gap-3">
              {socialLinks.links.map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                    bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
                    hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {iconMap[link.icon]}
                  {language === 'en' && link.name_en ? link.name_en : link.name}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="w-48 sm:w-56 md:w-64 flex-shrink-0 mx-auto md:mx-0">
          <img
            src={profileImageUrl}
            alt={profile?.name}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            className="w-full aspect-[4/5] object-cover object-center rounded-xl ring-1 ring-gray-200 dark:ring-gray-700 shadow-sm"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Research + News */}
        <div className="lg:col-span-2 space-y-10">
          {research && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                {t('about.research')}
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <FlaskConical className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{t('about.interests')}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{research.interests}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Target className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{t('about.currentFocus')}</p>
                    <div className="text-sm text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: research.current_focus }} />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* News / Updates */}
          {news && news.items.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">
                {t('about.news')}
              </h2>
              <div className="relative">
                <div className="absolute left-[68px] top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />
                <div className="space-y-6">
                  {news.items.map(item => (
                    <div key={item.id} className="flex gap-5 items-start">
                      <div className="w-16 flex-shrink-0 text-right">
                        <span className="text-xs text-gray-400 dark:text-gray-500">{item.date}</span>
                      </div>
                      <div className="relative flex-shrink-0 mt-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-gray-900 z-10 relative" />
                      </div>
                      <div className="flex-1 pb-1">
                        <div
                          className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right: Contact card */}
        <div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-5 space-y-3 bg-gray-50 dark:bg-gray-800/50">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              {t('about.contact')}
            </h2>
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {profile.email}
              </a>
            )}
            {profile?.institution?.url && (
              <a
                href={profile.institution.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <SEUIcon />
                {profile.institution.name}
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
