import React from "react";

export default function useCronograma(initData){
  const [cronograma, setCronograma] = React.useState(initData || []);

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