import "./Matriz.css";

import React from "react";
import { ItemsList } from "../../Components/ItemsList";

function Matriz(){
  return(
    <>
      <h1>Matriz Eisenhower</h1>

      <main>
        <div className="matriz-table">
          <h2 className="matriz-title matriz-title-1">Urgente</h2>
          <section className="matriz-sec matriz-sec-1">
            <ItemsList />
          </section>
          <h2  className="matriz-title matriz-title-2">No Urgente</h2>
          <section className="matriz-sec matriz-sec-2">
            <ItemsList />
          </section>
          <h2  className="matriz-title matriz-title-3">Importante</h2>
          <section className="matriz-sec matriz-sec-3">
            <ItemsList />
          </section>
          <h2  className="matriz-title matriz-title-4">No Importante</h2>
          <section className="matriz-sec matriz-sec-4">
            <ItemsList />
          </section>
        </div>
      </main>
    </>
  );
}

export { Matriz };