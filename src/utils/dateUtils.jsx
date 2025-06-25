import dayjs from 'dayjs';

export const generateCalendarMatrix = (month, year) => {
  const start = dayjs(`${year}-${month}-01`);
  const startDay = start.day(); // Sunday = 0
  const daysInMonth = start.daysInMonth();

  let matrix = [];
  let week = [];

  for (let i = 0; i < startDay; i++) week.push(null);

  for (let d = 1; d <= daysInMonth; d++) {
    week.push(dayjs(`${year}-${month}-${d < 10 ? '0' + d : d}`));
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
  }

  if (week.length) {
    while (week.length < 7) week.push(null);
    matrix.push(week);
  }

  return matrix;
};
