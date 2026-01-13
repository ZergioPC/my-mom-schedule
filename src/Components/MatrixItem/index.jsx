import React from "react";
import "./MatrixItem.css";

function MatrixItem({ item, quadrant, onDragStart, onDelete }) {
  const [check, setCheck] = React.useState(false);

  return (
    <li
      draggable
      onDragStart={(e) => onDragStart(e, item, quadrant)}
      className="MatrixItem"
    >
      <input 
        type="checkbox"
        checked={check}
        onChange={e => setCheck(e.target.checked)}
      />
      <p>{item.txt}</p>
      <button
          onClick={() => onDelete(item.id)}
        >
          ✕
        </button>
    </li>
  );
}

export { MatrixItem };