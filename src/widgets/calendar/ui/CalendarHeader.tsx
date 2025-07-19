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
    <div className='pb-3 flex items-center justify-between' data-testid='calendar-header'>
      <div className='flex-1'>
        <CalendarModeSelector mode={mode} setMode={setMode} />
      </div>
      <h1 className='text-[#1A256E] text-title1'>{dateFormat}</h1>
      <CalendarNav baseDate={baseDate} setBaseDate={setBaseDate} mode={mode} />
    </div>
  );
}
