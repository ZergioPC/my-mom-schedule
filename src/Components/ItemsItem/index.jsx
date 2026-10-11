import React from "react";
import "./ItemsItem.css"

function ItemsItem({ id, text, onDelete, onEdit}){
  const [value, setValue] = React.useState(text);
  const [isEditable, setIsEditable] = React.useState(text.length === 0);

  React.useEffect(() => {
    setValue(text);
  }, [text]);

  const handleSave = () => {
    onEdit(id, value);
    setIsEditable(false);
  };

  return (
    <li className="ItemsItem">
      {isEditable ? (
        <div className="ItemsItem-edit">
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)} 
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="ItemsItem-idle">
          <p>{text}</p>
          <div className="ItemsItem-actions">
            <button
              aria-label="Editar tarea"
              onClick={() => setIsEditable(true)}
            >✏️</button>
            <button
              className="red-btn"
              aria-label="Eliminar tarea"
              onClick={() => onDelete(id)}
            >🗑️</button>
          </div>
        </div>
      )}
    </li>
  );
}

export { ItemsItem };