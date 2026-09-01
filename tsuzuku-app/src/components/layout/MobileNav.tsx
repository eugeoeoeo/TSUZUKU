import { NavLink, useLocation } from 'react-router-dom';
import { House, BookOpen, Lightning, PencilSimple, ChartLine } from '@phosphor-icons/react';
import { useProgressStore } from '@/stores/progress.store';

const MOBILE_NAV = [
  { label: 'Home', to: '/dashboard', icon: House },
  { label: 'Learn', to: '/learn', icon: BookOpen },
  { label: 'Review', to: '/review', icon: Lightning },
  { label: 'Kanji', to: '/kanji', icon: PencilSimple },
  { label: 'Progress', to: '/progress', icon: ChartLine },
];

export function MobileNav() {
  const location = useLocation();
  const dueCount = useProgressStore(s => s.dueCardCount());

  return (
    <nav
      className="flex items-stretch surface-blur border-t"
      style={{
        background: 'rgba(20, 20, 23, 0.92)',
        borderColor: 'var(--color-base-500)',
        paddingBottom: 'env(safe-area-inset-bottom, 0)',
      }}
    >
      {MOBILE_NAV.map(item => {
        const isActive = location.pathname === item.to ||
          (item.to !== '/dashboard' && location.pathname.startsWith(item.to));

        return (
          <NavLink
            key={item.to}
            to={item.to}
            className="relative flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 transition-colors"
            style={{ color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}
          >
            <div className="relative">
              <item.icon
                size={22}
                weight={isActive ? 'fill' : 'regular'}
                style={{ color: isActive ? 'var(--color-vermillion-400)' : 'inherit' }}
              />
              {item.to === '/review' && dueCount > 0 && (
                <span
                  className="absolute -top-1 -right-2 w-4 h-4 rounded-full text-2xs font-bold flex items-center justify-center"
                  style={{
                    background: 'var(--color-vermillion-500)',
                    color: '#fff',
                    fontSize: '0.55rem',
                  }}
                >
                  {dueCount > 9 ? '9+' : dueCount}
                </span>
              )}
            </div>
            <span className="text-2xs" style={{ fontSize: '0.65rem' }}>{item.label}</span>
            {isActive && (
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                style={{ background: 'var(--color-vermillion-500)' }}
              />
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
