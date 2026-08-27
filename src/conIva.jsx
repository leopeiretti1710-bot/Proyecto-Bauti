import { Outlet, Link , useOutletContext } from "react-router-dom";
import './index.css';
import { useState } from "react"; 


export default function Lista_conIva() {
  const lista = useOutletContext();
  const lista_conIva = lista.filter((item) => item.IVA === "SI");

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

      <h1 className="titulo-seccion">LISTA DE FACTURAS CON IVA</h1>

      <div className="lista-items">
            {lista_conIva.length === 0 ? (
              <p className="texto-vacio">No hay facturas generadas todavía.</p>
            ) : (
              lista_conIva.map((item) => (
                <ul key={item.id} className="factura-card">
                  <li><strong>Emisión:</strong> {item.Emision}</li>
                  <li><strong>Vencimiento:</strong> {item.Vencimiento}</li>
                  <li><strong>IVA:</strong> {item.IVA}</li>
                  <li><strong>Metodo de Pago:</strong> {item.Metodopago}</li>
                  <div className="acciones-card">
                    <button type="button" className="btn-eliminar" onClick={() => handleChange_eliminar(item.id)}>Eliminar</button>
                  </div>
                </ul>
              ))
            )}
          </div>
    </div>
  );
}