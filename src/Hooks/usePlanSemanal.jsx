import React from "react";

const semanalInit = {
  hogar:[],
  acaademia:[],
  laboral:[],
  ocio:[],
};

export default function usePlanSemanal(initCtx){
  const [semanal,setSemanal] = React.useState(initCtx || semanalInit);

  // MARK: Hogar
  const addHogar = (item)=>{
    setSemanal({
      ...semanal,
      hogar:[...semanal.hogar, item]
    });
  }

  const editHogar = (id, text)=>{
    setSemanal({
      ...semanal,
      hogar: semanal.hogar.map(item =>
        item.id === id ? {...item, txt: text} : item
      )
    });
  }

  const rmHogar = (itemId)=>{
    setSemanal({
      ...semanal,
      hogar: semanal.hogar.filter(item => item.id !== itemId)
    });
  }

  // MARK: Academia
  const addAcademia = (item)=>{
    setSemanal({
      ...semanal,
      acaademia:[...semanal.acaademia, item]
    });
  }

  const editAcademia = (id, text)=>{
    setSemanal({
      ...semanal,
      acaademia: semanal.acaademia.map(item =>
        item.id === id ? {...item, txt: text} : item
      )
    });
  }

  const rmAcademia = (itemId)=>{
    setSemanal({
      ...semanal,
      acaademia: semanal.acaademia.filter(item => item.id !== itemId)
    });
  }

  // MARK: Laboral
  const addLaboral = (item)=>{
    setSemanal({
      ...semanal,
      laboral:[...semanal.laboral, item]
    });
  }

  const editLaboral = (id, text)=>{
    setSemanal({
      ...semanal,
      laboral: semanal.laboral.map(item =>
        item.id === id ? {...item, txt: text} : item
      )
    });
  }

  const rmLaboral = (itemId)=>{
    setSemanal({
      ...semanal,
      laboral: semanal.laboral.filter(item => item.id !== itemId)
    });
  }

  // MARK: Ocio
  const addOcio = (item)=>{
    setSemanal({
      ...semanal,
      ocio:[...semanal.ocio, item]
    });
  }

  const editOcio = (id, text)=>{
    setSemanal({
      ...semanal,
      ocio: semanal.ocio.map(item =>
        item.id === id ? {...item, txt: text} : item
      )
    });
  }

  const rmOcio = (itemId)=>{
    setSemanal({
      ...semanal,
      ocio: semanal.ocio.filter(item => item.id !== itemId)
    });
  }

  return {
    semanal,
    addAcademia,
    addHogar,
    addLaboral,
    addOcio,
    editAcademia,
    editHogar,
    editLaboral,
    editOcio,
    rmAcademia,
    rmHogar,
    rmLaboral,
    rmOcio
  };
}