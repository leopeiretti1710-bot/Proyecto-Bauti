import {  useOutletContext } from "react-router-dom";
import './index.css';



export default function Lista_sinIva() {
  const [lista] = useOutletContext();
  const lista_sinIva = lista.filter((item) => item.IVA === "NO");

  return (
    <div className="layout-app">
      <h1 className="titulo-seccion">LISTA DE FACTURAS SIN IVA</h1>

      <div className="lista-items">
            {lista_sinIva.length === 0 ? (
              <p className="texto-vacio">No hay facturas generadas todavía.</p>
            ) : (
              lista_sinIva.map((item) => (
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