import React from "react";
import useLocalStorage from "./useLocalStorage";

export default function useCronograma(){
  const [save, setSave] = useLocalStorage("Cronograma", []);
  const [startWeek, setStartWeek] = useLocalStorage("Start",""); //2026-01-24

  const [cronograma, setCronograma] = React.useState(save);
  const nextId = React.useRef();

  if (nextId.current === undefined) {
    nextId.current = cronograma.reduce((max, item) => Math.max(max, item.id ?? 0), 0) + 1;
  }

  React.useEffect(()=>{
    setSave(cronograma);
  },[cronograma]);

  const addCronograma =  (item)=>{
    setCronograma([
      ...cronograma,
      {...item, id: nextId.current++}
    ]);
  };

  const rmLastCronograma = ()=>{
    setCronograma(
      cronograma.slice(0, -1)
    );
  };

  const editCronograma = (edit)=>{
    setCronograma(
      cronograma.map(item =>
        item.id === edit.id ? edit : item
      )
    );
  }

  return {
    cronograma,
    addCronograma,
    editCronograma,
    rmLastCronograma
  };
}