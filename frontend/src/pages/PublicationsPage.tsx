import { ExternalLink } from 'lucide-react';
import { usePublications } from '../hooks/usePublications';
import { useTranslation } from '../i18n/useTranslation';

export const PublicationsPage = () => {
  const { data: pubData, loading } = usePublications();
  const { t, language } = useTranslation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        {t('common.loading')}
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {t('about.publications')}
        </h1>
      </div>

      {pubData && pubData.items.length > 0 ? (
        <div className="space-y-6">
          {pubData.items.map((pub, i) => (
            <div key={pub.id} className="flex gap-4 items-start p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold flex items-center justify-center mt-1">
                {i + 1}
              </span>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-snug">
                    {language === 'en' ? pub.title_en : pub.title}
                  </h2>
                  {pub.url && (
                    <a href={pub.url} target="_blank" rel="noopener noreferrer"
                      className="flex-shrink-0 text-gray-400 hover:text-blue-500 transition-colors mt-1">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{pub.authors}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                    {pub.venue_short}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
                    {pub.year}
                  </span>
                  {pub.tags.map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
          <p className="text-gray-500 dark:text-gray-400">{t('blog.empty')}</p>
        </div>
      )}
    </main>
  );
};