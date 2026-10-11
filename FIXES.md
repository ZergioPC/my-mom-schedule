# Auditoría del proyecto `organizador-mom`

Revisé todo `src/`, configs, CI y lockfiles. Resumen por severidad.

## Críticos (bugs reales / rompen funcionalidad)

**1. Colisión de IDs en `useManageData`** — `src/Hooks/useManageData.jsx:36-40,42-53`
El contador se deriva de `tareas.length + 1` (y el `?? 1` es código muerto, lint lo marca). Si borras una tarea intermedia y agregas otra, se reutiliza un ID existente.
Ej: `[id 1,2,3]` → borras `2` → `[1,3]` → `length+1 = 3` → nueva tarea `id=3` duplica. Al editar/borrar por id se afectan ambas tareas. `useCronograma.jsx:9,23-29` tiene el mismo patrón con `counter--`.

**2. CI de deploy roto** — `.github/workflows/deploy.yml`
Usa `npm ci` y `cache: npm`, pero el repo migró a pnpm (`c0ef519`) y **no existe `package-lock.json` ni `yarn.lock`** (solo `pnpm-lock.yaml`). El job de build fallará. Hay que usar `pnpm/action-setup` + `pnpm install --frozen-lockfile` (o mantener un lockfile npm).

**3. El Home no refleja la semana actual tras montar** — `src/Pages/Home/index.jsx:41-45`
`useEffect(..., [])` sin dependencias: solo corre al montar, ignora cambios de `startWeek`/`cronograma`. Además `cronograma.find(...)` puede devolver `undefined` → `setCurrent(undefined)` guarda la cadena `"undefined"` en localStorage (verifiqué que `JSON.parse("undefined")` lanza). Y con `startWeek=""`, `new Date("")` es `Invalid Date`, así que nunca hace match hasta setear el inicio.

**4. Arquitectura de estado duplicado (raíz de muchos bugs)**
`useLocalStorage` mantiene un `useState` propio por instancia. `useManageData`, `usePlanSemanal`, `useMatrizCtx` y `useCronograma` crean copias independientes del **mismo key**. Cada página y `App`/`Header` montan instancias distintas que solo se sincronizan por localStorage y se refrescan al remontar. Consecuencias: datos desincronizados, sobrescrituras y pérdida de actualizaciones. Debería ser un Context/store único, o el nombre "Ctx" es engañoso.

**5. Error de tipeo en grid** — `src/Pages/PlanSemanal/index.jsx:110`
Pasa `size={sizes.after}` pero `sizes_init` define `afternoon` → `gridRow: "span undefined"`. Debe ser `sizes.afternoon`.

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

## Plan de corrección propuesto

1. **Datos/IDs**: cambiar el contador a `useRef`/incremento persistido y usar `Date.now()`+seq o mantener un `nextId` en localStorage, evitando derivar de `length`. Corregir en `useManageData` y `useCronograma`.
2. **CI**: actualizar `deploy.yml` a pnpm.
3. **Home**: deps correctas, manejar `undefined` en `find`, validar `startWeek` antes de `idMatchToWeek`.
4. **Estado compartido**: introducir un `DataProvider` (Context) o `useSyncExternalStore` para unificar tareas/matriz/semanal/cronograma.
5. **Fixes puntuales**: `sizes.afternoon`, `key={item.id}`, `ItemsItem` con `<li>`, sincronizar `value`, `Modal` con cierre, typo `acaademia`, unificar `matrizTypes`, centinelas.
6. **Lint**: corregir los 13 errores y warnings; añadir `pnpm lint` en CI.