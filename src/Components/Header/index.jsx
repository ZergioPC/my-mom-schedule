import "./Header.css";
import React from "react";
import { NavLink } from "react-router-dom";

function Header({ rutas }){
  return (
    <header className="Header">
      <nav>
        <ul className="Header-navList">
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