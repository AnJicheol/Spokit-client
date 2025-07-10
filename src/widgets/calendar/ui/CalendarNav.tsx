import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarNavProps {
  year: number;
  month: number;
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
}

export default function CalendarNav({ year, month, setYear, setMonth }: CalendarNavProps) {
  const handlePrevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  const handleTodayClick = () => {
    setYear(new Date().getFullYear());
    setMonth(new Date().getMonth());
  };
  return (
    <div className='flex gap-2 items-center pb-1'>
      <div
        onClick={handlePrevMonth}
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
        onClick={handleNextMonth}
        className='embossed w-8 h-8 bg-cal-btn-bg rounded-full flex items-center justify-center cursor-pointer '
      >
        <ChevronRight size={18} />
      </div>
    </div>
  );
}
