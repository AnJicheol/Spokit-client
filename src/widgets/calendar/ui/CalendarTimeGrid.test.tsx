import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CalendarTimeGrid from './CalendarTimeGrid';
import { TIME_SLOTS } from '../model';

vi.mock('./CalendarTimeSlots', () => ({
  default: () => <div data-testid='calendar-time-slots'>Time Slots</div>,
}));

vi.mock('./CalendarTimeCell', () => ({
  default: ({ date, isCurrentMonth }: { date: string; isCurrentMonth: boolean }) => (
    <div data-testid='calendar-time-cell' data-date={date} data-current-month={isCurrentMonth}>
      <div data-testid='time-cell-slots'>
        {TIME_SLOTS.map((slot) => (
          <div key={slot} data-testid='time-slot' data-time={slot} />
        ))}
      </div>
    </div>
  ),
}));

describe('CalendarTimeGrid', () => {
  const mockWeek = [
    '2024-01-01',
    '2024-01-02',
    '2024-01-03',
    '2024-01-04',
    '2024-01-05',
    '2024-01-06',
    '2024-01-07',
  ];

  const defaultProps = {
    week: mockWeek,
    currentMonth: 0,
  };

  it('CalendarTimeGrid가 렌더링된다.', () => {
    render(<CalendarTimeGrid {...defaultProps} />);

    expect(screen.getByTestId('calendar-time-slots')).toBeInTheDocument();
    expect(screen.getAllByTestId('calendar-time-cell')).toHaveLength(7);
  });

  it('7시부터 24시까지의 타임셀이 올바른 개수로 생성된다', () => {
    render(<CalendarTimeGrid {...defaultProps} />);

    const timeSlots = screen.getAllByTestId('time-slot');
    expect(timeSlots).toHaveLength(7 * 36); // 7일 × 36개 시간슬롯

    const firstCellSlots = screen
      .getAllByTestId('calendar-time-cell')[0]
      .querySelectorAll('[data-time]');

    expect(firstCellSlots).toHaveLength(36);
    expect(firstCellSlots[0]).toHaveAttribute('data-time', '07:00');
    expect(firstCellSlots[35]).toHaveAttribute('data-time', '24:30');
  });

  it('타임셀 컴포넌트에 올바른 props가 전달된다', () => {
    render(<CalendarTimeGrid {...defaultProps} />);

    const timeCells = screen.getAllByTestId('calendar-time-cell');
    expect(timeCells[0]).toHaveAttribute('data-date', '2024-01-01');
    expect(timeCells[0]).toHaveAttribute('data-current-month', 'true');
  });

  it('다른 월의 날짜를 올바르게 처리한다', () => {
    const februaryWeek = [
      '2024-02-01',
      '2024-02-02',
      '2024-02-03',
      '2024-02-04',
      '2024-02-05',
      '2024-02-06',
      '2024-02-07',
    ];

    render(<CalendarTimeGrid week={februaryWeek} currentMonth={0} />);

    const firstCell = screen.getAllByTestId('calendar-time-cell')[0];
    expect(firstCell).toHaveAttribute('data-current-month', 'false');
  });

  it('각 날짜에 대해 타임셀이 생성된다', () => {
    render(<CalendarTimeGrid {...defaultProps} />);

    mockWeek.forEach((date, index) => {
      const timeCell = screen.getAllByTestId('calendar-time-cell')[index];
      expect(timeCell).toHaveAttribute('data-date', date);
    });
  });
});
