import React from "react";
import "./PlanSemanal.css";
import { useManageData, dayTypes, timeTypes } from "../../Hooks/useManageData";
import { ItemsList } from "../../Components/ItemsList";
import { SemanaList } from "../../Components/SemanaList";

const sizes_init = {
  morning: 1,
  midday: 1,
  afternoon: 1,
  night: 1,
}

const days = [
  { label: "Lunes", value: dayTypes.lunes },
  { label: "Martes", value: dayTypes.martes },
  { label: "Miércoles", value: dayTypes.miercoles },
  { label: "Jueves", value: dayTypes.jueves },
  { label: "Viernes", value: dayTypes.viernes },
  { label: "Sábado", value: dayTypes.sabado },
  { label: "Domingo", value: dayTypes.domingo },
]

function PlanSemanal(){
  const {tareas, editTareaDay} = useManageData();
  const [sizes, setSizes] = React.useState(sizes_init);

  return(
    <>
      <h1>Planeador Semanal</h1>
      <main className="PlanSemanal">
        <section className="no-asigned-yet">
          {/* Tareas aun no asignadas a un dia */}
        </section>

        <section className="Plan-horario">
          <div className="PlanLabels">
            <h2>Hora</h2>
            <div className="Plan-morning">Mañana</div>
            <div className="Plan-midday">Medio Dia</div>
            <div className="Plan-afternoon">Tarde</div>
            <div className="Plan-night">Noche</div>
          </div>

          {days.map(day => (
            <div className="Plan-dia" key={day.value}>
              <h2>{day.label}</h2>
              <SemanaList
                className="morning"
                size={sizes.morning}
                items={tareas.filter(item => 
                  item.day === day.value && item.time === timeTypes.morning
                )}
              />
              <SemanaList
                className="midday"
                size={sizes.midday}
                items={tareas.filter(item => 
                  item.day === day.value && item.time === timeTypes.midday
                )}
              />
              <SemanaList
                className="afternoon"
                size={sizes.after}
                items={tareas.filter(item => 
                  item.day === day.value && item.time === timeTypes.afternoon
                )}
              />
              <SemanaList
                className="night"
                size={sizes.night}
                items={tareas.filter(item => 
                  item.day === day.value && item.time === timeTypes.night
                )}
              />
            </div>
          ))}
          
        </section>
      </main>
    </>
  );
}

export { PlanSemanal };