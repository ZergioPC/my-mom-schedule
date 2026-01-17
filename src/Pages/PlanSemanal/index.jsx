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
  const {tareas, editTareaDay, editTareaComplete} = useManageData();
  const [sizes, setSizes] = React.useState(sizes_init);

  const handleDrop = (taskId, day, time) => {
    editTareaDay(taskId, day, time);
  };

  return(
    <>
      <h1>Planeador Semanal</h1>
      <main className="PlanSemanal">
        <section className="no-asigned-yet">
          <SemanaList
            day={dayTypes.none}
            time={timeTypes.none}
            onDrop={handleDrop}
          >
            {tareas.filter(item =>
              item.day === dayTypes.none
            ).map((item,idx) => (
              <SemanaItem
                key={idx}
                id={item.id}
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
                day={day.value}
                time={timeTypes.morning}
                onDrop={handleDrop}
              >
                {tareas.filter(item => 
                  item.day === day.value && item.time === timeTypes.morning
                ).map((item,idx)=>(
                  <SemanaItem 
                    key={idx}
                    id={item.id}
                    text={item.txt}
                    complete={item.complete}
                    onComplete={editTareaComplete}
                  />
                ))}
              </SemanaList>

              <SemanaList
                className="midday"
                size={sizes.midday}
                day={day.value}
                time={timeTypes.midday}
                onDrop={handleDrop}
              >
                {tareas.filter(item => 
                  item.day === day.value && item.time === timeTypes.midday
                ).map((item,idx)=>(
                  <SemanaItem 
                    key={idx}
                    id={item.id}
                    text={item.txt}
                    complete={item.complete}
                    onComplete={editTareaComplete}
                  />
                ))}
              </SemanaList>

              <SemanaList
                className="afternoon"
                size={sizes.after}
                day={day.value}
                time={timeTypes.afternoon}
                onDrop={handleDrop}
              >
                {tareas.filter(item => 
                  item.day === day.value && item.time === timeTypes.afternoon
                ).map((item,idx)=>(
                  <SemanaItem 
                    key={idx}
                    id={item.id}
                    text={item.txt}
                    complete={item.complete}
                    onComplete={editTareaComplete}
                  />
                ))}
              </SemanaList>

              <SemanaList
                className="night"
                size={sizes.night}
                day={day.value}
                time={timeTypes.night}
                onDrop={handleDrop}
              >
                {tareas.filter(item => 
                  item.day === day.value && item.time === timeTypes.night
                ).map((item,idx)=>(
                  <SemanaItem 
                    key={idx}
                    id={item.id}
                    text={item.txt}
                    complete={item.complete}
                    onComplete={editTareaComplete}
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