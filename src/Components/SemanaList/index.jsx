import React from "react";
import "./SemanaList.css"

function SemanaList({items, size, className}){   
  return (
    <div className={"SemanaList SemanaList-"+className}>
      {items.length === 0 ? (
        <p className="ItemsList-p">No hay tareas aun...</p>
      ) : (
        <ul className="ItemsList">
          {items.map((item,idx) => (<li key={idx}>uwu</li>))}
        </ul>
      )}
    </div>
  );
}

export { SemanaList };