import { cn } from '@/shared/lib/cn';
import { TIME_SLOTS } from '../model';
import { memo } from 'react';
interface CalendarDayProps {
  date: string;
  isFirstInRow: boolean;
  isCurrentMonth: boolean;
}

function _CalendarTimeCell({ date, isFirstInRow, isCurrentMonth }: CalendarDayProps) {
  return (
    <div className={'flex flex-col'}>
      {TIME_SLOTS.map((timeSlot) => (
        <div
          key={`${date}-${timeSlot}`}
          className={cn(
            'bg-cal-cell-bg border-r border-b border-cal-cell-border h-[40px]',
            !isCurrentMonth && 'bg-cal-cell-muted-bg',
            isFirstInRow && 'border-l',
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
