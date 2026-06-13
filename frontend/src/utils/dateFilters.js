export const DATE_FILTER_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
];

export const matchesDateFilter = (deadline, filter) => {
  if (filter === "all") return true;
  if (!deadline) return false;

  const due = new Date(deadline);
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dueDay = new Date(due.getFullYear(), due.getMonth(), due.getDate());

  if (filter === "today") {
    return dueDay.getTime() === startOfDay.getTime();
  }

  if (filter === "week") {
    const weekEnd = new Date(startOfDay);
    weekEnd.setDate(weekEnd.getDate() + 7);
    return dueDay >= startOfDay && dueDay < weekEnd;
  }

  if (filter === "month") {
    const monthEnd = new Date(startOfDay);
    monthEnd.setMonth(monthEnd.getMonth() + 1);
    return dueDay >= startOfDay && dueDay < monthEnd;
  }

  return true;
};
