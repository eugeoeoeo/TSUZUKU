import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { KanaCanvas } from './KanaCanvas';
import { ToastContainer } from '@/components/ui/Toast';

// Pages that use immersive (full screen) mode — no sidebar
const IMMERSIVE_ROUTES = ['/lesson', '/review', '/placement', '/onboarding'];

function isImmersive(pathname: string): boolean {
  return IMMERSIVE_ROUTES.some(r => pathname.startsWith(r));
}

export function AppShell() {
  const location = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);
  const immersive = isImmersive(location.pathname);

  // Scroll to top on route change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname]);

  if (immersive) {
    return (
      <div className="relative min-h-dvh flex flex-col" style={{ background: 'var(--color-base-900)' }}>
        <KanaCanvas />
        <div className="relative z-10 flex-1 flex flex-col">
          <Outlet />
        </div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh flex" style={{ background: 'var(--color-base-900)' }}>
      <KanaCanvas />

      {/* Sidebar — desktop only */}
      <div className="hidden md:flex flex-col sticky top-0 h-dvh z-20">
        <Sidebar />
      </div>

      {/* Main content area */}
      <main
        ref={mainRef}
        className="flex-1 relative z-10 overflow-y-auto min-h-dvh"
      >
        <div className="page-enter">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30">
        <MobileNav />
      </div>

      <ToastContainer />
    </div>
  );
}
