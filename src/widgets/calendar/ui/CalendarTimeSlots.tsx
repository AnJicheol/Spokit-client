import { memo } from 'react';
import { TIME_SLOTS } from '../model';

const CalendarTimeSlots = memo(() => (
  <div className='flex flex-col w-14 mt-10'>
    {TIME_SLOTS.filter((_, i) => i % 2 === 0).map((slot) => (
      <div key={slot} className='h-20'>
        {slot.split(':')[0]}시
      </div>
    ))}
  </div>
));

CalendarTimeSlots.displayName = 'CalendarTimeSlots';

export default CalendarTimeSlots;
