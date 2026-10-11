import { useCallback, useSyncExternalStore } from "react";

/**
 * Almacén de estado compartido por clave de localStorage.
 *
 * Cada clave tiene una única fuente de verdad (store.value) y un conjunto
 * de suscriptores. Así, múltiples componentes que usan la misma clave
 * comparten el mismo estado en lugar de mantener copias independientes.
 */
const stores = new Map();

function readStoredValue(key, fallback) {
  if (typeof window === "undefined") return fallback;

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : fallback;
  } catch {
    // Valor corrupto o localStorage no disponible: usamos el respaldo.
    return fallback;
  }
}

function createStore(key, initialValue) {
  let value = readStoredValue(key, initialValue);
  const listeners = new Set();

  const getSnapshot = () => value;

  const subscribe = (listener) => {
    listeners.add(listener);

    // Sincroniza cambios hechos en otras pestañas/ventanas.
    const onStorage = (event) => {
      if (event.key !== key || event.storageArea !== window.localStorage) return;

      try {
        value = event.newValue !== null ? JSON.parse(event.newValue) : initialValue;
      } catch {
        value = initialValue;
      }
      listeners.forEach((notify) => notify());
    };

    window.addEventListener("storage", onStorage);

    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        window.removeEventListener("storage", onStorage);
      }
    };
  };

  const setValue = (next) => {
    value = typeof next === "function" ? next(value) : next;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Fallo silencioso: cuota excedida, modo incógnito o localStorage deshabilitado.
    }

    listeners.forEach((notify) => notify());
  };

  return { getSnapshot, subscribe, setValue };
}

function getStore(key, initialValue) {
  let store = stores.get(key);
  if (!store) {
    store = createStore(key, initialValue);
    stores.set(key, store);
  }
  return store;
}

/**
 * useLocalStorage
 *
 * Hook que sincroniza un estado compartido con localStorage. Todas las
 * instancias que usen la misma clave comparten el mismo valor y se
 * actualizan mutuamente de forma reactiva.
 *
 * @param {string} key - Clave bajo la cual se guarda el valor en localStorage.
 * @param {*} initialValue - Valor inicial usado si no existe nada en localStorage.
 *
 * @returns {[any, Function]} Valor de estado y su función actualizadora,
 * con la misma API que useState.
 */
function useLocalStorage(key, initialValue) {
  const store = getStore(key, initialValue);

  const value = useSyncExternalStore(store.subscribe, store.getSnapshot);
  const setValue = useCallback((next) => store.setValue(next), [store]);

  return [value, setValue];
}

export default useLocalStorage;
