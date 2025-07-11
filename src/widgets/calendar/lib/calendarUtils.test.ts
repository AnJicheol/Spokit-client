import { describe, it, expect } from 'vitest';

import { getMonthMatrix } from './calendarUtils';

describe('getMonthMatrix 함수 태스트', () => {
  // 특정 월은 해당 월 - 1입니다. (ex: 7월 = 6)
  it('2025년 7월: 1일이 화요일에 위치해야 한다', () => {
    const matrix = getMonthMatrix(2025, 6);
    expect(matrix[0][0]).toBe(null);
    expect(matrix[0][1]).toBe(1);
  });

  it('2025년 7월: 31일까지 표시되어야 한다', () => {
    const matrix = getMonthMatrix(2025, 6);
    expect(matrix.flat().filter(Boolean).length).toBe(31);
    expect(matrix.flat().includes(31)).toBe(true);
  });

  it('2024년 2월(윤년): 29일까지 있어야 한다', () => {
    const matrix = getMonthMatrix(2024, 1);
    expect(matrix.flat().includes(29)).toBe(true);
    expect(matrix.flat().includes(30)).toBe(false);
  });
});
