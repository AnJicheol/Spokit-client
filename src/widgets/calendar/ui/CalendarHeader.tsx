import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import CalendarViewSelector from './CalendarViewSelector';
import CalendarNav from './CalendarNav';

interface CalendarHeaderProps {
  year: number;
  month: number;
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
}

export default function CalendarHeader({ year, month, setYear, setMonth }: CalendarHeaderProps) {
  const monthFormat = format(new Date(year, month), 'yyyy-MM', { locale: ko });
  // TODO 아이콘 svg 파일 사용할 수 있게 svgr 플러그인 추가 후 변경할 것
  return (
    <div className='h-[82px] my-5 flex items-center justify-between'>
      <div className='h-full flex-1 flex gap-4 items-end'>
        <h1 className='text-[#1A256E] text-title1 '>{monthFormat}</h1>
        <CalendarNav year={year} month={month} setYear={setYear} setMonth={setMonth} />
      </div>
      <CalendarViewSelector />
      {/* 가운데에 Selector를 두기 위한 빈공간 */}
      <div className='flex-1'></div>
    </div>
  );
}
