import { cn } from '@/shared/lib/utils';
import CalendarTimeCell from './CalendarTimeCell';

interface CalendarWeekViewProps {
  week: string[];
  currentMonth: number;
}

export default function CalendarTimeGrid({ week, currentMonth }: CalendarWeekViewProps) {
  return (
    <div
      className={cn(
        'w-full h-full flex border border-cal-cell-border overflow-y-scroll scrollbar-hide',
      )}
    >
      {week.map((date, index) => {
        const [, month] = date.split('-').map(Number);
        // 현재 날짜인지 확인

        return (
          <CalendarTimeCell
            key={index}
            date={date}
            isLastInRow={index === week.length - 1}
            isCurrentMonth={Number(month) === currentMonth + 1}
          />
        );
      })}
    </div>
  );
}
