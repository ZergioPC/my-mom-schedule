import useLocalStorage from "./useLocalStorage";
import idMatchToWeek from "../Utils/idMatchToWeek";

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

const timeTypes = {
  none: 0,
  morning: 1,
  midday: 2,
  afternoon: 3,
  night: 4,
}

const normalizeTarea = (tarea) => ({
  ...tarea,
  complete: tarea.complete ?? false,
  day: tarea.day ?? dayTypes.none,
  time: tarea.time ?? timeTypes.none,
  matriz: tarea.matriz ?? matrizTypes.none,
});

// tarea: {id, txt, complete, day, time, matriz}
// Las tareas se leen y modifican siempre sobre la semana actual del cronograma.
function useManageData(){
  const [cronograma, setCronograma] = useLocalStorage("Cronograma", []);
  const [startWeek] = useLocalStorage("Start", "");

  const currentWeek = cronograma.find(item => idMatchToWeek(item, startWeek));
  const tareas = (currentWeek?.tareas ?? []).map(normalizeTarea);

  const editCurrentWeekTareas = (updater)=>{
    setCronograma(prev => {
      const idx = prev.findIndex(item => idMatchToWeek(item, startWeek));
      if (idx === -1) return prev;
      return prev.map((item, i) => (
        i === idx ? {...item, tareas: updater(item.tareas ?? [])} : item
      ));
    });
  }

  const editTareaMatriz = (id, quarter)=>{
    editCurrentWeekTareas(prev => prev.map(item =>(
      item.id === id ? {...item, matriz:quarter} : item
    )))
  }

  const editTareaDay = (id, day, time)=>{
    editCurrentWeekTareas(prev => prev.map(item =>(
      item.id === id ? {...item, day:day, time:time} : item
    )))
  }

  const editTareaComplete = (id)=>{
    editCurrentWeekTareas(prev => prev.map(item =>(
      item.id === id ? {...item, complete: !item.complete} : item
    )))
  }

  return {
    tareas,
    currentWeek,
    editTareaDay, editTareaMatriz,
    editTareaComplete
  }
}

export { useManageData, dayTypes, matrizTypes, timeTypes };