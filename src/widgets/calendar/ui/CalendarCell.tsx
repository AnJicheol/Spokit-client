import { memo } from 'react';
import { cn } from '@/shared/lib/cn';

interface CalendarDayProps {
  date: string;
  isLastInRow: boolean;
  isCurrentMonth: boolean;
  isToday: boolean;
}

// 개별 날짜 셀 컴포넌트 (메모이제이션으로 최적화)
const CalendarCell = memo(({ date, isLastInRow, isCurrentMonth, isToday }: CalendarDayProps) => {
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
      <div
        className={cn(
          'absolute flex items-center justify-center top-[6px] left-2 text-label font-semibold w-6 h-6',
          isToday && 'bg-[#E1E3FA] rounded-full text-[#697AE6]',
        )}
      >
        {day}
      </div>
    </div>
  );
});

CalendarCell.displayName = 'CalendarCell';

export default CalendarCell;
