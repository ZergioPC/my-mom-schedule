import "./CronogramaModal.css";

import { useState } from "react";
import { Modal } from "../Modal";

function CronogramaModal({ onSave, onClose }) {
  const [submeta, setSubmeta] = useState("");
  const [tema, setTema] = useState("");
  const [tareas, setTareas] = useState([{ txt: "" }]);

  const addTarea = () => {
    setTareas(prev => [...prev, { txt: "" }]);
  };

  const updateTarea = (index, value) => {
    setTareas(prev =>
      prev.map((t, i) =>
        i === index ? { txt: value } : t
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // REQUIRED

    if (!submeta.trim() || !tema.trim()) return;

    onSave({
      submeta,
      tema,
      tareas: tareas.filter(t => t.txt.trim() !== "")
    });
    
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="CronogramaModal">
        <h2>Agrega una nueva semana</h2>
        <form onSubmit={handleSubmit} className="CronogramaModal-form">
          <input
            type="text"
            placeholder="Submeta para esta semana..."
            value={submeta}
            onChange={e => setSubmeta(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Tema de la semana..."
            value={tema}
            onChange={e => setTema(e.target.value)}
            required
          />

          <div className="CronogramaModal-tareas">
            <h3>Tareas <i>(opcional)</i></h3>
            {tareas.map((tarea, index) => (
              <div key={index} className="CronogramaModal-tareas-item">
                <input
                  type="text"
                  placeholder={`Tarea ${index + 1}`}
                  value={tarea.txt}
                  onChange={e => updateTarea(index, e.target.value)}
                />
              </div>
            ))}
            <button 
              type="button"
              onClick={addTarea}
            >
              + Añadir tarea
            </button>
          </div>

          <div className="CronogramaModal-actions">
            <button type="submit">Guardar</button>
            <button 
              type="button" 
              onClick={onClose}
              className="button-red"
            >Cancelar</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export { CronogramaModal };
