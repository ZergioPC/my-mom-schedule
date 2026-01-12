import React from 'react';

// Custom hook (your provided code)
const matrizInit = {
  urgente: [],
  noUrgente: [],
  importante: [],
  noImportante: [],
}

export default function useMatrizCtx(initCtx) {
  const [matriz, setMatriz] = React.useState(initCtx || matrizInit);

  const addUrgencia = (item) => {
    setMatriz({
      ...matriz,
      urgente: [...matriz.urgente, item]
    });
  }

  const rmUrgencia = (itemId) => {    
    setMatriz({
      ...matriz,
      urgente: matriz.urgente.filter(item => item.id !== itemId)
    });
    console.log(matriz.urgente);
  }

  const addNoUrgencia = (item) => {
    setMatriz({
      ...matriz,
      noUrgente: [...matriz.noUrgente, item]
    });
  }

  const rmNoUrgencia = (itemId) => {
    setMatriz({
      ...matriz,
      noUrgente: matriz.noUrgente.filter(item => item.id !== itemId)
    });
  }

  const addImportant = (item) => {
    setMatriz({
      ...matriz,
      importante: [...matriz.importante, item]
    });
  }

  const rmImportant = (itemId) => {
    setMatriz({
      ...matriz,
      importante: matriz.importante.filter(item => item.id !== itemId)
    });
  }

  const addNoImportant = (item) => {
    setMatriz({
      ...matriz,
      noImportante: [...matriz.noImportante, item]
    });
  }

  const rmNoImportant = (itemId) => {
    setMatriz({
      ...matriz,
      noImportante: matriz.noImportante.filter(item => item.id !== itemId)
    });
  }

  // Additional helper method to move items between quadrants
  const moveItem = (item, fromQuadrant, toQuadrant) => {
    if (fromQuadrant === toQuadrant) return;

    // Use a single setState to avoid stale state issues
    setMatriz(prevMatriz => ({
      ...prevMatriz,
      [fromQuadrant]: prevMatriz[fromQuadrant].filter(i => i.id !== item.id),
      [toQuadrant]: [...prevMatriz[toQuadrant], item]
    }));
  };


  const addToQuadrant = (item, quadrant) => {
    const addMap = {
      urgente: addUrgencia,
      noUrgente: addNoUrgencia,
      importante: addImportant,
      noImportante: addNoImportant,
    };
    addMap[quadrant](item);
  };

  return {
    matriz,
    addUrgencia,
    addNoUrgencia,
    addImportant,
    addNoImportant,
    rmUrgencia,
    rmNoUrgencia,
    rmImportant,
    rmNoImportant,
    moveItem,
    addToQuadrant,
  };
}