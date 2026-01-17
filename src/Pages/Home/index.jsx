import "./Home.css"
import React from "react";

import useLocalStorage from "../../Hooks/useLocalStorage";
import useCronograma from "../../Hooks/useCronograma";

import idMatchToWeek from "../../Utils/idMatchToWeek";

import { useManageData, dayTypes, timeTypes, matrizTypes } from "../../Hooks/useManageData";

const currentInit = {
    "id": 0,
    "submeta": "",
    "tema": "",
    "tareas": [],
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

function Home(){
  const {tareas} = useManageData();

  const [startWeek, _ ] = useLocalStorage("Start","");
  const [currentWeekData, setCurrent ] = useLocalStorage("CurrentWeek", currentInit);

  const { cronograma } = useCronograma();

  const urgenteItems = tareas.filter(tarea => tarea.matriz === matrizTypes.urgente);
  const noUrgenteItems = tareas.filter(tarea => tarea.matriz === matrizTypes.noUrgente);
  const importanteItems = tareas.filter(tarea => tarea.matriz === matrizTypes.importante);
  const noImportanteItems = tareas.filter(tarea => tarea.matriz === matrizTypes.noImportante);

  React.useEffect(()=>{
    setCurrent(cronograma.find(item =>
      idMatchToWeek(item, startWeek)
    ));
  },[]);

  return(
    <>
      <h1>Menú Principal</h1>
      <main className="Home">

        {/* MARK: Current Week */}
        <section className="Home-current">
          <div className="Home-current-title">
            <h2>{"Semana "}
              {currentWeekData && String(currentWeekData.id).padStart(2,"0")}
              </h2>
            {currentWeekData ? (
            <>
              <p>Meta Semanal: <b>{currentWeekData.submeta}</b></p>
              <span>{currentWeekData.tema}</span>
            </>
          ) : (
            <p>No se ha creado nada para esta semana</p>
          )}
          </div>
          {currentWeekData && (
            <div className="Home-current-items">
              <ul>
                {currentWeekData.tareas.map((item, idx) =>
                  <li
                   key={idx}
                   className={item.complete ? "tarea-complete" : ""}
                  ><span>{item.txt}</span></li>
                )}
              </ul>
            </div>
          )}
        </section>

        {/* MARK: Semana Tasks */}
        <section className="Home-semana">
          <h2>Pendientes de la semana</h2>
          
          <div className="Home-semana-container">
            {days.map((day, idx) => (
              <article key={idx}>
                <h2>{day.label}</h2>
                
                <ul className="Home-semana-morning">
                  {tareas.filter(item => 
                    item.day === day.value && item.time === timeTypes.morning
                  ).map((item,idx)=>(
                    <li 
                      key={idx}
                      className={item.complete ? "Home-semana-check" : ""}
                    >{item.txt}</li>
                  ))}
                </ul>
                
                <ul className="Home-semana-midday">
                  {tareas.filter(item => 
                    item.day === day.value && item.time === timeTypes.midday
                  ).map((item,idx)=>(
                    <li 
                      key={idx}
                      className={item.complete ? "Home-semana-check" : ""}
                    >{item.txt}</li>
                  ))}
                </ul>

                <ul className="Home-semana-afternoon">
                  {tareas.filter(item => 
                    item.day === day.value && item.time === timeTypes.afternoon
                  ).map((item,idx)=>(
                    <li 
                      key={idx}
                      className={item.complete ? "Home-semana-check" : ""}
                    >{item.txt}</li>
                  ))}
                </ul>

                <ul className="Home-semana-night">
                  {tareas.filter(item => 
                    item.day === day.value && item.time === timeTypes.night
                  ).map((item,idx)=>(
                    <li 
                      key={idx}
                      className={item.complete ? "Home-semana-check" : ""}
                    >{item.txt}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>


        {/* MARK: Matriz */}
        <section className="Home-matriz">
          <h2>Matriz Eisenhower</h2>

          <article className="matriz-urgente">
            {urgenteItems.length === 0 ? (
              <p>No hay urgencias de mucha importancia</p>
            ) : (
            <ul>
              {urgenteItems.map((item,idx)=>(
                <li key={idx}>{item.txt}</li>
              ))}
            </ul>
            )}
          </article>

          <article className="matriz-importante">
            {noUrgenteItems.length === 0 ? (
              <p>No hay urgencias de poca importancia</p>
            ) : (
            <ul>
              {noUrgenteItems.map((item,idx)=>(
                <li key={idx}>{item.txt}</li>
              ))}
            </ul>
            )}
          </article>

          <article className="matriz-nourgente">
            {importanteItems.length === 0 ? (
              <p>No hay tareas importantes no urgentes</p>
            ) : (
            <ul>
              {importanteItems.map((item,idx)=>(
                <li key={idx}>{item.txt}</li>
              ))}
            </ul>
            )}
          </article>

          <article className="matriz-noimportante">
            {noImportanteItems.length === 0 ? (
              <p>No hay tareas ni urgentes ni importantes</p>
            ) : (
            <ul>
              {noImportanteItems.map((item,idx)=>(
                <li key={idx}>{item.txt}</li>
              ))}
            </ul>
            )}
          </article>

        </section>
      </main>
    </>
  );
}

export { Home };