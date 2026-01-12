import React from "react";
import { NavLink } from "react-router-dom";

function Header({ rutas }){
  return (
    <header>
      <span>Organizador</span>
      <nav>
        <ul>
          {rutas.map( (ruta,i) => (
            <li key={i}>
              <NavLink to={ruta.to}>{ruta.text}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export { Header };