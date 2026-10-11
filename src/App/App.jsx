import './App.css'

import { Routes, Route } from 'react-router-dom'

import { Header } from '../Components/Header';
import { Home } from '../Pages/Home';
import { Matriz } from '../Pages/Matriz';
import { PlanSemanal } from '../Pages/PlanSemanal';
import { Cronograma } from '../Pages/Cronograma';
import { Historial } from '../Pages/Historial';
import useCronogramaRollover from '../Hooks/useCronogramaRollover';

const rutas = [
  {to: "/", text: "Home"},
  {to: "/matriz", text: "Matriz"},
  {to: "/semana", text: "Planeador"},
  {to: "/cronograma", text: "Cronograma"},
  {to: "/historial", text: "Historial"},
];

//Agregar Horario

function App() {
  useCronogramaRollover();

  return (
    <>
      <Header rutas={rutas} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/matriz' element={<Matriz />} />
        <Route path='/semana' element={<PlanSemanal />} />
        <Route path='/cronograma' element={<Cronograma />} />
        <Route path='/historial' element={<Historial />} />
      </Routes>
    </>
  )
}

export default App;