import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/useTranslation';
import { useBlogs } from '../hooks/useBlogs';

export const BlogPage = () => {
  const { t, language } = useTranslation();
  const { blogs, loading } = useBlogs();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {t('blog.title')}
        </h1>
      </div>

      <div className="grid gap-8">
        {loading ? (
          <div className="text-center text-gray-500 py-10">{t('common.loading')}</div>
        ) : blogs?.items && blogs.items.length > 0 ? (
          blogs.items.map(post => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group flex flex-col md:flex-row gap-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {post.imageUrl && (
                <div className="w-full md:w-1/3 lg:w-2/5 aspect-video md:aspect-auto overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img 
                    src={post.imageUrl.startsWith('http') ? post.imageUrl : `${import.meta.env.BASE_URL}${post.imageUrl.replace(/^\//, '')}`} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <Calendar className="w-4 h-4" />
                  <time>{post.date}</time>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-snug mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 mb-6 flex-1">
                  {post.summary || post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...'}
                </p>

                <div className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 mt-auto">
                  {language === 'en' ? 'Read More' : '阅读全文'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-20 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
            <p className="text-gray-500 dark:text-gray-400">{t('blog.comingSoon')}</p>
          </div>
        )}
      </div>
    </main>
  );
};
