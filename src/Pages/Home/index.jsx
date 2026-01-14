import React from "react";

import useLocalStorage from "../../Hooks/useLocalStorage";
import useCronograma from "../../Hooks/useCronograma";

import idMatchToWeek from "../../Utils/idMatchToWeek";

function Home(){
  const [startWeek, _ ] = useLocalStorage("Start","");
  const { cronograma } = useCronograma();

  const currentWeekData = cronograma.find(item =>
    idMatchToWeek(item, startWeek)
  );  

  return(
    <>
      <h1>General</h1>
      <main>
        <section>
          <h2>Metas de la Semana</h2>
          {currentWeekData ? (
            <>
              <p>{currentWeekData.submeta}</p>
              <span>{currentWeekData.tema}</span>
              <ul>
                {currentWeekData.tareas.map((item, idx) =>
                  <li  key={idx}>item</li>
                )}
              </ul>
            </>
          ) : (
            <p>No se ha creado nada para esta semana</p>
          )}
        </section>
      </main>
    </>
  );
}

export { Home };