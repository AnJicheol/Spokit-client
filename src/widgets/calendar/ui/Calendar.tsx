import { DAYS_KO, type viewMode } from '../model';
import { useState, useMemo } from 'react';
import CalendarHeader from './CalendarHeader';
import { cn } from '@/shared/lib/utils';
import { getCalendarMatrix } from '../lib/calendarUtils';
import CalendarMonthView from './CalendarMonthView';
import CalendarDaysHeader from './CalendarDaysHeader';

export default function Calendar() {
  // 현재 날짜 정보

  // 상태 관리
  const [baseDate, setBaseDate] = useState(new Date());
  const [mode, setMode] = useState<viewMode>('Month');
  // 달력 데이터 메모이제이션 - baseDate와 mode가 변경될 때만 다시 계산
  const weeks: string[][] = useMemo(() => getCalendarMatrix(baseDate, mode), [baseDate, mode]);
  return (
    <div className='w-full h-full mx-auto bg-calendar-bg rounded-xl shadow p-4 flex flex-col'>
      <CalendarHeader baseDate={baseDate} setBaseDate={setBaseDate} mode={mode} setMode={setMode} />
      <CalendarDaysHeader mode={mode} week={weeks} />
      <div className='flex-1 flex flex-col justify-between'>
        {weeks.map((week, i) => (
          <CalendarMonthView
            key={i}
            week={week}
            isLastWeek={i === weeks.length - 1}
            currentMonth={baseDate.getMonth()}
            today={baseDate}
          />
        ))}
      </div>
    </div>
  );
}
