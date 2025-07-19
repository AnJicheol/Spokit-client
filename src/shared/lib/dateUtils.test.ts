import { describe, it, expect } from 'vitest';

import { getMonthMatrix } from './dateUtils';

describe('getMonthMatrix 함수 테스트', () => {
  // 특정 월은 해당 월 - 1입니다. (ex: 7월 = 6)
  it('2025년 7월: 1일이 화요일에 위치해야 한다', () => {
    const date = new Date();
    const matrix = getMonthMatrix(date);
    // 화요일은 matrix[0][2]에 있고, 1일은 2025-7-1 형식으로 표시
    expect(matrix[0][2]).toBe('2025-07-01');
  });

  // it('2025년 7월: 31일까지 표시되어야 한다', () => {
  //   const matrix = getMonthMatrix(2025, 6);
  //   // 현재 월의 마지막 날짜를 검색
  //   const lastDayOfMonth = matrix.flat().find((cell) => cell === '2025-7-31');
  //   expect(lastDayOfMonth).toBe('2025-7-31');
  // });

  // it('2024년 2월(윤년): 29일까지 있어야 한다', () => {
  //   const matrix = getMonthMatrix(2024, 1);
  //   // 2024년 2월 29일이 있어야 함
  //   const leapDay = matrix.flat().find((cell) => cell === '2024-2-29');
  //   expect(leapDay).toBe('2024-2-29');

  //   // 2024년 2월 30일은 없어야 함
  //   const nonExistingDay = matrix.flat().find((cell) => cell === '2024-2-30');
  //   expect(nonExistingDay).toBeUndefined();
  // });

  // it('1월에는 이전달이 이전년도의 12월이어야 한다', () => {
  //   const matrix = getMonthMatrix(2025, 0); // 2025년 1월

  //   // 이전 달인 2024년 12월의 날짜가 포함되어야 함
  //   const prevMonthDay = matrix.flat().find((cell) => cell?.startsWith('2024-12-'));
  //   expect(prevMonthDay).toBeDefined();
  //   expect(prevMonthDay?.startsWith('2024-12-')).toBe(true);
  // });

  // it('12월에는 다음달이 다음년도의 1월이어야 한다', () => {
  //   const matrix = getMonthMatrix(2025, 11); // 2025년 12월

  //   // 다음 달인 2026년 1월의 날짜가 포함되어야 함
  //   const nextMonthDay = matrix.flat().find((cell) => cell?.startsWith('2026-1-'));
  //   expect(nextMonthDay).toBeDefined();
  //   expect(nextMonthDay?.startsWith('2026-1-')).toBe(true);
  // });
});
