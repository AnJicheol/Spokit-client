import { memo } from 'react';
import { type viewMode } from '../model';
import CalendarTimeSlots from './CalendarTimeSlots';

const CalendarLayout = memo(({ mode, children }: { mode: viewMode; children: React.ReactNode }) => {
  if (mode === 'Month') {
    return <div className='flex-1 min-h-0 flex  flex-col'>{children}</div>;
  }

  return (
    <div className='flex'>
      <CalendarTimeSlots />
      <div className='flex-1 min-h-0 flex flex-col'>{children}</div>
    </div>
  );
});

CalendarLayout.displayName = 'CalendarLayout';

export default CalendarLayout;
