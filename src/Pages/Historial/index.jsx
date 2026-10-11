import React from "react";
import "./Historial.css";

import useLocalStorage from "../../Hooks/useLocalStorage";

const SemaWeek = (n) => `Semana ${String(n ?? 0).padStart(2, "0")}`;

function Historial(){
  const [historial] = useLocalStorage("Organizador-Historial", []);

  const items = [...historial]
    .sort((a, b) => (b.completedWeek ?? 0) - (a.completedWeek ?? 0));

  const grupos = items.reduce((acc, item) => {
    const key = item.completedWeek ?? 0;
    (acc[key] ??= []).push(item);
    return acc;
  }, {});

  return (
    <>
      <h1>Historial de Tareas</h1>
      <main className="Historial">
        {items.length === 0 ? (
          <p>No hay tareas completadas registradas.</p>
        ) : (
          Object.entries(grupos)
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([week, group]) => (
              <section key={week} className="Historial-grupo">
                <h2>{SemaWeek(Number(week))}</h2>
                <ul className="Historial-lista">
                  {group.map((item, idx) => (
                    <li key={idx} className="Historial-item">
                      <p className="Historial-txt">{item.txt || "(sin nombre)"}</p>
                      <p className="Historial-meta">
                        Creada en {SemaWeek(item.createdWeek)} · Terminada en {SemaWeek(item.completedWeek)}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ))
        )}
      </main>
    </>
  );
}

export { Historial };