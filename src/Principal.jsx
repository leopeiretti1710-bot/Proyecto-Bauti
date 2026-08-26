import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import './index.css';

export default function Lista_facturas() {
  const [lista, setLista] = useState([]);
  const [Factura, setFactura] = useState({ id: 0, Emision: "", Vencimiento: "", Metodopago: "", IVA: "" });

  const unica_funcion_cambio = (event) => {
    const nombreDelInput = event.target.name;
    setFactura({ ...Factura, [nombreDelInput]: event.target.value });
  };

  const handlechange_submit = (event) => {
    event.preventDefault();
    setLista([...lista, Factura]);
    setFactura({ ...Factura, id: Factura.id + 1 });
  };

  const handleChange_eliminar = (id) => {
    const nuevaLista = lista.filter((item) => item.id !== id);
    setLista(nuevaLista);
  };


  return (
    <div className="layout-app">
      {/* Encabezado de Navegación */}
      <header className="header-panel">
        <h2>Panel principal</h2>
        <nav className="nav-panel">
          <Link to="/principal">Generador de Facturas</Link>
          <Link to="/conIVA">Facturas con IVA</Link>
          <Link to="/sinIVA">Facturas sin IVA</Link>
        </nav>
      </header>

      {/* Título Principal debajo del Navegador */}
      <h1 className="titulo-seccion">GENERADOR DE FACTURAS</h1>

      {/* Grid Principal: 2 Columnas */}
      <div className="grid-principal">
        {/* Columna Izquierda: Cuadro con la Lista */}
        <section className="tarjeta-box lista-container">
          <h2 className="titulo-tarjeta">Lista de Facturas</h2>
          <div className="lista-items">
            {lista.length === 0 ? (
              <p className="texto-vacio">No hay facturas generadas todavía.</p>
            ) : (
              lista.map((item) => (
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
        </section>

        {/* Columna Derecha: Cuadro con el Formulario */}
        <section className="tarjeta-box formulario-container">
          <form onSubmit={handlechange_submit}>
            <label htmlFor="emision">Escribí Fecha de Emisión:</label>
            <input id="emision" type="date" onChange={unica_funcion_cambio} name="Emision" required />

            <label htmlFor="vencimiento">Escribí Fecha de Vencimiento:</label>
            <input id="vencimiento" type="date" onChange={unica_funcion_cambio} name="Vencimiento" required />

            <label htmlFor="nombre">Escribí nombre del cliente:</label>
            <input id="nombre" type="text" onChange={unica_funcion_cambio} name="nombre" required />

            <label htmlFor="domicilio">Escribí Domicilio del cliente:</label>
            <input id="domicilio" type="text" onChange={unica_funcion_cambio} name="Domicilio" required />

            <label htmlFor="dni">Escribí DNI del cliente:</label>
            <input id="dni" type="number" onChange={unica_funcion_cambio} name="dni" required />

            <div className="select-group">
              <label>Elija si incluye IVA:</label>
              <select onChange={unica_funcion_cambio} name="IVA" value={Factura.IVA}>
                <option value="">-</option>
                <option value="SI">SI</option>
                <option value="NO">NO</option>
              </select>
            </div>


            <div className="select-group">
              <label>Elija metodo de pago: </label>
              <select onChange={unica_funcion_cambio} name="Metodopago" value={Factura.Metodopago}>
                <option value="">-</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Credito">Crédito</option>
                <option value="Debito">Débito</option>
              </select>
            </div>

            <button type="submit" className="btn-submit">Agregar producto</button>
          </form>
        </section>
      </div>

      <Outlet />
    </div>
  );
}