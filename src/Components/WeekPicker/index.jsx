import { format, startOfWeek } from "date-fns";
import "./WeekPicker.css";

function WeekPicker({ date, setDate }) {
  const handleChange = (e) => {
    const selectedDate = new Date(e.target.value);

    // Inicio de la semana (domingo, weekStartsOn: 0)
    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });

    const formattedDate = format(weekStart, "yyyy-MM-dd");
    setDate(formattedDate);
  };

  return (
    <div className="WeekPicker">
      <input type="date" value={date} onChange={handleChange} />
    </div>
  );
}

export default WeekPicker;
