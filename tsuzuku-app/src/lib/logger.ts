// ============================================================
// TSUZUKU — Telemetry & Diagnostics Logger
// Formatted console logging for routes, state, and API endpoints
// ============================================================

type LogLevel = 'info' | 'warn' | 'error' | 'route' | 'store' | 'srs';

const STYLES: Record<LogLevel, { badge: string; bg: string; color: string }> = {
  route: { badge: '🚦 ROUTE', bg: '#4A5FC1', color: '#FFFFFF' },
  store: { badge: '📦 STORE', bg: '#C9952A', color: '#0C0C0F' },
  srs:   { badge: '⚡ FSRS',  bg: '#C2334D', color: '#FFFFFF' },
  info:  { badge: 'ℹ️ INFO',  bg: '#2EA87B', color: '#0C0C0F' },
  warn:  { badge: '⚠️ WARN',  bg: '#E5A024', color: '#0C0C0F' },
  error: { badge: '❌ ERROR', bg: '#E84040', color: '#FFFFFF' },
};

function formatMessage(level: LogLevel, context: string, message: string, data?: unknown) {
  const style = STYLES[level];
  const time = new Date().toISOString().slice(11, 23);

  const badgeStyle = `background: ${style.bg}; color: ${style.color}; font-weight: bold; padding: 2px 6px; border-radius: 4px; font-size: 11px;`;
  const contextStyle = `color: #A6A49F; font-weight: bold; font-size: 11px; margin-left: 4px;`;
  const timeStyle = `color: #52525F; font-size: 10px; margin-right: 4px;`;

  if (data !== undefined) {
    console.log(`%c[${time}] %c${style.badge}%c [${context}]`, timeStyle, badgeStyle, contextStyle, message, data);
  } else {
    console.log(`%c[${time}] %c${style.badge}%c [${context}]`, timeStyle, badgeStyle, contextStyle, message);
  }
}

export const logger = {
  route(path: string, metadata?: unknown) {
    formatMessage('route', 'Navigation', `Navigated to ${path}`, metadata);
  },
  store(storeName: string, action: string, state?: unknown) {
    formatMessage('store', storeName, action, state);
  },
  srs(action: string, details?: unknown) {
    formatMessage('srs', 'SRS Engine', action, details);
  },
  info(context: string, message: string, data?: unknown) {
    formatMessage('info', context, message, data);
  },
  warn(context: string, message: string, data?: unknown) {
    formatMessage('warn', context, message, data);
  },
  error(context: string, message: string, error?: unknown) {
    const style = STYLES.error;
    const time = new Date().toISOString().slice(11, 23);
    const badgeStyle = `background: ${style.bg}; color: ${style.color}; font-weight: bold; padding: 2px 6px; border-radius: 4px;`;
    console.error(`%c[${time}] %c${style.badge}%c [${context}] ${message}`, 'color: #52525F', badgeStyle, 'color: #E84040', error ?? '');
  },
};

// Global error handlers to capture unhandled browser exceptions
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    logger.error('GlobalError', `${event.message} at ${event.filename}:${event.lineno}`, event.error);
  });

  window.addEventListener('unhandledrejection', (event) => {
    logger.error('UnhandledPromise', `Unhandled Promise Rejection: ${event.reason}`, event.reason);
  });
}
