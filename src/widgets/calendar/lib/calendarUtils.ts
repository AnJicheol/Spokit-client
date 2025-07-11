import { getDaysInMonth, startOfMonth, getDay } from 'date-fns';

/**
 * 월요일 시작, 5주(35칸)짜리 달력 2차원 배열 반환 (빈칸은 null)
 * @param year 년도 (예: 2025)
 * @param month 월 (1~12)
 */

export function getMonthMatrix(year: number, month: number): (number | null)[][] {
  const daysInMonth = getDaysInMonth(new Date(year, month));
  const firstDay = getDay(startOfMonth(new Date(year, month)));

  const startIdx = (firstDay + 6) % 7;
  console.log('daysInMonth', daysInMonth, firstDay, startIdx);

  const cells: (number | null)[] = Array(35).fill(null);

  for (let i = 0; i < daysInMonth; ++i) {
    cells[startIdx + i] = i + 1;
  }

  return Array.from({ length: 5 }, (_, week) => cells.slice(week * 7, week * 7 + 7));
}
