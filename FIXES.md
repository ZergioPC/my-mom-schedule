# Auditoría del proyecto `organizador-mom`

Revisé todo `src/`, configs, CI y lockfiles. Resumen por severidad.

## Bugs / correctness

- **HTML inválido**: `ItemsList` renderiza `<ul>` pero los hijos son `<div>` (`ItemsItem`). `src/Components/ItemsList/index.jsx:10` + `ItemsItem/index.jsx:14`.
- **`key={idx}` en todas las listas** (`Home`, `Tareas`, `MatrixQuadrant`, `Cronograma`, `CronogramaItem`). Con estado local editable por item (`ItemsItem`, `CronogramaItem`), borrar/reordenar asigna el estado de edición al item equivocado. Usar `item.id`.
- **`ItemsItem` no sincroniza** su `value` local cuando cambia la prop `text` (`src/Components/ItemsItem/index.jsx:5-6`).
- **`WeekPicker`** ignora la prop `date`, el `<input type="date">` no es controlado (sin `value`), y el comentario dice "Monday" pero `weekStartsOn: 0` es domingo (`WeekPicker/index.jsx:8-9`). `idMatchToWeek` usa el mismo criterio.
- **`Modal` ignora `onClose`**: no hay cierre por backdrop ni Escape (`Modal/index.jsx:4`), aunque `CronogramaModal` se lo pasa.
- **`Cronograma`** persiste meta/inicio con efectos atados al toggle de edición en vez de al guardar, y no hay cancel que revierta (`Cronograma/index.jsx:31-37`).
- **Typo persistente `acaademia`** en todo `usePlanSemanal.jsx` (init, add/edit/rm).
- **`matrizTypes` duplicado** localmente en `src/Pages/Matriz/index.jsx:14-20` en vez de importar de `useManageData`. Además `useMatrizCtx` es store muerto: ninguna página lo usa (`App` lo importa y no usa `matriz`).
- **Inconsistencia de centinelas**: `dayTypes.none=-1`, `matrizTypes.none=0`, pero `CronogramaModal` usa `null` (`CronogramaModal/index.jsx:11`).
- **Rutas/casing**: `to: "/Tareas"` con mayúscula vs el resto en minúscula (`App.jsx:20,37`). Además el repo es `organizador-mom`, `homepage` apunta a `my-mom-schedule` y `base:"/my-mom-schedule/"`.

## Lint y malas prácticas

`npx eslint .` → **13 errores, 6 warnings**:
- Unused: `useState` y `matriz` (`App.jsx:3,26`), `date` (`WeekPicker`), `startWeek/setStartWeek` (`useCronograma`), `error` en ambos catch (`useLocalStorage`), `draggedFrom` (`Matriz`), `setSizes` (`PlanSemanal`), `setMeta/metaValue/setMetaValue` (`Tareas`).
- `no-constant-binary-expression` en `useManageData:36`.
- Warnings `exhaustive-deps` en los hooks y páginas (efectos con deps faltantes).
- Botones de emoji (✏️/🗑️/✕) sin `aria-label` (accesibilidad).
- Sin tests ni script `test`; `README` aún dice `npm install` pese a la migración.