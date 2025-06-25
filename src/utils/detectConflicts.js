// Utility to check overlapping time ranges
const timeToMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export const detectConflicts = (events) => {
  return events.map((event, idx, arr) => {
    const startA = timeToMinutes(event.startTime);
    const endA = timeToMinutes(event.endTime);
    const conflicts = arr.some((other, i) => {
      if (i === idx) return false;
      if (other.date !== event.date) return false;
      const startB = timeToMinutes(other.startTime);
      const endB = timeToMinutes(other.endTime);
      return startA < endB && startB < endA;
    });
    return { ...event, hasConflict: conflicts };
  });
};
