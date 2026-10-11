import useLocalStorage from "./useLocalStorage";

const semanalInit = {
  hogar: [],
  academia: [],
  laboral: [],
}

export default function usePlanSemanal(){
  const [semanal, setSemanal] = useLocalStorage("Semanal", semanalInit);

  const updateList = (key, updater) =>
    setSemanal(prev => ({ ...prev, [key]: updater(prev[key] ?? []) }));

  // MARK: Hogar
  const addHogar = (item)=> updateList("hogar", list => [...list, item]);

  const editHogar = (id, text)=> updateList("hogar", list =>
    list.map(item => item.id === id ? {...item, txt: text} : item)
  );

  const rmHogar = (itemId)=> updateList("hogar", list =>
    list.filter(item => item.id !== itemId)
  );

  // MARK: Academia
  const addAcademia = (item)=> updateList("academia", list => [...list, item]);

  const editAcademia = (id, text)=> updateList("academia", list =>
    list.map(item => item.id === id ? {...item, txt: text} : item)
  );

  const rmAcademia = (itemId)=> updateList("academia", list =>
    list.filter(item => item.id !== itemId)
  );

  // MARK: Laboral
  const addLaboral = (item)=> updateList("laboral", list => [...list, item]);

  const editLaboral = (id, text)=> updateList("laboral", list =>
    list.map(item => item.id === id ? {...item, txt: text} : item)
  );

  const rmLaboral = (itemId)=> updateList("laboral", list =>
    list.filter(item => item.id !== itemId)
  );

  return {
    semanal,
    addHogar, editHogar, rmHogar,
    addAcademia, editAcademia, rmAcademia,
    addLaboral, editLaboral, rmLaboral
  };
}
