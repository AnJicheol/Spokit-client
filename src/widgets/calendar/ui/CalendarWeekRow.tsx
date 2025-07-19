import { memo, useMemo } from 'react';
import { cn } from '@/shared/lib/cn';
import CalendarCell from './CalendarCell';
import { format } from 'date-fns';

interface CalendarWeekRowProps {
  week: string[];
  isLastWeek: boolean;
  currentMonth: number;
}

// 주 단위 행 컴포넌트 (메모이제이션으로 최적화)
const CalendarWeekRow = memo(({ week, isLastWeek, currentMonth }: CalendarWeekRowProps) => {
  const todayFormat = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);
  return (
    <div
      className={cn(
        'w-full h-full grid grid-cols-7 border-b border-cal-cell-border',
        isLastWeek && 'border-b-0',
      )}
    >
      {week.map((date, index) => {
        const [, month] = date.split('-').map(Number);
        // 현재 날짜인지 확인
        const isToday = todayFormat === date;

        return (
          <CalendarCell
            key={index}
            date={date}
            isLastInRow={index === week.length - 1}
            isCurrentMonth={Number(month) === currentMonth + 1}
            isToday={isToday}
          />
        );
      })}
    </div>
  );
});

CalendarWeekRow.displayName = 'CalendarWeekRow';

export default CalendarWeekRow;
