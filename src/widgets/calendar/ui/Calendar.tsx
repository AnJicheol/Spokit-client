import { type viewMode } from '../model';
import { useState, useMemo, Suspense, lazy } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarDaysHeader from './CalendarDaysHeader';
import { getCalendarMatrix } from '../lib/calendarMatrix';
import CalendarLayout from './CalendarLayout';

const CalendarTimeGrid = lazy(() => import('./CalendarTimeGrid'));
const CalendarMonthGrid = lazy(() => import('./CalendarMonthGrid')); // CalendarWeekRow로 이름 변경됨

export default function Calendar() {
  // 상태 관리
  const [baseDate, setBaseDate] = useState(new Date());
  const [mode, setMode] = useState<viewMode>('Month');
  const weeks: string[][] = useMemo(() => getCalendarMatrix(baseDate, mode), [baseDate, mode]);
  const currentMonth: number = useMemo(() => baseDate.getMonth(), [baseDate]);
  // 캘린더 컴포넌트에서만 사용될 함수라 생각하여 순수함수로 작성하지 않았습니다.
  const calendarContent = useMemo(() => {
    switch (mode) {
      case 'Month':
        return <CalendarMonthGrid weeks={weeks} currentMonth={currentMonth} />;
      case 'Week':
        return <CalendarTimeGrid currentMonth={currentMonth} week={weeks[0]} />;
      default:
        return null;
    }
  }, [weeks, mode, currentMonth]);
  return (
    <div className='bg-transparent w-full h-full mx-auto bg-calendar-bg rounded-xl border border-cal-cell-border p-8 flex flex-col'>
      <CalendarHeader baseDate={baseDate} setBaseDate={setBaseDate} mode={mode} setMode={setMode} />
      <CalendarLayout mode={mode}>
        <CalendarDaysHeader mode={mode} week={weeks} />
        <Suspense
          fallback={<div className='h-full flex items-center justify-center'>로딩 중...</div>}
        >
          {calendarContent}
        </Suspense>
      </CalendarLayout>
    </div>
  );
}
