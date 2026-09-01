import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, Info, Warning, X } from '@phosphor-icons/react';

// ============================================================
// Toast Types
// ============================================================
type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
}

// ============================================================
// Context
// ============================================================
interface ToastContextValue {
  addToast: (toast: Omit<Toast, 'id'>) => void;
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
  info: (message: string, description?: string) => void;
  warning: (message: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev.slice(-4), { ...toast, id }]); // Max 5 toasts

    const duration = toast.duration ?? 4000;
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
  }, [removeToast]);

  const success = useCallback((message: string, description?: string) =>
    addToast({ type: 'success', message, description }), [addToast]);
  const error = useCallback((message: string, description?: string) =>
    addToast({ type: 'error', message, description, duration: 6000 }), [addToast]);
  const info = useCallback((message: string, description?: string) =>
    addToast({ type: 'info', message, description }), [addToast]);
  const warning = useCallback((message: string, description?: string) =>
    addToast({ type: 'warning', message, description }), [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, success, error, info, warning }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

import type { Icon } from '@phosphor-icons/react';

// ============================================================
// Toast UI Components
// ============================================================
const ICONS: Record<ToastType, Icon> = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: Warning,
};

const CLASS_MAP: Record<ToastType, string> = {
  success: 'toast-success',
  error: 'toast-error',
  info: 'toast-info',
  warning: 'toast-info', // reuse info style for warning
};

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const Icon = ICONS[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`toast ${CLASS_MAP[toast.type]}`}
      role="alert"
    >
      <Icon size={18} weight="fill" />
      <div className="flex-1 min-w-0">
        <div className="font-medium">{toast.message}</div>
        {toast.description && (
          <div className="text-xs opacity-80 mt-0.5">{toast.description}</div>
        )}
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

// Exported version used in AppShell — reads from context internally
export function ToastContainer(
  props?: { toasts?: Toast[]; onRemove?: (id: string) => void }
) {
  // If used standalone (in AppShell without direct props), this is a noop wrapper
  // The actual rendering is handled by ToastProvider's internal state
  if (!props?.toasts) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end"
      aria-live="polite"
      aria-atomic="false"
    >
      <AnimatePresence mode="popLayout">
        {props.toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onRemove={props.onRemove!} />
        ))}
      </AnimatePresence>
    </div>
  );
}
