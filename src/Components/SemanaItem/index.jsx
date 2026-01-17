import React from "react";
import "./SemanaItem.css"

function SemanaItem({ text, id, onDragStart, complete, onComplete }) {
  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id.toString());
    onDragStart && onDragStart(id);
  };

  return (
    <li
      draggable="true"
      className={"SemanaItem " + (complete ? "complete": "")}
      onDragStart={handleDragStart}
    >
      <span className="SemanaItem-decoration">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx}></div>
        ))}
      </span>
      <p>{text}</p>
      {onComplete && (
        <input 
          type="checkbox"
          checked={complete}
          onChange={()=> onComplete(id)}
        />
      )}
    </li>
  );
}

export { SemanaItem };