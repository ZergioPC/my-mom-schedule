import React from "react";
import "./Cronograma.css";

import { CronogramaItem } from "../../Components/CronogramaItem";
import { CronogramaModal } from "../../Components/CronogramaModal";

import useCronograma from "../../Hooks/useCronograma";

//Item: {id:00 ,submeta:"", tema:"", tareas[txt]}

function Cronograma(){
  const {
    cronograma,
    addCronograma,
    editCronograma,
    rmLastCronograma
  } = useCronograma() 

  const [modal,setModal] = React.useState(false);

  return (
    <div className="Cronograma">
      <h1>Planifica tu tiempo</h1>
      <section>
        Meta:
      </section>
      
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