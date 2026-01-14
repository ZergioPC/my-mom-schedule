import "./Home.css"

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
                  <li  key={idx}>{item.txt}</li>
                )}
              </ul>
            </div>
          )}
        </section>

        {/* MARK: Semana Tasks */}
        <section className="Home-semana">
          <h2>Pendientes de la semana</h2>
          
          <div className="Home-semana-container">
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
          </div>
        </section>


        {/* MARK: Matriz */}
        <section className="Home-matriz">
          <h2>Matriz Eisenhower</h2>

          <article className="matriz-urgente">
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

          <article className="matriz-importante">
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

          <article className="matriz-nourgente">
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

          <article className="matriz-noimportante">
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