import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DAY_MONTH_WEEK } from '../model';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface CalendarHeaderProps {
  year: number;
  month: number;
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
}

export default function CalendarHeader({ year, month, setYear, setMonth }: CalendarHeaderProps) {
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

  const monthFormat = format(new Date(year, month), 'MMMM', { locale: ko }).padStart(3, '0');

  return (
    <div className='flex items-end justify-between'>
      <div className='flex gap-2 items-end'>
        <h1 className='text-6xl font-bold text-center'>{monthFormat}</h1>
        <div className='flex'>
          <ChevronLeft size={48} onClick={handlePrevMonth} className='cursor-pointer' />
          <ChevronRight size={48} onClick={handleNextMonth} className='cursor-pointer' />
        </div>
      </div>
      <div className='flex gap-3 text-3xl font-bold'>
        {DAY_MONTH_WEEK.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  );
}
