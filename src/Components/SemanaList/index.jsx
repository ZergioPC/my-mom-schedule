import React from "react";
import "./SemanaList.css"

function SemanaList({ children, className = "", size = 1, day, time, onDrop }) {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const childsArray = React.Children.toArray(children);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    // Only set to false if we're leaving the container itself, not a child
    if (e.currentTarget === e.target) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const taskId = parseInt(e.dataTransfer.getData('text/plain'));
    onDrop && onDrop(taskId, day, time);
  };

  return (
    <div 
      className={
        "SemanaList SemanaList-" + className + (isDragOver ? ' drag-over' : '')
      }
      style={{ 
        gridRow: `span ${size}`,
        minHeight: '60px'
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {childsArray.length === 0 ? (
        <p className="ItemsList-p">No hay tareas aun...</p>
      ) : (
        <ul className="ItemsList">
          {childsArray}
        </ul>
      )}
    </div>
  );
}

export { SemanaList };