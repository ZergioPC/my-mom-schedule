import useLocalStorage from "./useLocalStorage";

export default function useCronograma(){
  const [cronograma, setCronograma] = useLocalStorage("Cronograma", []);

  const addCronograma =  (item)=>{
    setCronograma(prev => {
      const id = prev.reduce((max, week) => Math.max(max, week.id ?? 0), 0) + 1;
      return [...prev, {...item, id}];
    });
  };

  const rmLastCronograma = ()=>{
    setCronograma(prev => prev.slice(0, -1));
  };

  const editCronograma = (edit)=>{
    setCronograma(prev => prev.map(item =>
      item.id === edit.id ? edit : item
    ));
  }

  return {
    cronograma,
    addCronograma,
    editCronograma,
    rmLastCronograma
  };
}
