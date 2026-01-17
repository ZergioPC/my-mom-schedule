import React from "react";
import "./SemanaList.css"

function SemanaList({children, size, className}){   
  const childsArray = React.Children.toArray(children);

  return (
    <div 
      className={"SemanaList SemanaList-"+className}
    >
      {childsArray.length === 0 ? (
        <p className="ItemsList-p">No hay tareas aun...</p>
      ) : (
        <ul className="ItemsList">
          {childsArray}
        </ul>
      )}
    </div>
  );
}

export { SemanaList };