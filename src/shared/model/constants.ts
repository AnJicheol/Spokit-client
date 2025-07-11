export const minuteOptions = { calendar: ['00', '10', '20', '30', '40', '50'] };

export const hourOptions = {
  calendar: Array.from({ length: 24 }, (_, i) => String(i + 1).padStart(2, '0')),
};
