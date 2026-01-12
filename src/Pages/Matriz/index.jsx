import "./Matriz.css";

import { useState } from "react";

import { DraggableList } from "../../Components/DraggableList";
import { DraggableItem } from "../../Components/DraggableItem";

import useMatrizCtx from "../../Hooks/useMatrizCtx";

const AUXTASK = [
  {id:1, txt: "prueba 1"},
  {id:2, txt: "prueba 2"},
  {id:3, txt: "prueba 3"},
]

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
          <DraggableItem
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

function Matriz(){
  const {
    matriz,
    moveItem,
    addToQuadrant,
  } = useMatrizCtx();

  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);
  const [newItemText, setNewItemText] = useState('');
  const [pendingItems, setPendingItems] = useState(AUXTASK);
  const [nextId, setNextId] = useState(3);

  const handleDragStart = (e, item, quadrant) => {
    setDraggedItem(item);
    setDraggedFrom(quadrant);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, toQuadrant) => {
    e.preventDefault();
    if (draggedItem && draggedFrom) {
      if (draggedFrom === 'pending') {
        // Moving from sidebar to matrix
        addToQuadrant(draggedItem, toQuadrant);
        setPendingItems(pendingItems.filter(item => item.id !== draggedItem.id));
      } else {
        // Moving between quadrants
        moveItem(draggedItem, draggedFrom, toQuadrant);
      }
      setDraggedItem(null);
      setDraggedFrom(null);
    }
  };

  const handleCreateItem = (e) => {
    e.preventDefault();
    if (newItemText.trim()) {
      const newItem = {
        id: nextId,
        txt: newItemText.trim()
      };
      setPendingItems([...pendingItems, newItem]);
      setNextId(nextId + 1);
      setNewItemText('');
    }
  };

  const handleDeletePendingItem = (itemId) => {
    setPendingItems(pendingItems.filter(item => item.id !== itemId));
  };

  return (
    <div>
      <h1>
        Matriz Eisenhower
      </h1>
      
      <main>
        <section className="matriz-table">
          <h2 
            className="matriz-title matriz-title-1"
          >Urgente</h2>
          <MatrixQuadrant
            items={matriz.urgente}
            quadrant="urgente"
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={"matriz-sec-1"}
          />

          <h2 
            className="matriz-title matriz-title-2"
          >No Urgente</h2>
          <MatrixQuadrant
            items={matriz.noUrgente}
            quadrant="noUrgente"
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={"matriz-sec-2"}
          />

          <h2 
            className="matriz-title matriz-title-3"
          >Importante</h2>
          <MatrixQuadrant
            items={matriz.importante}
            quadrant="importante"
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={"matriz-sec-3"}
          />

          <h2 
            className="matriz-title matriz-title-4"
          >No Importante</h2>
          <MatrixQuadrant
            items={matriz.noImportante}
            quadrant="noImportante"
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={"matriz-sec-4"}
          />
        </section>
      </main>

      <aside>
        <h2>Agregar Items</h2>
        
        <form onSubmit={handleCreateItem}>
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Escribe la tarea..."
          />
          <button type="submit">Add Item</button>
        </form>

        <div>
          <p>Arrastra las tareas</p>
            {pendingItems.length === 0 ? (
              <p>No pending items</p>
            ) : (<ul>{
              pendingItems.map(item => (
                <DraggableItem
                  key={item.id}
                  item={item}
                  quadrant="pending"
                  onDragStart={handleDragStart}
                  showDelete={true}
                  onDelete={handleDeletePendingItem}
                />
              ))}
            </ul>)}
        </div>
      </aside>
    </div>
  );
}

export { Matriz };