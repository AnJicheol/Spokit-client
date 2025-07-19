import { memo } from 'react';
import CalendarWeekRow from './CalendarWeekRow';

interface CalendarMonthGrid {
  weeks: string[][];
  currentMonth: number;
}

function _CalendarMonthGrid({ weeks, currentMonth }: CalendarMonthGrid) {
  return (
    <div className='grid grid-rows-5 h-full border border-cal-cell-border rounded-b-xl overflow-hidden'>
      {weeks.map((week, i) => (
        <CalendarWeekRow
          key={i}
          week={week}
          isLastWeek={i === weeks.length - 1}
          currentMonth={currentMonth}
        />
      ))}
    </div>
  );
}

const CalendarMonthGrid = memo(_CalendarMonthGrid);

CalendarMonthGrid.displayName = 'CalendarMonthGrid';

export default CalendarMonthGrid;
