import { PenLine } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

const PLACEHOLDER_POSTS = [
  { id: 1, tag: 'AI' },
  { id: 2, tag: '技术' },
  { id: 3, tag: '创业' },
];

export const BlogPage = () => {
  const { t } = useTranslation();

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t('blog.title')}
        </h1>
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5">
          <PenLine className="w-3.5 h-3.5" />
          {t('blog.comingSoon')}
        </span>
      </div>

      <div className="space-y-4">
        {PLACEHOLDER_POSTS.map(post => (
          <div
            key={post.id}
            className="rounded-xl border border-dashed border-gray-200 dark:border-gray-700 p-6 bg-gray-50/50 dark:bg-gray-800/30"
          >
            {/* Title skeleton */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="space-y-2 flex-1">
                <div className="h-4 w-2/3 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="h-3 w-1/3 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
              </div>
              <span className="flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500">
                {post.tag}
              </span>
            </div>
            {/* Body skeleton */}
            <div className="space-y-1.5">
              <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
              <div className="h-3 w-5/6 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
              <div className="h-3 w-4/6 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
            </div>
            {/* Footer skeleton */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="h-3 w-16 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
              <div className="h-3 w-10 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
