import React from "react";

import useLocalStorage from "./useLocalStorage";

const matrizTypes = {
  none: 0,
  urgente: 1,
  noUrgente: 2,
  importante: 3,
  noImportante: 4,
}

const dayTypes = {
  none: -1,
  lunes: 0,
  martes: 1,
  miercoles: 2,
  jueves: 3,
  viernes: 4,
  sabado: 5,
  domingo: 6,
}

// tarea: {id, txt, complete, day, matriz}
function useManageData(){
  const [meta, setMeta] = useLocalStorage("Organizador-Meta","");
  const [tareas, setTareas] = useLocalStorage("Organizador-Tareas",[])
  const [counter, setCounter] = React.useState(tareas.length + 1 ?? 1);

  const newTarea = ()=>{
    setTareas([...tareas, 
      {id:counter, txt:"", complete:false, day:dayTypes.none, matriz:matrizTypes.none}
    ]);
    setCounter([prev => prev + 1]);
  }

  const rmTarea = (id)=>{
    setTareas(tareas.filter(item => item.id !== id));
  }

  const editTareaValue = (id,value)=>{
    setTareas(tareas.map(item =>(
      item.id === id ? {...item, txt:value} : item
    )))
  }

  const editTareaMatriz = (id, value)=>{
    setTareas(tareas.map(item =>(
      item.id === id ? {...item, matriz:value} : item
    )))
  }

  const editTareaDay = (id, value)=>{
    setTareas(tareas.map(item =>(
      item.id === id ? {...item, day:value} : item
    )))
  }

  return {
    meta, setMeta,
    tareas,
    newTarea, rmTarea,
    editTareaDay, editTareaMatriz, editTareaValue
  }
}

export { useManageData, dayTypes, matrizTypes };