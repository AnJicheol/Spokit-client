import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Calendar from './Calendar';

vi.mock('./CalendarHeader', () => ({
  default: ({ mode, setMode }: { mode: string; setMode: (mode: string) => void }) => (
    <div data-testid='calendar-header'>
      <button onClick={() => setMode('Week')}>Switch to Week</button>
      <span>Mode: {mode}</span>
    </div>
  ),
}));

vi.mock('./CalendarDaysHeader', () => ({
  default: ({ mode }: { mode: string }) => (
    <div data-testid='calendar-days-header'>Days Header - {mode}</div>
  ),
}));

vi.mock('./CalendarLayout', () => ({
  default: ({ children, mode }: { children: React.ReactNode; mode: string }) => (
    <div data-testid='calendar-layout' data-mode={mode}>
      {children}
    </div>
  ),
}));

vi.mock('./CalendarTimeGrid', () => ({
  default: () => <div data-testid='calendar-time-grid'>Time Grid</div>,
}));

vi.mock('./CalendarMonthGrid', () => ({
  default: () => <div data-testid='calendar-month-grid'>Month Grid</div>,
}));

vi.mock('../lib/calendarMatrix', () => ({
  getCalendarMatrix: vi.fn(() => [
    [
      '2024-01-01',
      '2024-01-02',
      '2024-01-03',
      '2024-01-04',
      '2024-01-05',
      '2024-01-06',
      '2024-01-07',
    ],
  ]),
}));

describe('Calendar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('캘린더 기본 구조가 렌더링된다', () => {
    render(<Calendar />);

    expect(screen.getByTestId('calendar-header')).toBeInTheDocument();
    expect(screen.getByTestId('calendar-layout')).toBeInTheDocument();
    expect(screen.getByTestId('calendar-days-header')).toBeInTheDocument();
  });

  it('Month 모드에서 올바른 레이아웃이 렌더링된다', async () => {
    render(<Calendar />);

    expect(screen.getByText('Mode: Month')).toBeInTheDocument();
    expect(screen.getByTestId('calendar-layout')).toHaveAttribute('data-mode', 'Month');

    await waitFor(() => {
      expect(screen.getByTestId('calendar-month-grid')).toBeInTheDocument();
    });
  });

  it('Week 모드로 변경하면 올바른 레이아웃이 렌더링된다', async () => {
    const user = userEvent.setup();
    render(<Calendar />);

    const switchButton = screen.getByText('Switch to Week');
    await user.click(switchButton);

    expect(screen.getByText('Mode: Week')).toBeInTheDocument();
    expect(screen.getByTestId('calendar-layout')).toHaveAttribute('data-mode', 'Week');

    await waitFor(() => {
      expect(screen.getByTestId('calendar-time-grid')).toBeInTheDocument();
    });
  });
});
