// ============================================================
// ProgressRing — SVG circular progress indicator
// ============================================================

interface ProgressRingProps {
  size?: number;
  strokeWidth?: number;
  progress: number;         // 0-100
  color?: string;
  trackColor?: string;
  children?: React.ReactNode;
  className?: string;
}

export function ProgressRing({
  size = 80,
  strokeWidth = 5,
  progress,
  color = 'var(--color-vermillion-500)',
  trackColor = 'var(--color-base-600)',
  children,
  className = '',
}: ProgressRingProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, progress)) / 100) * circumference;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="progress-ring"
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
