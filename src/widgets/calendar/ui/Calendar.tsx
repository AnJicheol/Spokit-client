import { type viewMode } from '../model';
import { useState, useMemo } from 'react';
import CalendarHeader from './CalendarHeader';
import { getCalendarMatrix } from '../lib/calendarUtils';
import CalendarDaysHeader from './CalendarDaysHeader';
import CalendarWeekView from './CalendarWeekView';

export default function Calendar() {
  // 상태 관리
  const [baseDate, setBaseDate] = useState(new Date());
  const [mode, setMode] = useState<viewMode>('Week');
  // 달력 데이터 메모이제이션 - baseDate와 mode가 변경될 때만 다시 계산
  const weeks: string[][] = useMemo(() => getCalendarMatrix(baseDate, mode), [baseDate, mode]);
  return (
    <div className='w-full h-full mx-auto bg-calendar-bg rounded-xl shadow p-4 flex flex-col'>
      <CalendarHeader baseDate={baseDate} setBaseDate={setBaseDate} mode={mode} setMode={setMode} />
      <CalendarDaysHeader mode={mode} week={weeks} />
      <div className='flex-1 min-h-0 flex flex-col justify-between'>
        <CalendarWeekView currentMonth={baseDate.getMonth()} week={weeks[0]} />
        {/* {weeks.map((week, i) => (
          <CalendarMonthView
            key={i}
            week={week}
            isLastWeek={i === weeks.length - 1}
            currentMonth={baseDate.getMonth()}
          />
        ))} */}
      </div>
    </div>
  );
}
