import useLocalStorage from './useLocalStorage';

const matrizInit = {
  noAsigned: [],
  urgente: [],
  noUrgente: [],
  importante: [],
  noImportante: [],
}

export default function useMatrizCtx() {
  const [matriz, setMatriz] = useLocalStorage("Matriz", matrizInit);

  const addToQuadrant = (item, quadrant) => {
    setMatriz(prev => ({
      ...prev,
      [quadrant]: [...prev[quadrant], item]
    }));
  }

  const rmFromQuadrant = (itemId, quadrant) => {
    setMatriz(prev => ({
      ...prev,
      [quadrant]: prev[quadrant].filter(item => item.id !== itemId)
    }));
  }

  // Mueve un item de un cuadrante a otro en una sola actualización.
  const moveItem = (item, fromQuadrant, toQuadrant) => {
    if (fromQuadrant === toQuadrant) return;

    setMatriz(prev => ({
      ...prev,
      [fromQuadrant]: prev[fromQuadrant].filter(i => i.id !== item.id),
      [toQuadrant]: [...prev[toQuadrant], item]
    }));
  };

  return {
    matriz,
    addUrgencia: (item) => addToQuadrant(item, "urgente"),
    rmUrgencia: (itemId) => rmFromQuadrant(itemId, "urgente"),
    addNoUrgencia: (item) => addToQuadrant(item, "noUrgente"),
    rmNoUrgencia: (itemId) => rmFromQuadrant(itemId, "noUrgente"),
    addImportant: (item) => addToQuadrant(item, "importante"),
    rmImportant: (itemId) => rmFromQuadrant(itemId, "importante"),
    addNoImportant: (item) => addToQuadrant(item, "noImportante"),
    rmNoImportant: (itemId) => rmFromQuadrant(itemId, "noImportante"),
    moveItem,
    addToQuadrant,
  };
}
