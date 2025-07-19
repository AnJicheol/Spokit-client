export const DAYS_KO = Object.freeze(['일', '월', '화', '수', '목', '금', '토']);
// export const MONTH_DAY_WEEK = Object.freeze(['Month', 'Week', 'Day']);
export const CALENDAR_MODE = Object.freeze(['Month', 'Week']);
// 오전 7시 ~ 오후 12시까지의 시간 배열
export const TIME_SLOTS = Object.freeze(
  Array.from({ length: 36 }, (_, i) => {
    const hour = 7 + Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  }),
);
