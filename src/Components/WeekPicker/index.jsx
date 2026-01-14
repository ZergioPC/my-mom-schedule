import { format } from "date-fns";

function WeekPicker({ date, setDate }) {
  const handleChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const formattedDate = format(selectedDate, "yyyy-MM-dd");

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
