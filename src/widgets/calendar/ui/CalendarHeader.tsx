import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import CalendarModeSelector from './CalendarModeSelector';
import CalendarNav from './CalendarNav';
import { type viewMode } from '../model';

interface CalendarHeaderProps {
  baseDate: Date;
  setBaseDate: (date: Date) => void;
  mode: viewMode;
  setMode: (mode: viewMode) => void;
}

export default function CalendarHeader({
  baseDate,
  setBaseDate,
  mode,
  setMode,
}: CalendarHeaderProps) {
  const dateFormat = format(baseDate, 'yyyy-MM', { locale: ko });
  return (
    <div className='h-[82px] my-5 flex items-center justify-between'>
      <div className='h-full flex-1 flex gap-4 items-end'>
        <h1 className='text-[#1A256E] text-title1 '>{dateFormat}</h1>
        <CalendarNav baseDate={baseDate} setBaseDate={setBaseDate} mode={mode} />
      </div>
      <CalendarModeSelector mode={mode} setMode={setMode} />
      {/* 가운데에 Selector를 두기 위한 빈공간 */}
      <div className='flex-1'></div>
    </div>
  );
}
