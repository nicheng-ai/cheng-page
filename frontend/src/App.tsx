import { ThemeProvider } from './context/ThemeContext.tsx';
import { LanguageProvider } from './i18n/LanguageContext.tsx';
import { DarkModeToggle } from './components/ui/DarkModeToggle.tsx';
import { LanguageToggle } from './components/ui/LanguageToggle.tsx';
import { useProfile } from './hooks/useProfile';
import { useNews } from './hooks/useNews';
import { useTranslation } from './i18n/useTranslation';
import { LoadingSpinner } from './components/ui/LoadingSpinner.tsx';
import { ErrorMessage } from './components/ui/ErrorMessage.tsx';

const AppContent = () => {
  const { profile, loading: profileLoading, error: profileError } = useProfile();
  const { news, loading: newsLoading, error: newsError } = useNews();
  const { t } = useTranslation();

  if (profileLoading || newsLoading) {
    return <LoadingSpinner />;
  }

  if (profileError || newsError) {
    return <ErrorMessage message={profileError || newsError || 'An error occurred'} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">{profile?.name}</h1>
          <div className="flex gap-2">
            <DarkModeToggle />
            <LanguageToggle />
          </div>
        </header>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="mb-4">
                <img
                  src="http://localhost:8000/api/profile-image"
                  alt={profile?.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover"
                />
              </div>
              <h2 className="text-xl font-bold text-center mb-2">{profile?.name}</h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-4">{profile?.title}</p>
              <p className="text-center">
                <a
                  href={`mailto:${profile?.email}`}
                  className="text-primary-500 hover:underline"
                >
                  {profile?.email}
                </a>
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <section>
              <h3 className="text-xl font-bold mb-4">{t('bio.title')}</h3>
              <div
                className="prose dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: profile?.bio || '' }}
              />
            </section>

            {/* News */}
            <section>
              <h3 className="text-xl font-bold mb-4">{t('news.title')}</h3>
              <div className="space-y-4">
                {news?.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[80px]">
                      {item.date}
                    </span>
                    <div
                      className="flex-1"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
