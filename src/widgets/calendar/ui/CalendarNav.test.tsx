import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CalendarNav from './CalendarNav';
import { type viewMode } from '../model';

describe('CalendarNav', () => {
  const mockSetBaseDate = vi.fn();
  const defaultProps = {
    baseDate: new Date(2024, 0, 15),
    setBaseDate: mockSetBaseDate,
    mode: 'Month' as viewMode,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('CalendarNav 렌더링 테스트', () => {
    render(<CalendarNav {...defaultProps} />);

    expect(screen.getByTestId('cal-nav-prev-button')).toBeInTheDocument();
    expect(screen.getByTestId('cal-nav-next-button')).toBeInTheDocument();
    expect(screen.getByText('Today')).toBeInTheDocument();
  });

  it('handles previous navigation in Month mode', async () => {
    const user = userEvent.setup();
    render(<CalendarNav {...defaultProps} />);

    const prevButton = screen.getByTestId('cal-nav-prev-button');
    await user.click(prevButton);

    expect(mockSetBaseDate).toHaveBeenCalledTimes(1);
    const calledDate = mockSetBaseDate.mock.calls[0][0];
    expect(calledDate.getMonth()).toBe(11);
    expect(calledDate.getFullYear()).toBe(2023);
  });

  it('next 버튼 테스트', async () => {
    const user = userEvent.setup();
    render(<CalendarNav {...defaultProps} />);

    const nextButton = screen.getByTestId('cal-nav-next-button');
    await user.click(nextButton);

    expect(mockSetBaseDate).toHaveBeenCalledTimes(1);
    const calledDate = mockSetBaseDate.mock.calls[0][0];
    expect(calledDate.getMonth()).toBe(1);
  });

  it('prev 버튼 Week모드 테스트', async () => {
    const user = userEvent.setup();
    render(<CalendarNav {...defaultProps} mode='Week' />);

    const prevButton = screen.getByTestId('cal-nav-prev-button');
    await user.click(prevButton);

    expect(mockSetBaseDate).toHaveBeenCalledTimes(1);
    const calledDate = mockSetBaseDate.mock.calls[0][0];
    expect(calledDate.getDate()).toBe(8);
  });

  it('Today 버튼 클릭', async () => {
    const user = userEvent.setup();
    const expectedDate = new Date(); // 테스트 시작 시점의 날짜

    render(<CalendarNav {...defaultProps} />);

    const todayButton = screen.getByText('Today');
    await user.click(todayButton);

    const calledDate = mockSetBaseDate.mock.calls[0][0];
    // 같은 날인지만 확인
    expect(calledDate.getDate()).toBe(expectedDate.getDate());
    expect(calledDate.getMonth()).toBe(expectedDate.getMonth());
    expect(calledDate.getFullYear()).toBe(expectedDate.getFullYear());
  });
});
