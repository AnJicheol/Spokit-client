import CalendarTimeCell from './CalendarTimeCell';

interface CalendarWeekViewProps {
  week: string[];
  currentMonth: number;
}

export default function CalendarTimeGrid({ week, currentMonth }: CalendarWeekViewProps) {
  return (
    <div className={'grid overflow-y-scroll scrollbar-hide grid-cols-7'}>
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
  );
}
