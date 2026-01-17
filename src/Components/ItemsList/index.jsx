import React from "react";
import "./ItemsList.css";

function ItemsList({ children, message }){
  const items = React.Children.toArray(children)
  
  return items.length === 0 ? (
    <p className="ItemsList-p">{message ?? "No hay tareas aun..."}</p>
  ) : (
    <ul className="ItemsList">
      {items}
    </ul>
  );
}

export { ItemsList };