import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns';
import { type viewMode } from '../model';

interface CalendarNavProps {
  baseDate: Date;
  setBaseDate: (date: Date) => void;
  mode: viewMode;
}

export default function CalendarNav({ baseDate, setBaseDate, mode }: CalendarNavProps) {
  const handlePrev = () => {
    switch (mode) {
      case 'Month':
        setBaseDate(subMonths(baseDate, 1));
        break;
      case 'Week':
        setBaseDate(subWeeks(baseDate, 1));
        break;
      case 'Day':
        setBaseDate(subDays(baseDate, 1));
        break;
    }
  };

  const handleNext = () => {
    switch (mode) {
      case 'Month':
        setBaseDate(addMonths(baseDate, 1));
        break;
      case 'Week':
        setBaseDate(addWeeks(baseDate, 1));
        break;
      case 'Day':
        setBaseDate(addDays(baseDate, 1));
        break;
    }
  };

  const handleTodayClick = () => {
    setBaseDate(new Date());
  };
  return (
    <div className='flex gap-2 items-center pb-1'>
      <div
        onClick={handlePrev}
        className='embossed w-8 h-8 bg-cal-btn-bg rounded-full flex items-center justify-center cursor-pointer'
      >
        <ChevronLeft size={18} />
      </div>
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
        onClick={handleNext}
        className='embossed w-8 h-8 bg-cal-btn-bg rounded-full flex items-center justify-center cursor-pointer '
      >
        <ChevronRight size={18} />
      </div>
    </div>
  );
}
