import { type viewMode } from '../model';
import { useState, useMemo } from 'react';
import CalendarHeader from './CalendarHeader';
import { getCalendarMatrix } from '../lib/calendarUtils';
import CalendarDaysHeader from './CalendarDaysHeader';
import CalendarTimeGrid from './CalendarTimeGrid';
import CalendarMonthView from './CalendarMonthView';

export default function Calendar() {
  // 상태 관리
  const [baseDate, setBaseDate] = useState(new Date());
  const [mode, setMode] = useState<viewMode>('Month');
  const weeks: string[][] = useMemo(() => getCalendarMatrix(baseDate, mode), [baseDate, mode]);
  const renderCalendar = (mode: viewMode) => {
    switch (mode) {
      case 'Month':
        return weeks.map((week, i) => (
          <CalendarMonthView
            key={i}
            week={week}
            isLastWeek={i === weeks.length - 1}
            currentMonth={baseDate.getMonth()}
          />
        ));
      case 'Week':
        return <CalendarTimeGrid currentMonth={baseDate.getMonth()} week={weeks[0]} />;
      case 'Day':
        return <CalendarTimeGrid currentMonth={baseDate.getMonth()} week={[weeks[0][0]]} />;
      default:
        return null;
    }
  };
  return (
    <div className='w-full h-full mx-auto bg-calendar-bg rounded-xl shadow p-4 flex flex-col'>
      <CalendarHeader baseDate={baseDate} setBaseDate={setBaseDate} mode={mode} setMode={setMode} />
      <CalendarDaysHeader mode={mode} week={weeks} />
      <div className='flex-1 min-h-0 flex flex-col justify-between'>{renderCalendar(mode)}</div>
    </div>
  );
}
