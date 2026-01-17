import React from "react";
import { useManageData } from "../../Hooks/useManageData";
import { ItemsList } from "../../Components/ItemsList";
import { ItemsItem } from "../../Components/ItemsItem";

function Ajustes(){
  const {
    meta, setMeta, tareas, 
    newTarea, rmTarea,
    editTareaValue,
  } = useManageData();
  const [metaValue, setMetaValue] = React.useState(meta);

  return (
    <>
      <h1>Ajustes</h1>
      <main>
        <section>
          <h2>Meta</h2>
          <p>Escribe el proposito actual que tengas</p>
          <div>
            <input
              id="Meta-Value"
              type="text" 
              placeholder="Escribe tu meta..."
              value={metaValue}
              onChange={e => setMetaValue(e.target.value)}
            />
          <button
            type="submit"
            onClick={()=> setMeta(metaValue)}
          >Aceptar</button>
          </div>
        </section>
        
        <section>
          <h2>Tareas</h2>
          <p>Agrega las tareas que debas completar</p>

          <div>
            <ItemsList message={"No hay tareas agregadas"}>
              {tareas.map((item, idx)=> (
                <ItemsItem 
                  key={idx}
                  id={item.id}
                  text={item.txt}
                  onDelete={rmTarea}
                  onEdit={editTareaValue}
                />
              ))}
            </ItemsList>
            <button
              onClick={()=> newTarea()}
            >Agregar</button>
          </div>
        </section>
      </main>
    </>
  );
}

export { Ajustes }; 