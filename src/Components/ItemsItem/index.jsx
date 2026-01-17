import React from "react";
import "./ItemsItem.css"

function ItemsItem({ id, text, onDelete, onEdit}){
  const [value, setValue] = React.useState(text);
  const [isEditable, setIsEditable] = React.useState(text.length === 0);

  const handleSave = () => {
    onEdit(id, value);
    setIsEditable(false);
  };

  return (
    <div className="ItemsItem">
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
            <button onClick={() => setIsEditable(true)}>✏️</button>
            <button className="red-btn" onClick={() => onDelete(id)}>🗑️</button>
          </div>
        </div>
      )}
    </div>
  );
}

export { ItemsItem };