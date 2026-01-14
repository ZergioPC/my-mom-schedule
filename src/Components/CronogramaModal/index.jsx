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
      <form onSubmit={handleSubmit} className="CronogramaModal">
        <h2>Agrega una nueva semana</h2>

        <section>
          <label>
            <span>Submeta :</span>
            <input
              placeholder="Submeta para esta semana..."
              value={submeta}
              onChange={e => setSubmeta(e.target.value)}
              required
            />
          </label>
        </section>

        <section>
          <label>
            <span>Tema: </span>
            <input
              placeholder="Tema de la semana..."
              value={tema}
              onChange={e => setTema(e.target.value)}
              required
            />
          </label>
        </section>

        <section className="CronogramaModal-tareas">
          <h3>Tareas</h3>

          {tareas.map((tarea, index) => (
            <input
              key={index}
              placeholder={`Tarea ${index + 1}`}
              value={tarea.txt}
              onChange={e => updateTarea(index, e.target.value)}
            />
          ))}

          <button 
            type="button"
            onClick={addTarea}
          >+</button>
        </section>

        <div>
          <button type="submit"
          >Save</button>
          <button type="button" onClick={onClose}
          >close
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { CronogramaModal };
