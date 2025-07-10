import { getDaysInMonth, startOfMonth, getDay, addMonths, subMonths } from 'date-fns';

/**
 * 월요일 시작, 5주(35칸)짜리 달력 2차원 배열 반환
 * 이전 달, 현재 달, 다음 달 날짜를 모두 포함 (년도 포함)
 * @param year 년도 (예: 2025)
 * @param month 월 (0~11)
 */
export function getMonthMatrix(year: number, month: number): string[][] {
  const currentDate = new Date(year, month);
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getDay(startOfMonth(currentDate));

  // 이전 달 정보
  const prevMonth = subMonths(currentDate, 1);
  const prevMonthYear = prevMonth.getFullYear();
  const prevMonthNumber = prevMonth.getMonth() + 1;
  const daysInPrevMonth = getDaysInMonth(prevMonth);

  // 다음 달 정보
  const nextMonth = addMonths(currentDate, 1);
  const nextMonthYear = nextMonth.getFullYear();
  const nextMonthNumber = nextMonth.getMonth() + 1;

  // 시작 인덱스 (일요일 시작 기준)
  const startIdx = firstDay;

  const cells: string[] = Array(35).fill('');

  // 이전 달 채우기
  for (let i = 0; i < startIdx; i++) {
    const day = daysInPrevMonth - startIdx + i + 1;
    cells[i] = `${prevMonthYear}-${prevMonthNumber}-${day}`;
  }

  // 현재 달 채우기
  for (let i = 0; i < daysInMonth; i++) {
    cells[startIdx + i] = `${year}-${month + 1}-${i + 1}`;
  }

  // 다음 달 채우기
  const remainingCells = 35 - (startIdx + daysInMonth);
  for (let i = 0; i < remainingCells; i++) {
    cells[startIdx + daysInMonth + i] = `${nextMonthYear}-${nextMonthNumber}-${i + 1}`;
  }

  return Array.from({ length: 5 }, (_, week) => cells.slice(week * 7, week * 7 + 7));
}
