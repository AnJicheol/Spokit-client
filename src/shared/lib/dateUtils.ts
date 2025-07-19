import { startOfMonth, startOfWeek, addDays, format } from 'date-fns';

/**
 * 일요일 시작, 5주(35칸)짜리 달력 2차원 배열 반환
 * @param baseDate 기준 날짜
 * @returns 5주간의 날짜 문자열 2차원 배열
 */
export function getMonthMatrix(baseDate: Date): string[][] {
  const monthStart = startOfMonth(baseDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // 일요일 시작

  const dates: string[] = [];
  for (let i = 0; i < 35; i++) {
    const date = addDays(calendarStart, i);
    dates.push(format(date, 'yyyy-MM-dd'));
  }

  return Array.from({ length: 5 }, (_, week) => dates.slice(week * 7, (week + 1) * 7));
}

/**
 * 주간 뷰용 7일 배열 반환 (1주)
 * @param baseDate 기준 날짜
 * @returns 7일간의 날짜 문자열 2차원 배열 [[7개 날짜]]
 */
export function getWeekMatrix(baseDate: Date): string[][] {
  const weekStart = startOfWeek(baseDate, { weekStartsOn: 0 }); // 일요일 시작
  const weekDays: string[] = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(weekStart, i);
    weekDays.push(format(date, 'yyyy-MM-dd'));
  }

  return [weekDays];
}

/**
 * 일간 뷰용 1일 배열 반환
 * @param baseDate 기준 날짜
 * @returns 1일의 날짜 문자열 2차원 배열 [[1개 날짜]]
 */
export function getDayMatrix(baseDate: Date): string[][] {
  const dayString = format(baseDate, 'yyyy-MM-dd');
  return [[dayString]];
}
