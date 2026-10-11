import React from "react";
import { differenceInCalendarWeeks, startOfWeek } from "date-fns";

import useLocalStorage from "./useLocalStorage";
import { dayTypes, matrizTypes, timeTypes } from "./useManageData";

// Arrastra automáticamente las tareas incompletas de las semanas ya pasadas
// del cronograma hacia la semana siguiente, reiniciando su posición en el
// planeador (day/time) y en la matriz (matriz).
export default function useCronogramaRollover(){
  const [cronograma, setCronograma] = useLocalStorage("Cronograma", []);
  const [startWeek] = useLocalStorage("Start", "");

  React.useEffect(()=>{
    if (!startWeek || cronograma.length === 0) return;

    const base = startOfWeek(new Date(startWeek), { weekStartsOn: 0 });
    const today = startOfWeek(new Date(), { weekStartsOn: 0 });
    const currentId = differenceInCalendarWeeks(today, base);
    if (currentId <= 0) return;

    setCronograma(prev => {
      const pastWeeks = [...prev]
        .filter(week => typeof week?.id === "number" && week.id < currentId)
        .sort((a, b) => a.id - b.id);

      if (pastWeeks.length === 0) return prev;

      let next = prev;
      let hasChanges = false;

      const getWeek = (id) => next.find(week => week.id === id) ?? null;
      const setWeek = (id, updater) => {
        next = next.map(week => week.id === id ? updater(week) : week);
      };

      for (const past of pastWeeks) {
        const source = getWeek(past.id);
        if (!source || source.rolled) continue;

        const incomplete = (source.tareas ?? []).filter(t => t.complete !== true);

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
          hasChanges = true;
        }

        setWeek(source.id, week => ({ ...week, rolled: true }));
        hasChanges = true;
      }

      return hasChanges ? next : prev;
    });
  }, [cronograma, startWeek, setCronograma]);
}