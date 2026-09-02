import { NavLink, useLocation } from 'react-router-dom';
import {
  House,
  BookOpen,
  Lightning,
  PencilSimple,
  Brain,
  ChartLine,
  Headphones,
  Microphone,
  Globe,
  Gear,
  ArrowRight,
  SealCheck,
} from '@phosphor-icons/react';
import { useUserStore } from '@/stores/user.store';
import { useProgressStore } from '@/stores/progress.store';

import type { Icon } from '@phosphor-icons/react';

interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavItem {
  label: string;
  labelJP: string;
  to: string;
  icon: Icon;
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Learn',
    items: [
      { label: 'Home', labelJP: 'ホーム', to: '/dashboard', icon: House },
      { label: 'Lessons', labelJP: 'レッスン', to: '/learn', icon: BookOpen },
      { label: 'Review', labelJP: '復習', to: '/review', icon: Lightning },
    ],
  },
  {
    title: 'Study',
    items: [
      { label: 'Kanji', labelJP: '漢字', to: '/kanji', icon: PencilSimple },
      { label: 'Grammar', labelJP: '文法', to: '/grammar', icon: Brain },
      { label: 'Vocabulary', labelJP: '語彙', to: '/vocabulary', icon: Globe },
    ],
  },
  {
    title: 'Practice',
    items: [
      { label: 'Reading', labelJP: '読解', to: '/read', icon: BookOpen },
      { label: 'Listening', labelJP: 'リスニング', to: '/listen', icon: Headphones },
      { label: 'Speaking', labelJP: 'スピーキング', to: '/speak', icon: Microphone },
    ],
  },
  {
    title: 'Track',
    items: [
      { label: 'Progress', labelJP: '進捗', to: '/progress', icon: ChartLine },
      { label: 'Settings', labelJP: '設定', to: '/settings', icon: Gear },
    ],
  },
];

const LEVEL_COLORS: Record<string, string> = {
  N5: '#3BAF8C',
  N4: '#5090D0',
  N3: '#A070D8',
  N2: '#D0A030',
  N1: '#C2334D',
};

export function Sidebar() {
  const location = useLocation();
  const profile = useUserStore(s => s.profile);
  const user = useUserStore(s => s.user);
  const dueCount = useProgressStore(s => s.dueCardCount());

  const currentLevel = profile?.currentLevel ?? 'N5';
  const levelColor = LEVEL_COLORS[currentLevel];

  return (
    <aside
      className="flex flex-col h-full w-64 flex-shrink-0"
      style={{ background: 'var(--color-base-800)', borderRight: '1px solid var(--color-base-500)' }}
    >
      {/* Logo */}
      <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--color-base-600)' }}>
        <img
          src="/tsuzuku_app_logo.png"
          alt="TSUZUKU"
          style={{ height: 36, width: 'auto', objectFit: 'contain', maxWidth: 160 }}
        />
      </div>

      {/* Level badge */}
      <div className="px-5 py-3 border-b" style={{ borderColor: 'var(--color-base-600)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="badge"
              style={{
                background: `${levelColor}20`,
                color: levelColor,
                border: `1px solid ${levelColor}40`,
                fontWeight: 600,
              }}
            >
              {currentLevel}
            </span>
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Current level</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
        {NAV_SECTIONS.map(section => (
          <div key={section.title}>
            <div
              className="px-2 mb-1 text-2xs font-semibold tracking-widest uppercase"
              style={{ color: 'var(--color-text-dim)', fontSize: '0.65rem', letterSpacing: '0.1em' }}
            >
              {section.title}
            </div>
            <div className="space-y-0.5">
              {section.items.map(item => {
                const isActive = location.pathname === item.to ||
                  (item.to !== '/dashboard' && location.pathname.startsWith(item.to));

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                  >
                    <item.icon
                      size={18}
                      weight={isActive ? 'fill' : 'regular'}
                      className="nav-icon flex-shrink-0"
                      style={{ color: isActive ? 'var(--color-vermillion-400)' : 'var(--color-text-muted)' }}
                    />
                    <span className="flex-1">{item.label}</span>
                    {/* Review count badge */}
                    {item.to === '/review' && dueCount > 0 && (
                      <span
                        className="badge badge-vermillion text-xs font-bold"
                        style={{ padding: '0.1rem 0.4rem', minWidth: '1.5rem', textAlign: 'center' }}
                      >
                        {dueCount > 99 ? '99+' : dueCount}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Profile footer */}
      <div className="px-3 py-3 border-t" style={{ borderColor: 'var(--color-base-600)' }}>
        <NavLink
          to="/profile"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-[var(--color-base-700)] group"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
            style={{ background: 'var(--color-base-600)', color: 'var(--color-text-primary)' }}
          >
            {(user?.displayName ?? 'L')[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
              {user?.displayName ?? 'Learner'}
            </div>
            <div className="text-xs truncate text-[var(--color-success)] flex items-center gap-1">
              <SealCheck size={12} weight="fill" /> Local Storage
            </div>
          </div>
          <ArrowRight
            size={14}
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: 'var(--color-text-muted)' }}
          />
        </NavLink>
      </div>
    </aside>
  );
}
