import { format, startOfWeek } from "date-fns";

function WeekPicker({ date, setDate }) {
  const handleChange = (e) => {
    const selectedDate = new Date(e.target.value);

    // Get start of the week (Monday)
    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });

    const formattedDate = format(weekStart, "yyyy-MM-dd");
    setDate(formattedDate);
  };

  return (
    <label>
      Select a date:
      <input type="date" onChange={handleChange} />
    </label>
  );
}

export default WeekPicker;
