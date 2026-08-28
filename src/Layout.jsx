import {useState} from "react"
import { Outlet, Link } from "react-router-dom";
import './index.css';

export default function Layout() {
    const [lista, setLista] = useState([]);

    return (
        <div className="layout-app">
            <header className="header-panel">
                <h2>Nutribox</h2>
                <nav className="nav-panel">
                    <Link to="/lista_facturas">Generador de Facturas</Link>
                    <Link to="/conIVA">Facturas con IVA</Link>
                    <Link to="/sinIVA">Facturas sin IVA</Link>
                </nav>
            </header>
            <Outlet context={[lista , setLista]} />
        </div>
    );
}