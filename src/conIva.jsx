import { Outlet, Link } from "react-router-dom";
import './index.css';
import useState from "react";


export default function Lista_conIva() {
  return (
    <div className="layout-app">
      <header className="header-panel">
        <h1>Panel Principal</h1>
        <nav className="nav-panel">
          <Link to="/">Generador de Facturas</Link>
          <Link to="/conIVA">Facturas con IVA</Link>
          <Link to="/sinIVA">Facturas sin IVA</Link>
        </nav>
      </header>
    </div>

  );
}