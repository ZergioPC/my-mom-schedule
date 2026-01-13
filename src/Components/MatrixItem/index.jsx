import React from "react";

function MatrixItem({ item, quadrant, onDragStart, showDelete, onDelete }) {
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

export { MatrixItem };