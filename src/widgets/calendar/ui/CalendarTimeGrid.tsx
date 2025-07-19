import CalendarTimeCell from './CalendarTimeCell';
import CalendarTimeSlots from './CalendarTimeSlots';

interface CalendarWeekViewProps {
  week: string[];
  currentMonth: number;
}

export default function CalendarTimeGrid({ week, currentMonth }: CalendarWeekViewProps) {
  return (
    <div className='flex-1 overflow-y-auto scrollbar-hide rounded-b-xl'>
      <div className='flex'>
        {/* TimeSlots - 스크롤과 함께 움직임 */}
        <CalendarTimeSlots />

        {/* TimeGrid */}
        <div className='flex-1 grid grid-cols-7'>
          {week.map((date, index) => {
            const [, month] = date.split('-').map(Number);
            return (
              <CalendarTimeCell
                key={index}
                date={date}
                isLastInRow={index === week.length - 1}
                isCurrentMonth={Number(month) === currentMonth + 1}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
