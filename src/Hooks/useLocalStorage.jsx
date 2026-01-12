import { useState, useEffect } from "react";

/**
 * useLocalStorage
 *
 * Hook personalizado de React que sincroniza un estado
 * con el almacenamiento local del navegador (localStorage).
 *
 * @param {string} key - Clave bajo la cual se guarda el valor en localStorage.
 * @param {*} initialValue - Valor inicial usado si no existe nada en localStorage.
 *
 * @returns {[any, Function]} Retorna un valor de estado y su función actualizadora,
 * con la misma API que useState.
 */
function useLocalStorage(key, initialValue) {
  /**
   * Inicializa el estado de forma diferida para evitar
   * acceder a localStorage durante el renderizado del servidor (SSR).
   */
  const [value, setValue] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue !== null
        ? JSON.parse(storedValue)
        : initialValue;
    } catch (error) {
      // Si ocurre un error al leer o parsear el valor,
      // se utiliza el valor inicial como respaldo.
      return initialValue;
    }
  });

  /**
   * Cada vez que la clave o el valor cambian,
   * se persiste el nuevo valor en localStorage.
   */
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Fallo silencioso:
      // - cuota de almacenamiento excedida
      // - modo incógnito
      // - localStorage deshabilitado
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;