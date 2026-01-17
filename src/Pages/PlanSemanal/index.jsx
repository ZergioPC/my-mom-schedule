import React from "react";
import "./PlanSemanal.css";
import { useManageData, dayTypes, timeTypes } from "../../Hooks/useManageData";
import { SemanaList } from "../../Components/SemanaList";
import { SemanaItem } from "../../Components/SemanaItem";

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
          <SemanaList>
            {tareas.filter(item => 
              item.day === dayTypes.none
            ).map((item,idx)=>(
              <SemanaItem 
                key={idx}
                text={item.txt}
              />
            ))}
          </SemanaList>
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
              >
                {tareas.filter(item => 
                  item.day === day.value && item.time === timeTypes.morning
                ).map((item,idx)=>(
                  <SemanaItem 
                    key={idx}
                    text={item.txt}
                  />
                ))}
              </SemanaList>

              <SemanaList
                className="midday"
                size={sizes.midday}
              >
                {tareas.filter(item => 
                  item.day === day.value && item.time === timeTypes.midday
                ).map((item,idx)=>(
                  <SemanaItem 
                    key={idx}
                    text={item.txt}
                  />
                ))}
              </SemanaList>

              <SemanaList
                className="afternoon"
                size={sizes.after}
              >
                {tareas.filter(item => 
                  item.day === day.value && item.time === timeTypes.afternoon
                ).map((item,idx)=>(
                  <SemanaItem 
                    key={idx}
                    text={item.txt}
                  />
                ))}
              </SemanaList>

              <SemanaList
                className="night"
                size={sizes.night}
              >
                {tareas.filter(item => 
                  item.day === day.value && item.time === timeTypes.night
                ).map((item,idx)=>(
                  <SemanaItem 
                    key={idx}
                    text={item.txt}
                  />
                ))}
              </SemanaList>
            </div>
          ))}
          
        </section>
      </main>
    </>
  );
}

export { PlanSemanal };