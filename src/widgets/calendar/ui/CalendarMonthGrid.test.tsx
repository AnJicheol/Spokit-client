import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CalendarMonthGrid from './CalendarMonthGrid';

vi.mock('./CalendarWeekRow', () => ({
  default: ({
    week,
    isLastWeek,
    currentMonth,
  }: {
    week: string[];
    isLastWeek: boolean;
    currentMonth: number;
  }) => (
    <div
      data-testid='calendar-week-row'
      data-is-last-week={isLastWeek}
      data-current-month={currentMonth}
    >
      {week.map((date, index) => {
        const [, month] = date.split('-').map(Number);
        const isCurrentMonth = Number(month) === currentMonth + 1;
        return (
          <div
            key={index}
            data-testid='calendar-cell'
            className={isCurrentMonth ? 'bg-cal-cell-bg' : 'bg-cal-cell-muted-bg'}
            data-date={date}
            data-is-current-month={isCurrentMonth}
          >
            {date}
          </div>
        );
      })}
    </div>
  ),
}));

describe('CalendarMonthGrid', () => {
  const mockWeeks = [
    [
      '2024-01-01',
      '2024-01-02',
      '2024-01-03',
      '2024-01-04',
      '2024-01-05',
      '2024-01-06',
      '2024-01-07',
    ],
    [
      '2024-01-08',
      '2024-01-09',
      '2024-01-10',
      '2024-01-11',
      '2024-01-12',
      '2024-01-13',
      '2024-01-14',
    ],
    [
      '2024-01-15',
      '2024-01-16',
      '2024-01-17',
      '2024-01-18',
      '2024-01-19',
      '2024-01-20',
      '2024-01-21',
    ],
    [
      '2024-01-22',
      '2024-01-23',
      '2024-01-24',
      '2024-01-25',
      '2024-01-26',
      '2024-01-27',
      '2024-01-28',
    ],
    [
      '2024-01-29',
      '2024-01-30',
      '2024-01-31',
      '2024-02-01',
      '2024-02-02',
      '2024-02-03',
      '2024-02-04',
    ],
  ];

  const defaultProps = {
    weeks: mockWeeks,
    currentMonth: 0, // 1월
  };

  it('MonthGrid 렌더링', () => {
    render(<CalendarMonthGrid {...defaultProps} />);

    const weekRows = screen.getAllByTestId('calendar-week-row');
    expect(weekRows).toHaveLength(5);
  });

  it('WeekRow props 테스트', () => {
    render(<CalendarMonthGrid {...defaultProps} />);

    const weekRows = screen.getAllByTestId('calendar-week-row');

    // First week
    expect(weekRows[0]).toHaveAttribute('data-is-last-week', 'false');
    expect(weekRows[0]).toHaveAttribute('data-current-month', '0');

    // Last week
    expect(weekRows[4]).toHaveAttribute('data-is-last-week', 'true');
  });

  it('applies muted background to non-current month cells', () => {
    // 1월 달력을 렌더링하는데, currentMonth는 0 (1월)
    render(<CalendarMonthGrid {...defaultProps} currentMonth={0} />);

    // 2월 날짜들 (마지막 주에 있음)
    const februaryCells = screen
      .getAllByTestId('calendar-cell')
      .filter((cell) => cell.getAttribute('data-date')?.startsWith('2024-02'));

    // 2월 날짜들은 muted 배경을 가져야 함
    februaryCells.forEach((cell) => {
      expect(cell).toHaveClass('bg-cal-cell-muted-bg');
      expect(cell).toHaveAttribute('data-is-current-month', 'false');
    });

    // 1월 날짜들은 일반 배경을 가져야 함
    const januaryCells = screen
      .getAllByTestId('calendar-cell')
      .filter((cell) => cell.getAttribute('data-date')?.startsWith('2024-01'));

    januaryCells.forEach((cell) => {
      expect(cell).toHaveClass('bg-cal-cell-bg');
      expect(cell).toHaveAttribute('data-is-current-month', 'true');
    });
  });
});
