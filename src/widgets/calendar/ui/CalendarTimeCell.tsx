import { cn } from '@/shared/lib/cn';
import { TIME_SLOTS } from '../model';
import { memo } from 'react';
interface CalendarDayProps {
  date: string;
  isLastInRow: boolean;
  isCurrentMonth: boolean;
}

function _CalendarTimeCell({ date, isLastInRow, isCurrentMonth }: CalendarDayProps) {
  return (
    <div className={'flex flex-col'}>
      {TIME_SLOTS.map((timeSlot) => (
        <div
          key={`${date}-${timeSlot}`}
          className={cn(
            'bg-cal-cell-bg border-r border-b border-cal-cell-border h-[40px]',
            isLastInRow && 'border-r-0',
            !isCurrentMonth && 'bg-cal-cell-muted-bg',
          )}
          data-time={timeSlot}
          data-date={date}
        />
      ))}
    </div>
  );
}

const CalendarTimeCell = memo(_CalendarTimeCell);

CalendarTimeCell.displayName = 'CalendarTimeCell';

export default CalendarTimeCell;
