import React from "react";
import useLocalStorage from "./useLocalStorage";

export default function useCronograma(){
  const [save, setSave] = useLocalStorage("Cronograma", []);
  const [cronograma, setCronograma] = React.useState(save);

  React.useEffect(()=>{
    setSave(cronograma);
  },[cronograma]);

  const addCronograma =  (item)=>{
    setCronograma([
      ...cronograma,item
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