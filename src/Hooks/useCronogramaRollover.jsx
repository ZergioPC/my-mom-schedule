import React from "react";
import { differenceInCalendarWeeks, startOfWeek } from "date-fns";

import useLocalStorage from "./useLocalStorage";
import { dayTypes, matrizTypes, timeTypes } from "./useManageData";

// Procesa una pasada: mueve las tareas incompletas de las semanas pasadas a la
// siguiente semana (reiniciando posición en planeador/matriz) y recolecta las
// tareas completadas como candidatas al historial.
function rolloverOnce(cronograma, currentId) {
  let next = cronograma;
  let changed = false;
  const moved = [];
  const history = [];

  if (currentId <= 0) return { next, changed, moved, history };

  const pastWeeks = [...next]
    .filter(week => typeof week?.id === "number" && week.id < currentId)
    .sort((a, b) => a.id - b.id);

  const getWeek = (id) => next.find(week => week.id === id) ?? null;
  const setWeek = (id, updater) => {
    next = next.map(week => week.id === id ? updater(week) : week);
  };

  for (const past of pastWeeks) {
    const source = getWeek(past.id);
    if (!source || source.rolled) continue;

    const tareas = source.tareas ?? [];
    const incomplete = tareas.filter(t => t.complete !== true);
    const completed = tareas.filter(t => t.complete === true);

    if (incomplete.length > 0) {
      const targetId = source.id + 1;
      let target = getWeek(targetId);
      if (!target) {
        target = { id: targetId, submeta: "", tema: "", tareas: [] };
        next = [...next, target];
      }

      const maxTareaId = (target.tareas ?? []).reduce(
        (max, t) => Math.max(max, t.id ?? 0), 0
      );

      const rolledTareas = incomplete.map((tarea, i) => ({
        ...tarea,
        id: maxTareaId + i + 1,
        complete: false,
        day: dayTypes.none,
        time: timeTypes.none,
        matriz: matrizTypes.none,
      }));

      setWeek(targetId, week => ({
        ...week,
        tareas: [...(week.tareas ?? []), ...rolledTareas],
      }));
      moved.push({ from: source.id, to: targetId, texts: incomplete.map(t => t.txt) });
      changed = true;
    }

    if (completed.length > 0) {
      completed.forEach(tarea => history.push({
        srcId: source.id,
        txt: tarea.txt,
        createdWeek: tarea.createdWeek ?? source.id,
        completedWeek: source.id,
      }));
      changed = true;
    }

    setWeek(source.id, week => ({ ...week, rolled: true }));
    changed = true;
  }

  return { next, changed, moved, history };
}

// Arrastra automáticamente las tareas incompletas de las semanas ya pasadas
// del cronograma hacia la semana siguiente, avisa con un alert() de las tareas
// movidas y archiva las tareas completadas en el historial.
export default function useCronogramaRollover(){
  const [cronograma, setCronograma] = useLocalStorage("Cronograma", []);
  const [startWeek] = useLocalStorage("Start", "");
  const [, setHistorial] = useLocalStorage("Organizador-Historial", []);

  React.useEffect(()=>{
    if (!startWeek || cronograma.length === 0) return;

    const base = startOfWeek(new Date(startWeek), { weekStartsOn: 0 });
    const today = startOfWeek(new Date(), { weekStartsOn: 0 });
    const currentId = differenceInCalendarWeeks(today, base);

    let current = cronograma;
    let changedAll = false;
    const movedAll = [];
    const historyAll = [];

    let guard = 0;
    while (guard++ < 60) {
      const { next, changed, moved, history } = rolloverOnce(current, currentId);
      if (!changed) break;
      current = next;
      changedAll = true;
      movedAll.push(...moved);
      historyAll.push(...history);
    }

    if (!changedAll) return;

    setCronograma(current);

    if (historyAll.length > 0) {
      const entries = historyAll.map(({ txt, createdWeek, completedWeek }) => ({
        txt,
        createdWeek,
        completedWeek,
      }));
      setHistorial(prev => [...prev, ...entries]);
    }

    if (movedAll.length > 0) {
      const destByTxt = new Map();
      for (const { to, texts } of movedAll) {
        for (const txt of texts) destByTxt.set(txt || "(sin nombre)", to);
      }
      const lines = [...destByTxt.entries()]
        .map(([txt, to]) => `- ${txt} → Semana ${String(to).padStart(2, "0")}`)
        .sort();
      window.alert(`Tareas no realizadas movidas a la siguiente semana:\n\n${lines.join("\n")}`);
    }
  }, [cronograma, startWeek, setHistorial, setCronograma]);
}