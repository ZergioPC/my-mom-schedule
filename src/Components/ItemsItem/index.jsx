import React from "react";
import "./ItemsItem.css"

function ItemsItem({ id, text, onDelete, onEdit, emoji}){
  const [value, setValue] = React.useState("");
  const [isEditable, setIsEditable] = React.useState(true);
  const [complete, setComplete] = React.useState(false);

  return isEditable ?(
    <div className="ItemsItem ItemsItem-edit">
      <span>✏️</span>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)} 
      />
      <button
        onClick={()=> {
          onEdit(id, value);
          setIsEditable(false);
        }}
      >+</button>
    </div>
  ) : (
    <div 
      className={(
        complete ? "ItemsItem-complete" : "ItemsItem-idle"
      ) + " ItemsItem"}
    >
      <div>{emoji}</div>
      <button
        onClick={()=> setComplete(!complete)}
      >V</button>
      <p>{text}</p>
      <button
        onClick={()=> setIsEditable(true)}
      >ed</button>
      <button
        onClick={()=> onDelete(id)}
      >-</button>
    </div>
  );
}

export { ItemsItem };