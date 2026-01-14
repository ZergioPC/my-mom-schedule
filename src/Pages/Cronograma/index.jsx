import React from "react";
import "./Cronograma.css";

import { CronogramaItem } from "../../Components/CronogramaItem";
import { CronogramaModal } from "../../Components/CronogramaModal";

import useCronograma from "../../Hooks/useCronograma";
import useLocalStorage from "../../Hooks/useLocalStorage";

//Item: {id:00 ,submeta:"", tema:"", tareas[txt]}

function Cronograma(){
  const {
    cronograma,
    addCronograma,
    editCronograma,
    rmLastCronograma
  } = useCronograma() 

  const [meta, setMeta] = useLocalStorage("Meta","")
  const [valueMeta, setValueMeta] = React.useState(meta);
  const [editMeta, setEditMeta] = React.useState(meta.length === 0);

  const [modal,setModal] = React.useState(false);

  React.useEffect(()=>{
    setMeta(valueMeta);
  },[editMeta]);

  return (
    <div className="Cronograma">
      <h1>Planifica tu tiempo</h1>
      
      {/* MARK: Meta-Semana */}
      <section className="Cronograma-meta">
        <span>Meta: </span>
        {editMeta ? (
          <>
            <input 
              type="text" 
              value={valueMeta}
              onChange={e => setValueMeta(e.target.value)}
            />
            <button
              onClick={()=> setEditMeta(false)}
            >Ok</button>
          </>
        ) : (
          <>
            <p>{valueMeta}</p>
            <button
              onClick={()=> setEditMeta(true)}
            >Editar</button>
          </>
        )}
      </section>

      <section>
        Semana inicial
      </section>
      

      {/* MARK: Cronograma */}
      <main>
        {cronograma.length === 0 ? (
          <p>Agrega una semana...</p>
        ) : (
          <ol>
            {cronograma.map((item, idx) =>
              <li key={idx}>
                <CronogramaItem 
                  counter={idx + 1}
                  item={item}
                  onEdit={editCronograma}
                />
              </li>
            )}
          </ol>
        )}
      </main>

      <section>
        <button
          onClick={()=> setModal(true)}
        >+</button>
        <button
          onClick={()=> rmLastCronograma()}
        >-</button>
      </section>

      {modal && (
        <CronogramaModal 
          onClose={()=> setModal(false)}
          onSave={addCronograma}
        />
      )}
    </div>
  );
}

export { Cronograma };