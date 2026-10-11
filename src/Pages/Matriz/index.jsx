import "./Matriz.css";

import { useState } from "react";

import { MatrixQuadrant } from "../../Components/MatrixQuadrant";
import { MatrixItem } from "../../Components/MatrixItem";

import { useManageData, matrizTypes } from "../../Hooks/useManageData";

function Matriz() {
  const {
    tareas,
    editTareaMatriz,
  } = useManageData();

  const [draggedItem, setDraggedItem] = useState(null);

  // Filter tasks by matriz type
  const pendingItems = tareas.filter(tarea => tarea.matriz === matrizTypes.none);
  const urgenteItems = tareas.filter(tarea => tarea.matriz === matrizTypes.urgente);
  const noUrgenteItems = tareas.filter(tarea => tarea.matriz === matrizTypes.noUrgente);
  const importanteItems = tareas.filter(tarea => tarea.matriz === matrizTypes.importante);
  const noImportanteItems = tareas.filter(tarea => tarea.matriz === matrizTypes.noImportante);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, toQuadrant) => {
    e.preventDefault();
    if (draggedItem) {
      // Map quadrant name to matrizTypes
      const quadrantToMatrizType = {
        'pending': matrizTypes.none,
        'urgente': matrizTypes.urgente,
        'noUrgente': matrizTypes.noUrgente,
        'importante': matrizTypes.importante,
        'noImportante': matrizTypes.noImportante,
      };

      const newMatrizType = quadrantToMatrizType[toQuadrant];
      
      // Update the task's matriz property
      editTareaMatriz(draggedItem.id, newMatrizType);
      
      setDraggedItem(null);
    }
  };

  const handleDeleteItem = (itemId) => {
    // Set matriz back to none (pending)
    editTareaMatriz(itemId, matrizTypes.none);
  };

  return (
    <div className="Matriz">
      <aside className="Matriz-aside">
        <h2>Items Pendientes</h2>

        <div>
          {pendingItems.length === 0 ? (
            <p>No hay tareas pendientes</p>
          ) : (
            <ul>
              {pendingItems.map(item => (
                <MatrixItem
                  key={item.id}
                  item={item}
                  quadrant="pending"
                  onDragStart={handleDragStart}
                  showDelete={false}
                  onDelete={handleDeleteItem}
                />
              ))}
            </ul>
          )}
        </div>
      </aside>
      <main className="Matriz-main">
        <h1>Matriz Eisenhower</h1>

        <section className="matriz-table">
          <h2 className="matriz-title matriz-title-1">Urgente</h2>
          <MatrixQuadrant
            items={urgenteItems}
            quadrant="urgente"
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDelete={handleDeleteItem}
            className="matriz-sec matriz-sec-1"
          />

          <h2 className="matriz-title matriz-title-2">No Urgente</h2>
          <MatrixQuadrant
            items={noUrgenteItems}
            quadrant="noUrgente"
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDelete={handleDeleteItem}
            className="matriz-sec matriz-sec-2"
          />

          <h2 className="matriz-title matriz-title-3">Importante</h2>
          <MatrixQuadrant
            items={importanteItems}
            quadrant="importante"
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDelete={handleDeleteItem}
            className="matriz-sec matriz-sec-3"
          />

          <h2 className="matriz-title matriz-title-4">No Importante</h2>
          <MatrixQuadrant
            items={noImportanteItems}
            quadrant="noImportante"
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDelete={handleDeleteItem}
            className="matriz-sec matriz-sec-4"
          />
        </section>
      </main>
    </div>
  );
}

export { Matriz };