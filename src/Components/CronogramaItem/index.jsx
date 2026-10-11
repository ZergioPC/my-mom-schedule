import React from "react";
import "./CronogramaItem.css";
import { dayTypes, matrizTypes, timeTypes } from "../../Hooks/useManageData";

function CronogramaItem({ item, counter, onEdit }){
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedItem, setEditedItem] = React.useState(item);

  const handleSave = () => {
    onEdit(editedItem);
    setIsEditing(false);
  };

  React.useEffect(()=>{
    setEditedItem(item)
  },[item, isEditing]);

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
          </>
        ) : (
          <>
            <p><strong>Meta de la Semana:</strong> {item.submeta}</p>
            <p><strong>Tema:</strong> {item.tema}</p>
          </>
        )}
        <div className="CronogramaItem-tareas">
          <ul>
            {isEditing ? (
              editedItem.tareas.map((tarea, idx) =>
                <li key={tarea.id ?? idx}>
                  <input 
                    type="text"
                    value={editedItem.tareas[idx].txt}
                    onChange={(e)=> setEditedItem({
                      ...editedItem,
                      tareas: editedItem.tareas.map((prev, i)=>
                        idx === i ? {...prev ,txt: e.target.value} : prev
                      )
                    })}
                  />
                  <button
                    className="red-btn"
                    aria-label="Eliminar objetivo"
                    onClick={()=> setEditedItem({
                      ...editedItem,
                      tareas: editedItem.tareas.filter((prev, i)=>
                        idx !== i 
                      )
                    })}
                  >🗑️</button>
                </li>
              )
            ) : (
              item.tareas.map((tarea, idx) =>
                <li key={tarea.id ?? idx} className={tarea.complete ? "item-Complete" : ""}>
                  <input 
                    type="checkbox"
                    checked={tarea.complete ?? false}
                    onChange={()=> onEdit(
                      {
                        ...item, 
                        tareas: item.tareas.map((prev, i)=>
                          idx === i ? {...prev, complete: !prev.complete} : prev
                        )
                      }
                    )}
                  />
                  <p>{tarea.txt}</p>
                </li>
              )
            )}
          </ul>
          {isEditing && (
            <button 
              onClick={()=> setEditedItem(
                {
                  ...editedItem, 
                  tareas:[
                    ...editedItem.tareas,
                    {
                      id: editedItem.tareas.reduce(
                        (max, t) => Math.max(max, t.id ?? 0), 0
                      ) + 1,
                      txt: "",
                      complete: false,
                      day: dayTypes.none,
                      time: timeTypes.none,
                      matriz: matrizTypes.none,
                    },
                  ]
                }
              )}
            >Agregar Objetivo</button>
          )}
        </div>
        {isEditing && (<button onClick={handleSave}>Save</button>)}
      </div>
      <button 
        className="CronogramaItem-btn"
        onClick={() => setIsEditing(!isEditing)}
      >{isEditing ? 'Cancel' : 'Edit'}
      </button>
    </article>
  );
}

export { CronogramaItem };