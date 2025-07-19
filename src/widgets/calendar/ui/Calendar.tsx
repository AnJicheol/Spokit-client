import { type viewMode } from '../model';
import { useState, useMemo, Suspense, lazy } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarDaysHeader from './CalendarDaysHeader';
import { getCalendarMatrix } from '../lib/calendarMatrix';
import CalendarLayout from './CalendarLayout';

// Lazy Loading Components
const CalendarTimeGrid = lazy(() => import('./CalendarTimeGrid'));
const CalendarMonthView = lazy(() => import('./CalendarMonthView'));

export default function Calendar() {
  // 상태 관리
  const [baseDate, setBaseDate] = useState(new Date());
  const [mode, setMode] = useState<viewMode>('Month');
  const weeks: string[][] = useMemo(() => getCalendarMatrix(baseDate, mode), [baseDate, mode]);
  const currentMonth = useMemo(() => baseDate.getMonth(), [baseDate]);
  // 캘린더 컴포넌트에서만 사용될 함수라 생각하여 순수함수로 작성하지 않았습니다.
  const calendarContent = useMemo(() => {
    switch (mode) {
      case 'Month':
        return (
          <Suspense
            fallback={<div className='h-full flex items-center justify-center'>로딩 중...</div>}
          >
            {weeks.map((week, i) => (
              <CalendarMonthView
                key={i}
                week={week}
                isLastWeek={i === weeks.length - 1}
                currentMonth={currentMonth}
              />
            ))}
          </Suspense>
        );
      case 'Week':
        return (
          <Suspense
            fallback={<div className='h-full flex items-center justify-center'>로딩 중...</div>}
          >
            <CalendarTimeGrid currentMonth={currentMonth} week={weeks[0]} />
          </Suspense>
        );
      default:
        return null;
    }
  }, [weeks, mode, currentMonth]);
  return (
    <div className='w-full h-full mx-auto bg-calendar-bg rounded-xl px-4 shadow flex flex-col'>
      <CalendarHeader baseDate={baseDate} setBaseDate={setBaseDate} mode={mode} setMode={setMode} />
      <CalendarLayout mode={mode}>
        <CalendarDaysHeader mode={mode} week={weeks} />
        {calendarContent}
      </CalendarLayout>
    </div>
  );
}
