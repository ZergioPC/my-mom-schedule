import { startOfWeek, addWeeks, isSameWeek } from "date-fns";

export default function idMatchToWeek(item, baseDate) {
  const baseWeekStart = startOfWeek(new Date(baseDate), {
    weekStartsOn: 0
  });
  
  const itemWeekDate = addWeeks(baseWeekStart, item.id);

  return isSameWeek(new Date(), itemWeekDate, {
    weekStartsOn: 0
  });
}
