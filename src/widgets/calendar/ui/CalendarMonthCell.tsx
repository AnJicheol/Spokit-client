import { memo } from 'react';
import { cn } from '@/shared/lib/utils';
import { CalendarForm } from './CalendarForm';

interface CalendarDayProps {
  date: string;
  isLastInRow: boolean;
  isCurrentMonth: boolean;
  isToday: boolean;
}

// 개별 날짜 셀 컴포넌트 (메모이제이션으로 최적화)
const CalendarMonthCell = memo(
  ({ date, isLastInRow, isCurrentMonth, isToday }: CalendarDayProps) => {
    // 날짜 파싱
    const [, , day] = date.split('-');

    return (
      <div
        className={cn(
          'flex-1 relative flex items-center justify-center bg-cal-cell-bg border-r border-cal-cell-border',
          isLastInRow && 'border-r-0',
          !isCurrentMonth && 'bg-cal-cell-muted-bg',
        )}
      >
        <CalendarForm date={date} />
        <div
          className={cn(
            'absolute top-2 left-3 text-label font-semibold',
            isToday && 'bg-[#E1E3FA] rounded-full px-2 py-1 text-[#697AE6]',
          )}
        >
          {day}
        </div>
      </div>
    );
  },
);

CalendarMonthCell.displayName = 'CalendarDay';

export default CalendarMonthCell;
