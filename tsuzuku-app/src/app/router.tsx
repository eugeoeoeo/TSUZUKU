import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppShell } from '@/components/layout/AppShell';

// ============================================================
// Page imports (lazy-loaded for code splitting)
// ============================================================
const LandingPage = lazy(() => import('@/pages/Landing/LandingPage'));
const OnboardingPage = lazy(() => import('@/pages/Onboarding/OnboardingPage'));
const PlacementPage = lazy(() => import('@/pages/Placement/PlacementPage'));
const DashboardPage = lazy(() => import('@/pages/Dashboard/DashboardPage'));
const LearnPage = lazy(() => import('@/pages/Learn/LearnPage'));
const LevelPage = lazy(() => import('@/pages/Learn/LevelPage'));
const UnitPage = lazy(() => import('@/pages/Learn/UnitPage'));
const LessonPage = lazy(() => import('@/pages/Lesson/LessonPage'));
const ReviewPage = lazy(() => import('@/pages/Review/ReviewPage'));
const GrammarBrowserPage = lazy(() => import('@/pages/Grammar/GrammarBrowserPage'));
const GrammarDetailPage = lazy(() => import('@/pages/Grammar/GrammarDetailPage'));
const KanjiBrowserPage = lazy(() => import('@/pages/Kanji/KanjiBrowserPage'));
const KanjiDetailPage = lazy(() => import('@/pages/Kanji/KanjiDetailPage'));
const VocabularyBrowserPage = lazy(() => import('@/pages/Vocabulary/VocabularyBrowserPage'));
const VocabularyDetailPage = lazy(() => import('@/pages/Vocabulary/VocabularyDetailPage'));
const ReadPage = lazy(() => import('@/pages/Read/ReadPage'));
const ListenPage = lazy(() => import('@/pages/Listen/ListenPage'));
const SpeakPage = lazy(() => import('@/pages/Speak/SpeakPage'));
const ProgressPage = lazy(() => import('@/pages/Progress/ProgressPage'));
const SettingsPage = lazy(() => import('@/pages/Settings/SettingsPage'));
const ProfilePage = lazy(() => import('@/pages/Profile/ProfilePage'));
const SearchPage = lazy(() => import('@/pages/Search/SearchPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFoundPage'));

// ============================================================
// Loading fallback
// ============================================================
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--color-base-900)' }}>
      <div className="text-center">
        <div
          className="font-jp-serif text-jp-2xl mb-3"
          style={{ color: 'var(--color-text-dim)', animation: 'pulse 2s ease-in-out infinite' }}
        >
          続
        </div>
        <div className="text-xs" style={{ color: 'var(--color-text-dim)' }}>Loading...</div>
      </div>
    </div>
  );
}

function withSuspense(Component: React.LazyExoticComponent<() => React.ReactElement>) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

import { useUserStore } from '@/stores/user.store';
import { useProgressStore } from '@/stores/progress.store';

// ============================================================
// Root Entry: Automatically skips landing page if user already set up device profile
// ============================================================
function RootEntry() {
  const onboarding = useUserStore(s => s.onboarding);
  const progress = useProgressStore(s => s.progress);
  const isLoading = useUserStore(s => s.isLoading);

  if (isLoading) return <PageLoader />;

  // Existing user on this device ➔ Go straight to Dashboard
  if (onboarding?.step === 'complete' || (progress && (progress.lessonsCompleted.length > 0 || progress.streak > 0))) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <LandingPage />
    </Suspense>
  );
}

// ============================================================
// Router configuration
// ============================================================
export const router = createBrowserRouter([
  // Root route: smart redirect for active learners
  {
    path: '/',
    element: <RootEntry />,
  },

  // Standalone pages (immersive — no sidebar)
  {
    path: '/onboarding',
    element: withSuspense(OnboardingPage),
  },
  {
    path: '/placement',
    element: withSuspense(PlacementPage),
  },
  {
    path: '/lesson/:lessonId',
    element: withSuspense(LessonPage),
  },
  {
    path: '/review',
    element: withSuspense(ReviewPage),
  },

  // App shell routes (with sidebar)
  {
    element: <AppShell />,
    children: [
      { path: '/dashboard', element: withSuspense(DashboardPage) },

      // Curriculum
      { path: '/learn', element: withSuspense(LearnPage) },
      { path: '/learn/:level', element: withSuspense(LevelPage) },
      { path: '/learn/:level/:unitId', element: withSuspense(UnitPage) },

      // Kanji
      { path: '/kanji', element: withSuspense(KanjiBrowserPage) },
      { path: '/kanji/:character', element: withSuspense(KanjiDetailPage) },

      // Grammar
      { path: '/grammar', element: withSuspense(GrammarBrowserPage) },
      { path: '/grammar/:id', element: withSuspense(GrammarDetailPage) },

      // Vocabulary
      { path: '/vocabulary', element: withSuspense(VocabularyBrowserPage) },
      { path: '/vocabulary/:id', element: withSuspense(VocabularyDetailPage) },

      // Practice
      { path: '/read', element: withSuspense(ReadPage) },
      { path: '/listen', element: withSuspense(ListenPage) },
      { path: '/speak', element: withSuspense(SpeakPage) },

      // User
      { path: '/progress', element: withSuspense(ProgressPage) },
      { path: '/settings', element: withSuspense(SettingsPage) },
      { path: '/profile', element: withSuspense(ProfilePage) },
      { path: '/search', element: withSuspense(SearchPage) },

      // Redirect
      { path: '/app', element: <Navigate to="/dashboard" replace /> },
    ],
  },

  // 404
  {
    path: '*',
    element: withSuspense(NotFoundPage),
  },
]);
