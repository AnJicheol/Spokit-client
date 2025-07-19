import { format } from 'date-fns';
import type { viewMode } from '../model';
import { getMonthMatrix, getWeekMatrix } from '@/shared/lib/dateUtils';

// 단순한 캐시 Map
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
    // case 'Day':
    //   result = getDayMatrix(baseDate);
    //   break;
    default:
      result = getMonthMatrix(baseDate);
  }

  if (matrixCache.size >= 10) {
    const firstKey = matrixCache.keys().next().value;
    matrixCache.delete(firstKey as string);
  }

  matrixCache.set(cacheKey, result);
  return result;
}
