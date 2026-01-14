import React from "react";
import { ItemsList } from "../ItemsList";
import { ItemsItem } from "../ItemsItem";

import "./CronogramaItem.css";

function CronogramaItem({ item, counter }){
  const semana = counter;
  return(
    <article className="CronogramaItem">
      <span>
        {"Semana " + (semana < 10 ? "0"+semana : semana)}
      </span>

      <div>
        <label>
          <span>Submeta: </span>
            <p>{item.submeta}</p>
        </label>

        <label>
          <span>Tema: </span>
          <p>{item.tema}</p>
        </label>
        
          {item.tareas.length > 0 && (
            <ul className="CronogramaItem-tareas">
              {item.tareas.map((tarea, idx) =>
                <ItemsItem 
                  key={idx}
                  text={tarea.txt}
                  noEdit={false}
                />
              )}
            </ul>
          )}
        
      </div>
    </article>
  );
}

export { CronogramaItem };