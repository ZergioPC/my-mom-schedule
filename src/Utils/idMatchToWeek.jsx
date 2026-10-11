import { startOfWeek, addWeeks, isSameWeek } from "date-fns";

export default function idMatchToWeek(item, baseDate) {
  const base = new Date(baseDate);

  if (Number.isNaN(base.getTime()) || typeof item?.id !== "number") {
    return false;
  }

  const baseWeekStart = startOfWeek(base, {
    weekStartsOn: 0
  });

  const itemWeekDate = addWeeks(baseWeekStart, item.id);

  return isSameWeek(new Date(), itemWeekDate, {
    weekStartsOn: 0
  });
}
