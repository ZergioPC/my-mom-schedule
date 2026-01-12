import React from "react";
import { ItemsList } from "../../Components/ItemsList";

function PlanSemanal(){
  return(
    <>
      <h1>Planeador Semanal</h1>
      <main>
        <section>
          <h2>Tareas del Hogar</h2>
          <ItemsList></ItemsList>
        </section>
        <section>
          <h2>Tareas Academicas</h2>
          <ItemsList></ItemsList>
        </section>
        <section>
          <h2>Tareas Laborales</h2>
          <ItemsList></ItemsList>
        </section>
        <section>
          <h2>Tareas de Ocio</h2>
          <ItemsList></ItemsList>
        </section>
      </main>
    </>
  );
}

export { PlanSemanal };