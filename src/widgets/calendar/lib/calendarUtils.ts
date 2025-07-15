import { startOfMonth, startOfWeek, addDays, format, getDay } from 'date-fns';
import { type viewMode } from '../model';

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

// 메모이제이션 캐시
const matrixCache = new Map<string, string[][]>();

/**
 * 캐시 키 생성
 * @param baseDate 기준 날짜
 * @param mode 뷰 모드
 * @returns 캐시 키
 */
function getCacheKey(baseDate: Date, mode: viewMode): string {
  return `${format(baseDate, 'yyyy-MM-dd')}-${mode}`;
}

/**
 * 모드별 캘린더 매트릭스 반환 (메모이제이션 적용)
 * @param baseDate 기준 날짜
 * @param mode 뷰 모드 ('Day' | 'Week' | 'Month')
 * @returns 날짜 문자열 2차원 배열
 */
export function getCalendarMatrix(baseDate: Date, mode: viewMode): string[][] {
  const cacheKey = getCacheKey(baseDate, mode);

  if (matrixCache.has(cacheKey)) {
    return matrixCache.get(cacheKey)!;
  }

  let result: string[][];
  switch (mode) {
    case 'Month':
      result = getMonthMatrix(baseDate);
      break;
    case 'Week':
      result = getWeekMatrix(baseDate);
      break;
    case 'Day':
      result = getDayMatrix(baseDate);
      break;
    default:
      result = getMonthMatrix(baseDate);
  }

  // 캐시 크기 제한 (최대 50개)
  if (matrixCache.size >= 50) {
    const firstKey = matrixCache.keys().next().value;
    matrixCache.delete(firstKey as string);
  }

  matrixCache.set(cacheKey, result);
  return result;
}
