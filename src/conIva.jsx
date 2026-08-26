import { Outlet, Link } from "react-router-dom";
import './index.css';



export default function Lista_conIva() {
  return (
    <div className="layout-app">
      {/* Encabezado de Navegación */}
      <header className="header-panel">
        <h2>Panel principal</h2>
        <nav className="nav-panel">
          <Link to="/">Generador de Facturas</Link>
          <Link to="/conIVA">Facturas con IVA</Link>
          <Link to="/sinIVA">Facturas sin IVA</Link>
        </nav>
      </header>
    </div>
  );
}