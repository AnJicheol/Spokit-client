import { cn } from '@/shared/lib/utils';
interface CalendarDayProps {
  date: string;
  isLastInRow: boolean;
  isCurrentMonth: boolean;
}

function CalendarTimeCell({ date, isLastInRow, isCurrentMonth }: CalendarDayProps) {
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  return (
    <div
      className={cn(
        'flex-1 relative bg-cal-cell-bg border-r border-cal-cell-border',
        isLastInRow && 'border-r-0',
        !isCurrentMonth && 'bg-cal-cell-muted-bg',
      )}
    >
      <div className='flex flex-col h-full'>
        {timeSlots.map((timeSlot) => (
          <div
            key={`${date}-${timeSlot}`}
            className='border-b border-cal-cell-border last:border-b-0 h-[40px] shrink-0'
            data-time={timeSlot}
            data-date={date}
          />
        ))}
      </div>
    </div>
  );
}

export default CalendarTimeCell;
