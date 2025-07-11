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
    <div className='w-full h-full mx-auto bg-white rounded-xl shadow p-4 flex flex-col gap-4'>
      <CalendarHeader year={year} month={month} setYear={setYear} setMonth={setMonth} />
      <div className='w-full grid grid-cols-7 text-center font-bold text-sky-600'>
        {DAYS_KO.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className='flex-1 flex flex-col gap-1 justify-between'>
        {weeks.map((week, i) => (
          <div key={i} className='w-full h-full grid grid-cols-7 text-center'>
            {week.map((date, j) => (
              <div
                key={j}
                className='flex-1 flex items-center justify-center rounded hover:bg-sky-100 transition text-sky-900 text-sm border border-sky-100'
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
