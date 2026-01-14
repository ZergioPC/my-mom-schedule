import "./Header.css";
import React from "react";
import { NavLink } from "react-router-dom";

function Header({ rutas }){
  return (
    <header className="Header">
      <h1 className="Header-title">Organizador</h1>
      <nav>
        <ul className="Header-navList">
          {rutas.map( (ruta,i) => (
            <li key={i} className="Header-navLink">
              <NavLink 
                to={ruta.to}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {ruta.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export { Header };