import React from "react";
import { MatrixItem } from "../MatrixItem";

function MatrixQuadrant({ 
  items, 
  quadrant, 
  onDragStart, 
  onDrop, 
  onDragOver,
  className
}) {
  return (
    <section
      onDrop={(e) => onDrop(e, quadrant)}
      onDragOver={onDragOver}
      className={className + " matriz-sec"}
    >
      <ul>
        {items.map((item, idx) => (
          <MatrixItem
            key={idx}
            item={item}
            quadrant={quadrant}
            onDragStart={onDragStart}
            showDelete={false}
          />
        ))}
      </ul>
    </section>
  );
}

export { MatrixQuadrant };