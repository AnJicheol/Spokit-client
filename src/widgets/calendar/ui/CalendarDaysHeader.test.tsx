import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CalendarDaysHeader from './CalendarDaysHeader';
import { type viewMode } from '../model';

describe('CalendarDaysHeader', () => {
  const mockWeekData = [
    [
      '2024-01-01',
      '2024-01-02',
      '2024-01-03',
      '2024-01-04',
      '2024-01-05',
      '2024-01-06',
      '2024-01-07',
    ],
  ];

  const defaultProps = {
    mode: 'Month' as viewMode,
    week: mockWeekData,
  };

  it('DaysHeader Month 모드 렌더링 테스트', () => {
    render(<CalendarDaysHeader {...defaultProps} mode='Month' />);

    expect(screen.getByText('일')).toBeInTheDocument();
    expect(screen.getByText('월')).toBeInTheDocument();
    expect(screen.getByText('화')).toBeInTheDocument();
    expect(screen.getByText('수')).toBeInTheDocument();
    expect(screen.getByText('목')).toBeInTheDocument();
    expect(screen.getByText('금')).toBeInTheDocument();
    expect(screen.getByText('토')).toBeInTheDocument();
  });

  it('DaysHeader Week 모드 렌더링 테스트', () => {
    render(<CalendarDaysHeader {...defaultProps} mode='Week' />);

    expect(screen.getByText('1(일)')).toBeInTheDocument();
    expect(screen.getByText('2(월)')).toBeInTheDocument();
    expect(screen.getByText('3(화)')).toBeInTheDocument();
    expect(screen.getByText('4(수)')).toBeInTheDocument();
    expect(screen.getByText('5(목)')).toBeInTheDocument();
    expect(screen.getByText('6(금)')).toBeInTheDocument();
    expect(screen.getByText('7(토)')).toBeInTheDocument();
  });

  it('week parameter의 데이터가 바꼇을 시 렌더링 테스트', () => {
    const { rerender } = render(<CalendarDaysHeader {...defaultProps} mode='Week' />);

    expect(screen.getByText('1(일)')).toBeInTheDocument();

    const newWeekData = [
      [
        '2024-02-05',
        '2024-02-06',
        '2024-02-07',
        '2024-02-08',
        '2024-02-09',
        '2024-02-10',
        '2024-02-11',
      ],
    ];

    rerender(<CalendarDaysHeader {...defaultProps} mode='Week' week={newWeekData} />);

    expect(screen.getByText('5(일)')).toBeInTheDocument();
    expect(screen.queryByText('1(일)')).not.toBeInTheDocument();
  });

  it('Gird 레이아웃으로 렌더링 되었는지 테스트', () => {
    render(<CalendarDaysHeader {...defaultProps} mode='Month' />);

    const container = screen.getByText('일').closest('div');
    expect(container).toHaveClass('grid-cols-7');
  });
});
