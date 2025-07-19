import { addMonths, subMonths, addWeeks, subWeeks } from 'date-fns';
import { type viewMode } from '../model';
import { useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
interface CalendarNavProps {
  baseDate: Date;
  setBaseDate: (date: Date) => void;
  mode: viewMode;
}

export default function CalendarNav({ baseDate, setBaseDate, mode }: CalendarNavProps) {
  const handlePrev = useCallback(() => {
    switch (mode) {
      case 'Month':
        setBaseDate(subMonths(baseDate, 1));
        break;
      case 'Week':
        setBaseDate(subWeeks(baseDate, 1));
        break;
      // case 'Day':
      //   setBaseDate(subDays(baseDate, 1));
      //   break;
    }
  }, [baseDate, setBaseDate, mode]);

  const handleNext = useCallback(() => {
    switch (mode) {
      case 'Month':
        setBaseDate(addMonths(baseDate, 1));
        break;
      case 'Week':
        setBaseDate(addWeeks(baseDate, 1));
        break;
      //   case 'Day':
      //     setBaseDate(addDays(baseDate, 1));
      //     break;
    }
  }, [baseDate, setBaseDate, mode]);

  const handleTodayClick = useCallback(() => {
    setBaseDate(new Date());
  }, [setBaseDate]);
  return (
    <div className='flex-1 h-full flex gap-2 justify-end items-end'>
      <button
        onClick={handleTodayClick}
        className='embossed bg-cal-btn-bg hover:bg-cal-btn-bg cursor-pointer px-[20.5px] py-1 rounded-[10px] flex items-center justify-center'
      >
        <span
          className='text-body2 text-white
    '
        >
          Today
        </span>
      </button>
      <div
        data-testid='cal-nav-prev-button'
        onClick={handlePrev}
        className='embossed p-2 bg-cal-btn-bg rounded-full flex items-center justify-center cursor-pointer'
      >
        <ChevronLeft size={18} color='white' />
      </div>
      <div
        data-testid='cal-nav-next-button'
        onClick={handleNext}
        className='embossed p-2 bg-cal-btn-bg rounded-full flex items-center justify-center cursor-pointer '
      >
        <ChevronRight size={18} color='white' />
      </div>
    </div>
  );
}
