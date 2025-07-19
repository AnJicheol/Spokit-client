import { memo } from 'react';
import { TIME_SLOTS } from '../model';
// 캘린더 Week mode에서 왼쪽 시간을 출력하는 컴포넌트입니다.
const CalendarTimeSlots = memo(() => (
  <div className='flex flex-col w-14'>
    {TIME_SLOTS.filter((_, i) => i % 2 === 0).map((slot) => {
      const hour = parseInt(slot.split(':')[0]);
      const displayHour = hour % 12 || 12;
      const ampm = hour >= 12 ? 'PM' : 'AM';

      return (
        <div key={slot} className='h-20 text-body2'>
          {displayHour} {ampm}
        </div>
      );
    })}
  </div>
));

CalendarTimeSlots.displayName = 'CalendarTimeSlots';

export default CalendarTimeSlots;
