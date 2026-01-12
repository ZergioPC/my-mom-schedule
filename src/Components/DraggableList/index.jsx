import React from "react";

function DraggableList({ handleDrop, itemsDrop, addMethod }){
  return (
    <ul
      onDragOver={e => e.preventDefault()}
      onDrop={e => handleDrop(e, addMethod)}
    >
      {itemsDrop.map( item => (
        <li key={item.id}>{item.txt}</li>
      ))}
    </ul>
  );
}

export { DraggableList };