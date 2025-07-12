import { memo } from 'react';
import { cn } from '@/shared/lib/utils';
import CalendarDay from './CalendarDay';
import { format } from 'date-fns';

interface CalendarMonthViewProps {
  week: string[];
  isLastWeek: boolean;
  currentMonth: number;
  today: Date;
}

// 주 단위 컴포넌트 (메모이제이션으로 최적화)
const CalendarMonthView = memo(({ week, isLastWeek, currentMonth }: CalendarMonthViewProps) => {
  const todayFormat = format(new Date(), 'yyyy-MM-dd');
  return (
    <div
      className={cn(
        'w-full h-full grid grid-cols-7 border border-cal-cell-border',
        !isLastWeek && 'border-b-0',
      )}
    >
      {week.map((date, index) => {
        const [, month] = date.split('-').map(Number);
        // 현재 날짜인지 확인
        const isToday = todayFormat === date;

        return (
          <CalendarDay
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

CalendarMonthView.displayName = 'CalendarWeek';

export default CalendarMonthView;
