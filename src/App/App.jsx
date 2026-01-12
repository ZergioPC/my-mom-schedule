import './App.css'

import { HashRouter, Routes, Route } from 'react-router-dom'

import { Header } from '../Components/Header';
import { Home } from '../Pages/Home';
import { Matriz } from '../Pages/Matriz';
import { PlanSemanal } from '../Pages/PlanSemanal';


const rutas = [
  {to: "/", text: "Home"},
  {to: "/matriz", text: "Matriz"},
  {to: "/plan-semana", text: "Planeador Semanal"},
];

// Agregar Horario

function App() {
  return (
    <HashRouter>
      <Header rutas={rutas} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/matriz' element={<Matriz />} />
        <Route path='/plan-semana' element={<PlanSemanal />} />
      </Routes>
    </HashRouter>
  )
}

export default App
