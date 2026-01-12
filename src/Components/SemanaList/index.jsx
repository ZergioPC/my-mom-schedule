import React from "react";
import { ItemsList } from "../ItemsList";

import "./SemanaList.css";

function SemanaList(){
  return(
    <article className="semana-list-item">
      <span>Semana NN</span>

      <div>
        <label>
          <span>Submeta: </span>
          <input 
            type="text" 
            placeholder="Escribe aquí la meta de la semana"
          />
        </label>

        <label>
          <span>Tema: </span>
          <input 
            type="text" 
            placeholder="Relaciona el tema en el que te vas a enfocar esta semana"
          />
        </label>
        
        <ItemsList />
      </div>
    </article>
  );
}

export { SemanaList };