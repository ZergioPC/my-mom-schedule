import React from "react";

function SemanaItem({ text }) {
  return (
    <li
    draggable
      className="Semana-item"
      style={{ cursor: 'grab' }}
    >
      {text}
    </li>
  );
}

export { SemanaItem };