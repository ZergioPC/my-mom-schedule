import React from "react";
import "./ItemsList.css";

function ItemsList({ children }){
  const items = React.Children.toArray(children)
  
  return items.length === 0 ? (
    <p className="ItemsList-p">No hay tareas aun...</p>
  ) : (
    <ul className="ItemsList">
      {items}
    </ul>
  );
}

export { ItemsList };