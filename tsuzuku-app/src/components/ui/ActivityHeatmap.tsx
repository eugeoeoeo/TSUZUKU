// ============================================================
// ActivityHeatmap — GitHub-style contribution heatmap
// Shows 12 weeks of study activity
// ============================================================

import type { DailyActivity } from '@/types/user.types';

interface ActivityHeatmapProps {
  data: DailyActivity[];
}

function getHeatmapLevel(minutes: number): 0 | 1 | 2 | 3 | 4 {
  if (minutes === 0) return 0;
  if (minutes < 5) return 1;
  if (minutes < 15) return 2;
  if (minutes < 30) return 3;
  return 4;
}

function getLast12WeekDates(): Date[][] {
  const weeks: Date[][] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Go back to the most recent Sunday
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - today.getDay() - 7 * 11);

  for (let w = 0; w < 12; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + w * 7 + d);
      week.push(date);
    }
    weeks.push(week);
  }

  return weeks;
}

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  const activityMap = new Map(data.map(d => [d.date, d]));
  const weeks = getLast12WeekDates();
  const today = new Date().toISOString().slice(0, 10);

  const monthLabels: Array<{ col: number; label: string }> = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const m = week[0].getMonth();
    if (m !== lastMonth) {
      monthLabels.push({ col: wi, label: week[0].toLocaleString('default', { month: 'short' }) });
      lastMonth = m;
    }
  });

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex gap-1 min-w-max">
        {/* Day labels */}
        <div className="flex flex-col justify-between" style={{ paddingTop: 18, paddingBottom: 0 }}>
          {DAY_LABELS.map((d, i) => (
            <div
              key={i}
              className="text-2xs flex items-center"
              style={{ height: 10, color: 'var(--color-text-dim)', fontSize: '0.6rem', lineHeight: 1 }}
            >
              {i % 2 === 1 ? d : ''}
            </div>
          ))}
        </div>

        <div>
          {/* Month labels */}
          <div className="flex gap-1 mb-1">
            {weeks.map((week, wi) => {
              const monthLabel = monthLabels.find(ml => ml.col === wi);
              return (
                <div
                  key={wi}
                  className="text-2xs"
                  style={{ width: 10, fontSize: '0.6rem', color: 'var(--color-text-dim)', lineHeight: 1 }}
                >
                  {monthLabel?.label ?? ''}
                </div>
              );
            })}
          </div>

          {/* Grid */}
          <div className="flex gap-1">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((date, di) => {
                  const key = date.toISOString().slice(0, 10);
                  const activity = activityMap.get(key);
                  const level = getHeatmapLevel(activity?.minutesStudied ?? 0);
                  const isToday = key === today;
                  const isFuture = date > new Date();

                  return (
                    <div
                      key={di}
                      className={`heatmap-${level} heatmap-cell`}
                      title={`${key}: ${activity?.minutesStudied ?? 0} min`}
                      style={{
                        width: 10,
                        height: 10,
                        opacity: isFuture ? 0.2 : 1,
                        outline: isToday ? '1px solid var(--color-vermillion-400)' : 'none',
                        outlineOffset: 1,
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-2">
        <span className="text-2xs" style={{ color: 'var(--color-text-dim)', fontSize: '0.6rem' }}>Less</span>
        {([0, 1, 2, 3, 4] as const).map(l => (
          <div key={l} className={`heatmap-${l} heatmap-cell`} style={{ width: 10, height: 10 }} />
        ))}
        <span className="text-2xs" style={{ color: 'var(--color-text-dim)', fontSize: '0.6rem' }}>More</span>
      </div>
    </div>
  );
}
