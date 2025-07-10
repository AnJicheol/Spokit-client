import { memo } from 'react';
import { cn } from '@/shared/lib/utils';
import CalendarDay from './CalendarDay';

interface CalendarWeekProps {
  week: string[];
  isLastWeek: boolean;
  currentMonth: number;
  today: Date;
}

// 주 단위 컴포넌트 (메모이제이션으로 최적화)
const CalendarWeek = memo(({ week, isLastWeek, currentMonth, today }: CalendarWeekProps) => {
  const todayDate = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const todayYear = today.getFullYear();

  return (
    <div
      className={cn(
        'w-full h-full grid grid-cols-7 border border-cal-cell-border',
        !isLastWeek && 'border-b-0',
      )}
    >
      {week.map((date, index) => {
        const [year, month, day] = date.split('-').map(Number);

        // 현재 날짜인지 확인
        const isToday = day === todayDate && Number(month) === todayMonth && year === todayYear;

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

CalendarWeek.displayName = 'CalendarWeek';

export default CalendarWeek;
