import React from "react";

function DraggableItem({ item, quadrant, onDragStart, showDelete, onDelete }) {
  return (
    <li
      draggable
      onDragStart={(e) => onDragStart(e, item, quadrant)}
    >
      <p>{item.txt}</p>
      {showDelete && (
        <button
          onClick={() => onDelete(item.id)}
        >
          ✕
        </button>
      )}
    </li>
  );
}

export { DraggableItem };