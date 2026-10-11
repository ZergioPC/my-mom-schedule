import React from "react";
import "./MatrixItem.css";

function MatrixItem({ item, quadrant, onDragStart, onDelete, showDelete }) {
  return (
    <li
      draggable
      onDragStart={(e) => onDragStart(e, item, quadrant)}
      className="MatrixItem"
    >
      <p>{item.txt}</p>
      {showDelete && (
        <button
          className="MatrixItem-delete"
          aria-label="Quitar de la matriz"
          onClick={() => onDelete(item.id)}
        >
          ✕
        </button>
      )}
    </li>
  );
}

export { MatrixItem };