import { Github, Mail, Linkedin, FlaskConical, BookOpen, Target, ExternalLink } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { useResearch } from '../hooks/useResearch';
import { useSocialLinks } from '../hooks/useSocialLinks';
import { useNews } from '../hooks/useNews';
import { usePublications } from '../hooks/usePublications';
import { useTranslation } from '../i18n/useTranslation';

const ScholarIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
  </svg>
);

const RedNoteIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/>
  </svg>
);

const iconMap: Record<string, React.ReactNode> = {
  github: <Github className="w-4 h-4" />,
  mail: <Mail className="w-4 h-4" />,
  linkedin: <Linkedin className="w-4 h-4" />,
  scholar: <ScholarIcon />,
  rednote: <RedNoteIcon />,
};


export const AboutPage = () => {
  const { profile, loading: pLoading } = useProfile();
  const { research, loading: rLoading } = useResearch();
  const { socialLinks } = useSocialLinks();
  const { news, loading: nLoading } = useNews();
  const { data: pubData } = usePublications();
  const { t, language } = useTranslation();

  if (pLoading || rLoading || nLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        {t('common.loading')}
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center mb-14">
        <img
          src="http://localhost:8000/api/profile-image"
          alt={profile?.name}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          className="w-28 h-36 rounded-xl object-cover object-top flex-shrink-0 ring-1 ring-gray-200 dark:ring-gray-700"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {language === 'en' ? (profile?.name_english || profile?.name) : profile?.name}
          </h1>
          {/* Show the other-language name as subtitle */}
          {language === 'en'
            ? profile?.name_chinese && <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">{profile.name_chinese}</p>
            : profile?.name_english && <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">{profile.name_english}</p>
          }
          <p className="text-base text-blue-600 dark:text-blue-400 font-medium mb-4">
            {profile?.title}
          </p>
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Bio + Research + News */}
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
              {t('about.bio')}
            </h2>
            <div
              className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: profile?.bio || '' }}
            />
          </section>

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
          {/* Publications */}
          {pubData && pubData.items.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-5">
                {t('about.publications')}
              </h2>
              <div className="space-y-4">
                {pubData.items.map((pub, i) => (
                  <div key={pub.id} className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-snug">
                          {language === 'en' ? pub.title_en : pub.title}
                        </p>
                        {pub.url && (
                          <a href={pub.url} target="_blank" rel="noopener noreferrer"
                            className="flex-shrink-0 text-gray-400 hover:text-blue-500 transition-colors mt-0.5">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{pub.authors}</p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                          {pub.venue_short}
                        </span>
                        <span className="text-xs text-gray-400">{pub.year}</span>
                        {pub.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
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
                <Github className="w-4 h-4" />
                {profile.institution.name}
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
