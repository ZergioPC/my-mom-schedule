import React from "react";
import "./SemanaItem.css"

function SemanaItem({ text, id, onDragStart }) {
  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id.toString());
    onDragStart && onDragStart(id);
  };

  return (
    <li
      draggable="true"
      className="SemanaItem"
      onDragStart={handleDragStart}
    >
      <span className="SemanaItem-decoration">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx}></div>
        ))}
      </span>
      <p>{text}</p>
    </li>
  );
}

export { SemanaItem };