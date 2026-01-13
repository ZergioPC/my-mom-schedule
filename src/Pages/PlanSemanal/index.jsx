import React from "react";

import { ItemsList } from "../../Components/ItemsList";
import { ItemsItem } from "../../Components/ItemsItem";

import usePlanSemanal from "../../Hooks/usePlanSemanal";

import "./PlanSemanal.css";

// items: {id:ID, txt:TXT}

function randomIcon(){
  const emojis = ["🌳", "🐣", "🐋"];
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
}

function PlanSemanal(){
  const {
    semanal,
    addAcademia,
    addHogar,
    addLaboral,
    addOcio,
    editAcademia,
    editHogar,
    editLaboral,
    editOcio,
    rmAcademia,
    rmHogar,
    rmLaboral,
    rmOcio
  } = usePlanSemanal();

  const [nextId, setNextId] = React.useState(1);

  const handleCreateItem = (addMethod) => {
    addMethod({id: nextId, txt: ""});
    setNextId(nextId + 1);    
  };

  const emoji = randomIcon();

  return(
    <>
      <h1>Planeador Semanal</h1>
      <main className="PlanSemanal">
        <section>
          <h2>Tareas del Hogar</h2>
          <ItemsList>
            {semanal.hogar.map((item) => 
              <li key={item.id}>
                <ItemsItem
                  id={item.id}
                  text={item.txt} 
                  onDelete={rmHogar}
                  onEdit={editHogar}
                  emoji={emoji}
                />
              </li>
            )}
          </ItemsList>
          <button
            onClick={()=> handleCreateItem(addHogar)}
          >+</button>
        </section>
        <section>
          <h2>Tareas Academicas</h2>
          {semanal.acaademia.map((item) => 
              <li key={item.id}>
                <ItemsItem
                  id={item.id}
                  text={item.txt}
                  onDelete={rmAcademia}
                  onEdit={editAcademia}
                  emoji={emoji}
                />
              </li>
            )}
          <ItemsList></ItemsList>
          <button
            onClick={()=> handleCreateItem(addAcademia)}
          >+</button>
        </section>
        <section>
          <h2>Tareas Laborales</h2>
          <ItemsList>
            {semanal.laboral.map((item) => 
              <li key={item.id}>
                <ItemsItem
                  id={item.id}
                  text={item.txt} 
                  onDelete={rmLaboral}
                  onEdit={editLaboral}
                  emoji={emoji}
                />
              </li>
            )}
          </ItemsList>
          <button
            onClick={()=> handleCreateItem(addLaboral)}
          >+</button>
        </section>
        <section>
          <h2>Tareas de Ocio</h2>
          <ItemsList>
            {semanal.ocio.map((item) => 
              <li key={item.id}>
                <ItemsItem
                  id={item.id}
                  text={item.txt} 
                  onDelete={rmOcio}
                  onEdit={editOcio}
                  emoji={emoji}
                />
              </li>
            )}
          </ItemsList>
          <button
            onClick={()=> handleCreateItem(addOcio)}
          >+</button>
        </section>
      </main>
    </>
  );
}

export { PlanSemanal };