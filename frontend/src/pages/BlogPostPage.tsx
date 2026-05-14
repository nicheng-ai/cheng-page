import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import { useBlogs } from '../hooks/useBlogs';

export const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { blogs, loading } = useBlogs();

  const post = blogs?.items?.find(p => p.id === id);

  if (loading) {
    return <div className="text-center text-gray-500 py-20">{t('common.loading')}</div>;
  }

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Blog Post Not Found</h1>
        <Link to="/blog" className="text-blue-600 hover:text-blue-500 flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <Link 
        to="/blog" 
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('common.back') || 'Back'}
      </Link>

      <article>
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <time>{post.date}</time>
          </div>
        </header>

        <div className="prose prose-gray dark:prose-invert max-w-none prose-lg">
          <div className="text-gray-800 dark:text-gray-200 leading-loose" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>
    </main>
  );
};