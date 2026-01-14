import React from "react";
import "./CronogramaItem.css";

function CronogramaItem({ item, counter, onEdit }){
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedItem, setEditedItem] = React.useState(item);

  const handleSave = () => {
    onEdit(editedItem);
    setIsEditing(false);
  };

  return(
    <article className="CronogramaItem">
      <h3>Semana {String(counter).padStart(2,"0")}</h3>
      <div className="CronogramaItem-body">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedItem.submeta}
              onChange={(e) => setEditedItem({...editedItem, submeta: e.target.value})}
              placeholder="Submeta"
            />
            <input
              type="text"
              value={editedItem.tema}
              onChange={(e) => setEditedItem({...editedItem, tema: e.target.value})}
              placeholder="Tema"
            />
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <p><strong>Submeta:</strong> {item.submeta}</p>
            <p><strong>Tema:</strong> {item.tema}</p>
          </>
        )}
        
        {item.tareas.length > 0 && (
          <ul className="CronogramaItem-tareas">
            {item.tareas.map((tarea, idx) =>
              <li key={idx}>{tarea.txt}</li>
            )}
          </ul>
        )}
      </div>
      {/* <button 
        className="CronogramaItem-btn"
        onClick={() => setIsEditing(!isEditing)}
      >{isEditing ? 'Cancel' : 'Edit'}
      </button> */}
    </article>
  );
}

export { CronogramaItem };