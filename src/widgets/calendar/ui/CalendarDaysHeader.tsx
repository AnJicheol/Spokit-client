import { cn } from '@/shared/lib/utils';
import { DAYS_KO, type viewMode } from '../model';
import { getDay, getDate, parseISO } from 'date-fns';
import { useMemo } from 'react';

interface CalendarDaysHeaderProps {
  mode: viewMode;
  week: string[][];
}

type HeaderCellProps = {
  children: React.ReactNode;
  isLast?: boolean;
};

// 여기서만 사용하는 컴포넌트라 분리 않했습니다.
function HeaderCell({ children, isLast = false }: HeaderCellProps) {
  return (
    <span
      className={cn(
        'text-center text-body2 py-2 border-r border-cal-cell-border',
        isLast && 'border-none',
      )}
    >
      {children}
    </span>
  );
}

export default function CalendarDaysHeader({ mode, week }: CalendarDaysHeaderProps) {
  const dates = useMemo(() => {
    return week.flat().map((dateStr) => parseISO(dateStr));
  }, [week]);

  const renderMonthHeader = () => {
    return DAYS_KO.map((day, i) => (
      <HeaderCell key={day} isLast={i === DAYS_KO.length - 1}>
        {day}
      </HeaderCell>
    ));
  };

  const renderWeekHeader = () => {
    return DAYS_KO.map((day, i) => (
      <HeaderCell key={day} isLast={i === DAYS_KO.length - 1}>
        {`${getDate(dates[i])}(${day})`}
      </HeaderCell>
    ));
  };

  const renderDayHeader = () => {
    const date = dates[0];
    return <HeaderCell isLast={true}>{`${getDate(date)}(${DAYS_KO[getDay(date)]})`}</HeaderCell>;
  };

  const renderHeader = () => {
    switch (mode) {
      case 'Month':
        return renderMonthHeader();
      case 'Week':
        return renderWeekHeader();
      case 'Day':
        return renderDayHeader();
      default:
        return renderMonthHeader();
    }
  };

  return (
    <div
      className={cn(
        'bg-cal-days-bg w-full grid rounded-t-xl',
        mode === 'Day' ? 'grid-cols-1' : 'grid-cols-7',
      )}
    >
      {renderHeader()}
    </div>
  );
}
