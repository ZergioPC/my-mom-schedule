import './App.css'

import { Routes, Route } from 'react-router-dom'

import { Header } from '../Components/Header';
import { Home } from '../Pages/Home';
import { Matriz } from '../Pages/Matriz';
import { PlanSemanal } from '../Pages/PlanSemanal';
import { Cronograma } from '../Pages/Cronograma';
import { Tareas } from '../Pages/Tareas';

const rutas = [
  {to: "/", text: "Home"},
  {to: "/matriz", text: "Matriz"},
  {to: "/semana", text: "Planeador"},
  {to: "/cronograma", text: "Cronograma"},
  {to: "/tareas", text: "Tareas"},
];

//Agregar Horario

function App() {
  return (
    <>
      <Header rutas={rutas} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/matriz' element={<Matriz />} />
        <Route path='/semana' element={<PlanSemanal />} />
        <Route path='/cronograma' element={<Cronograma />} />
        <Route path='/tareas' element={<Tareas />}/>
      </Routes>
    </>
  )
}

export default App;
