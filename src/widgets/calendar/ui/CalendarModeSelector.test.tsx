import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CalendarModeSelector from './CalendarModeSelector';
import { type viewMode } from '../model';

describe('CalendarModeSelector', () => {
  const mockSetMode = vi.fn();
  const defaultProps = {
    mode: 'Month' as viewMode,
    setMode: mockSetMode,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('CalendarModeSelector 렌더링 테스트', () => {
    render(<CalendarModeSelector {...defaultProps} />);

    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Week')).toBeInTheDocument();
  });

  it('Month to Week 버튼 클릭 테스트', async () => {
    const user = userEvent.setup();
    render(<CalendarModeSelector {...defaultProps} mode='Month' />);

    const weekButton = screen.getByText('Week').closest('div') as HTMLElement;
    await user.click(weekButton);

    expect(mockSetMode).toHaveBeenCalledWith('Week');
    expect(mockSetMode).toHaveBeenCalledTimes(1);
  });

  it('Week to Month 버튼 클릭 테스트', async () => {
    const user = userEvent.setup();
    render(<CalendarModeSelector {...defaultProps} mode='Week' />);

    const monthButton = screen.getByText('Month').closest('div') as HTMLElement;
    await user.click(monthButton);

    expect(mockSetMode).toHaveBeenCalledWith('Month');
    expect(mockSetMode).toHaveBeenCalledTimes(1);
  });

  it('배경 에니메이션 블록 렌더링 테스트', () => {
    render(<CalendarModeSelector {...defaultProps} />);

    const animatedBg = screen.getByTestId('selector-animate-bg');
    expect(animatedBg).toBeInTheDocument();
  });
});
