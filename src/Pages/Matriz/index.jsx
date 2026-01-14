import "./Matriz.css";

import { useState } from "react";

import { MatrixQuadrant } from "../../Components/MatrixQuadrant";
import { MatrixItem } from "../../Components/MatrixItem";

import useMatrizCtx from "../../Hooks/useMatrizCtx";

function Matriz(){
  const {
    matriz,
    moveItem,
    rmUrgencia,
    rmNoUrgencia,
    rmImportant,
    rmNoImportant,
    addToQuadrant,
  } = useMatrizCtx();

  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);
  const [newItemText, setNewItemText] = useState('');
  const [pendingItems, setPendingItems] = useState([]);
  const [nextId, setNextId] = useState(1);

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
    <div className="Matriz">
      <aside className="Matriz-aside">
        <h2>Agregar Items</h2>
        
        <form onSubmit={handleCreateItem}>
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Escribe la tarea..."
          />
          <button type="submit">Agregar</button>
        </form>

        <div>
            {pendingItems.length === 0 ? (
              <p>Escribe, crea y arrastra las tareas</p>
            ) : (<ul>{
              pendingItems.map(item => (
                <MatrixItem
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
      <main className="Matriz-main">
        <h1>Matriz Eisenhower</h1>

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
            onDelete={rmUrgencia}
            className="matriz-sec matriz-sec-1"
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
            onDelete={rmNoUrgencia}
            className="matriz-sec matriz-sec-2"
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
            onDelete={rmImportant}
            className="matriz-sec matriz-sec-3"
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
            onDelete={rmNoImportant}
            className="matriz-sec matriz-sec-4"
          />
        </section>
      </main>
    </div>
  );
}

export { Matriz };