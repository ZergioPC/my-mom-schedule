import React from "react";

import useLocalStorage from "../../Hooks/useLocalStorage";
import useCronograma from "../../Hooks/useCronograma";
import usePlanSemanal from "../../Hooks/usePlanSemanal";

import idMatchToWeek from "../../Utils/idMatchToWeek";
import useMatrizCtx from "../../Hooks/useMatrizCtx";

function Home(){
  const [startWeek, _ ] = useLocalStorage("Start","");
  const { cronograma } = useCronograma();
  const { semanal } =  usePlanSemanal();
  const { matriz } = useMatrizCtx();

  const currentWeekData = cronograma.find(item =>
    idMatchToWeek(item, startWeek)
  );  

  return(
    <>
      <h1>Organizador</h1>
      <main>

        {/* MARK: Current Week */}
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

        {/* MARK: Semana Tasks */}
        <section>
          <h2>Pendientes de la semana</h2>
          
          <article>
            <h3>Hogar</h3>
            <ol>
                {semanal.hogar.length === 0 ? (
                  <p>No hay tareas de hogar aún...</p>
                ) : (
                  semanal.hogar.map((item) => 
                    <li key={item.id}>{item.txt}</li>
                  )
                )}
            </ol>
          </article>

          <article>
            <h3>Estudio</h3>
            <ol>
                {semanal.acaademia.length === 0 ? (
                  <p>No hay tareas de estudio aún...</p>
                ) : (
                  semanal.acaademia.map((item) => 
                    <li key={item.id}>{item.txt}</li>
                  )
                )}
            </ol>
          </article>

          <article>
            <h3>Trabajo</h3>
            <ol>
                {semanal.laboral.length === 0 ? (
                  <p>No hay tareas de trabajo aún...</p>
                ) : (
                  semanal.laboral.map((item) => 
                    <li key={item.id}>{item.txt}</li>
                  )
                )}
            </ol>
          </article>

          <article>
            <h3>Ocio</h3>
            <ol>
                {semanal.ocio.length === 0 ? (
                  <p>No hay tareas de ocio aún...</p>
                ) : (
                  semanal.ocio.map((item) => 
                    <li key={item.id}>{item.txt}</li>
                  )
                )}
            </ol>
          </article>
        </section>

        {/* MARK: Matriz */}
        <section>
          <h2>Matriz Dofa</h2>

          <article>
            {matriz.urgente.length === 0 ? (
              <p>No hay urgencias de mucha importancia</p>
            ) : (
            <ul>
              {matriz.urgente.map((item,idx)=>(
                <li key={idx}>{item.txt}</li>
              ))}
            </ul>
            )}
          </article>

          <article>
            {matriz.noUrgente.length === 0 ? (
              <p>No hay urgencias de poca importancia</p>
            ) : (
            <ul>
              {matriz.noUrgente.map((item,idx)=>(
                <li key={idx}>{item.txt}</li>
              ))}
            </ul>
            )}
          </article>

          <article>
            {matriz.importante.length === 0 ? (
              <p>No hay tareas importantes no urgentes</p>
            ) : (
            <ul>
              {matriz.importante.map((item,idx)=>(
                <li key={idx}>{item.txt}</li>
              ))}
            </ul>
            )}
          </article>

          <article>
            {matriz.noImportante.length === 0 ? (
              <p>No hay tareas ni urgentes ni importantes</p>
            ) : (
            <ul>
              {matriz.noImportante.map((item,idx)=>(
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