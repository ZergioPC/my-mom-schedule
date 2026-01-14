import React from "react";
import useLocalStorage from "./useLocalStorage";

export default function useCronograma(){
  const [save, setSave] = useLocalStorage("Cronograma", []);
  const [startWeek, setStartWeek] = useLocalStorage("Start",""); //2026-01-24

  const [cronograma, setCronograma] = React.useState(save);
  const [counter, setCounter] = React.useState(cronograma.length + 1 || 1);

  React.useEffect(()=>{
    setSave(cronograma);
  },[cronograma]);

  const addCronograma =  (item)=>{
    setCronograma([
      ...cronograma,
      {...item, id: counter}
    ]);
    setCounter(prev=> prev + 1);
  };

  const rmLastCronograma = ()=>{
    setCronograma(
      cronograma.slice(0, -1)
    );

    setCounter(prev=> prev - 1);
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