// src/widgets/calendar/ui/CalendarViewSelector.tsx
import { DAY_WEEK_MONTH } from '../model';

// interface CalendarViewSelectorProps {
//   activeView: string;
//   onViewChange: (view: string) => void;
// }

export default function CalendarViewSelector() {
  return (
    <div className='bg-transparent flex justify-between items-center text-3xl font-bold p-1 debossed rounded-4xl'>
      {DAY_WEEK_MONTH.map((view) => (
        <div
          className='rounded-full text-white px-5 py-2 text-body2 flex items-center justify-center bg-cal-btn-bg embossed'
          key={view}
        >
          <span>{view}</span>
        </div>
      ))}
    </div>
  );
}
