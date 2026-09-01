import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { router } from './router';
import { ToastProvider } from '@/components/ui/Toast';
import { useUserStore } from '@/stores/user.store';
import { useProgressStore } from '@/stores/progress.store';

import { logger } from '@/lib/logger';

function AppInitializer({ children }: { children: React.ReactNode }) {
  const initUser = useUserStore(s => s.initUser);
  const initProgress = useProgressStore(s => s.initProgress);
  const user = useUserStore(s => s.user);
  const profile = useUserStore(s => s.profile);
  const isLoading = useUserStore(s => s.isLoading);

  useEffect(() => {
    logger.info('AppInitializer', 'Bootstrapping TSUZUKU platform...');
    initUser();
  }, [initUser]);

  useEffect(() => {
    if (user?.id) {
      logger.store('UserStore', `User authenticated: ${user.displayName} (Level ${profile?.currentLevel ?? 'N5'})`, user);
      initProgress(user.id);
    }
  }, [user?.id, initProgress, profile?.currentLevel]);

  if (isLoading) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ background: 'var(--color-base-900)' }}
      >
        <div className="text-center">
          <div
            className="font-jp-serif font-bold mb-2"
            style={{ fontSize: '4rem', color: 'var(--color-text-primary)', animation: 'pulse 2s ease-in-out infinite' }}
          >
            続
          </div>
          <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>TSUZUKU</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <ToastProvider>
      <AppInitializer>
        <RouterProvider router={router} />
      </AppInitializer>
    </ToastProvider>
  );
}
