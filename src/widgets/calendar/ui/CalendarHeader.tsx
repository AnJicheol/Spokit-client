import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DAY_WEEK_MONTH } from '../model';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Button } from '@/shared/ui/shadcn/components/button';
import CalendarViewSelector from './CalendarViewSelector';

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

  const monthFormat = format(new Date(year, month), 'yyyy-MM', { locale: ko });
  // TODO 아이콘 svg 파일 사용할 수 있게 svgr 플러그인 추가 후 변경할 것
  return (
    <div className='h-[82px] my-5 flex items-center justify-between bg-cal-bg'>
      <div className='h-full flex-1 flex gap-4 items-end'>
        <h1 className='text-[#1A256E] text-title1 '>{monthFormat}</h1>
        <div className='flex gap-2 items-center pb-1'>
          <div className='embossed w-8 h-8 bg-cal-btn-bg rounded-full flex items-center justify-center cursor-pointer'>
            <ChevronLeft size={18} onClick={handlePrevMonth} />
          </div>
          <button
            onClick={() => {
              setYear(new Date().getFullYear());
              setMonth(new Date().getMonth());
            }}
            className='embossed bg-cal-btn-bg hover:bg-cal-btn-bg cursor-pointer px-[20.5px] py-1 rounded-[10px] flex items-center justify-center'
          >
            <span
              className='text-body2 text-white
            '
            >
              Today
            </span>
          </button>
          <div className='embossed w-8 h-8 bg-cal-btn-bg rounded-full flex items-center justify-center cursor-pointer '>
            <ChevronRight size={18} onClick={handleNextMonth} />
          </div>
        </div>
      </div>
      <CalendarViewSelector />
      <div className='flex-1'></div>
    </div>
  );
}
