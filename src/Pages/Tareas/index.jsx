import React from "react";
import "./Tareas.css";

import { useManageData } from "../../Hooks/useManageData";

import { ItemsList } from "../../Components/ItemsList";
import { ItemsItem } from "../../Components/ItemsItem";

function Tareas(){
  const {
    tareas, 
    newTarea, rmTarea,
    editTareaValue,
  } = useManageData();

  return (
    <>
      <h1>Tareas</h1>
      <main className="Tareas">
        <section>
          <h2>Tareas</h2>
          <p>Agrega las tareas que debas completar</p>

          <div>
            <ItemsList message={"No hay tareas agregadas"}>
              {tareas.map((item)=> (
                <ItemsItem 
                  key={item.id}
                  id={item.id}
                  text={item.txt}
                  onDelete={rmTarea}
                  onEdit={editTareaValue}
                />
              ))}
            </ItemsList>
            <button
              className="Tareas-btn"
              onClick={()=> newTarea()}
            >Agregar</button>
          </div>
        </section>
      </main>
    </>
  );
}

export { Tareas }; 