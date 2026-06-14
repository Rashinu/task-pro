export const matchesCardFilters = (card, { priority, startDate, endDate }) => {
  if (priority !== "all" && card.priority !== priority) return false;

  if (startDate && endDate) {
    const deadline = new Date(card.deadline);

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    if (deadline < start || deadline > end) return false;
  }

  return true;
};
