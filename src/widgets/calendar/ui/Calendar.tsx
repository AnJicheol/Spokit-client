import { DAYS_KO } from '../model';
import { useState, useMemo } from 'react';
import CalendarHeader from './CalendarHeader';
import { cn } from '@/shared/lib/utils';
import { getMonthMatrix } from '../lib/calendarUtils';
import CalendarWeek from './CalendarWeek';

export default function Calendar() {
  // 현재 날짜 정보
  const today = new Date();

  // 상태 관리
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  // 달력 데이터 메모이제이션 - 년도와 월이 변경될 때만 다시 계산
  const weeks = useMemo(() => getMonthMatrix(year, month), [year, month]);
  return (
    <div className='w-full h-full mx-auto bg-calendar-bg rounded-xl shadow p-4 flex flex-col'>
      <CalendarHeader year={year} month={month} setYear={setYear} setMonth={setMonth} />
      <div className='bg-cal-days-bg w-full grid grid-cols-7 border border-b-0 border-cal-cell-border'>
        {DAYS_KO.map((d, i) => (
          <span
            className={cn(
              `text-center text-body2 py-2 border-r border-cal-cell-border`,
              i === DAYS_KO.length - 1 && 'border-none',
            )}
            key={d}
          >
            {d}
          </span>
        ))}
      </div>
      <div className='flex-1 flex flex-col justify-between'>
        {weeks.map((week, i) => (
          <CalendarWeek
            key={i}
            week={week}
            isLastWeek={i === weeks.length - 1}
            currentMonth={month}
            today={today}
          />
        ))}
      </div>
    </div>
  );
}
