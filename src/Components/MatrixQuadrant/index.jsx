import React from "react";
import { MatrixItem } from "../MatrixItem";
import "./MatrixQuadrant.css";

function MatrixQuadrant({ 
  items, 
  quadrant, 
  onDragStart, 
  onDrop, 
  onDragOver,
  onDelete,
  className
}) {
  return (
    <section
      onDrop={(e) => onDrop(e, quadrant)}
      onDragOver={onDragOver}
      className={`MatrixQuadrant ${className}`}
    >
      <ul>
        {items.map((item, idx) => (
          <MatrixItem
            key={idx}
            item={item}
            quadrant={quadrant}
            onDragStart={onDragStart}
            onDelete={onDelete}
            showDelete={true}
          />
        ))}
      </ul>
    </section>
  );
}

export { MatrixQuadrant };