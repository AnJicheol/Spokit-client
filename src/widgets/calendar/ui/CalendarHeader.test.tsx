import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CalendarHeader from './CalendarHeader';
import { type viewMode } from '../model';

vi.mock('./CalendarModeSelector', () => ({
  default: ({ mode, setMode }: { mode: viewMode; setMode: (mode: viewMode) => void }) => (
    <div data-testid='calendar-mode-selector'>
      <button onClick={() => setMode('Week')}>Week</button>
      <span data-testid='current-mode'>{mode}</span>
    </div>
  ),
}));

vi.mock('./CalendarNav', () => ({
  default: ({ setBaseDate }: { setBaseDate: (date: Date) => void }) => (
    <div data-testid='calendar-nav'>
      <button data-testid='nav-button' onClick={() => setBaseDate(new Date())}>
        Nav
      </button>
    </div>
  ),
}));

describe('CalendarHeader', () => {
  const mockSetBaseDate = vi.fn();
  const mockSetMode = vi.fn();
  const defaultProps = {
    baseDate: new Date(2024, 0, 15),
    setBaseDate: mockSetBaseDate,
    mode: 'Month' as viewMode,
    setMode: mockSetMode,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('모든 자식 컴포넌트 렌더링 테스트', () => {
    render(<CalendarHeader {...defaultProps} />);

    expect(screen.getByTestId('calendar-mode-selector')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByTestId('calendar-nav')).toBeInTheDocument();
  });

  it('날짜 표시 YYYY-MM format 테스트', () => {
    render(<CalendarHeader {...defaultProps} />);

    const dateTitle = screen.getByRole('heading', { level: 1 });
    expect(dateTitle).toHaveTextContent('2024-01');
  });

  it('Week 버튼 클릭 함수 실행 테스트', async () => {
    const user = userEvent.setup();
    render(<CalendarHeader {...defaultProps} />);

    const weekButton = screen.getByText('Week');
    await user.click(weekButton);

    expect(mockSetMode).toHaveBeenCalledWith('Week');
  });

  it('nav 버튼 작동 테스트', async () => {
    const user = userEvent.setup();
    render(<CalendarHeader {...defaultProps} />);

    const navButton = screen.getByTestId('nav-button');
    await user.click(navButton);

    expect(mockSetBaseDate).toHaveBeenCalledTimes(1);
  });
});
