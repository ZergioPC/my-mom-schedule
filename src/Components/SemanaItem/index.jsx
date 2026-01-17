import React from "react";

function SemanaItem({ text, id, onDragStart }) {
  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id.toString());
    onDragStart && onDragStart(id);
  };

  return (
    <li
      draggable="true"
      className="Semana-item"
      onDragStart={handleDragStart}
    >
      {text}
    </li>
  );
}

export { SemanaItem };