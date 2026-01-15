import './App.css'

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'

import { Header } from '../Components/Header';
import { Home } from '../Pages/Home';
import { Matriz } from '../Pages/Matriz';
import { PlanSemanal } from '../Pages/PlanSemanal';
import { Cronograma } from '../Pages/Cronograma';

import useMatrizCtx from '../Hooks/useMatrizCtx';

const rutas = [
  {to: "/", text: "Home"},
  {to: "/matriz", text: "Matriz"},
  {to: "/semana", text: "Planeador"},
  {to: "/cronograma", text: "Cronograma"},
];

//Agregar Horario

function App() {
  const { matriz } = useMatrizCtx();

  return (
    <>
      <Header rutas={rutas} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/matriz' element={<Matriz />} />
        <Route path='/semana' element={<PlanSemanal />} />
        <Route path='/cronograma' element={<Cronograma />} />
      </Routes>
    </>
  )
}

export default App;
