import { getMonthMatrix } from '@/widgets/calendar/lib/calendarUtils';

import { DAYS_KO } from '../model';
import { useState } from 'react';
import { CalendarForm } from './CalendarForm';
import CalendarHeader from './CalendarHeader';

export default function Calendar() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const weeks = getMonthMatrix(year, month);
  return (
    <div className='w-full h-full mx-auto bg-calendar-bg rounded-xl shadow p-4 flex flex-col gap-4'>
      <CalendarHeader year={year} month={month} setYear={setYear} setMonth={setMonth} />
      <div className='bg-calendar-days-bg w-full grid grid-cols-7 border border-calendar-month-border text-center font-bold'>
        {DAYS_KO.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className='flex-1 flex flex-col justify-between border border-cal-month-border'>
        {weeks.map((week, i) => (
          <div key={i} className='w-full h-full grid grid-cols-7 text-center'>
            {week.map((date, j) => (
              <div
                key={j}
                className='flex-1 flex items-center justify-center rounded border cal-month-border hover:bg-sky-100 transition text-sky-900 text-sm bg-white'
              >
                <CalendarForm date={`${year}-${month + 1}-${date}`} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
