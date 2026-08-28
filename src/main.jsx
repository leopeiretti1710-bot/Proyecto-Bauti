import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route , Navigate } from "react-router-dom";
import Lista_facturas from './Principal.jsx';
import Lista_conIva from './conIva.jsx';
import Layout from './Layout.jsx';
import Lista_sinIva from './sinIva.jsx';

const rout = createRoot(document.getElementById('root'));
rout.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element ={<Layout />}>
        <Route index element={<Navigate to="/lista_facturas" replace />} />
        <Route path="lista_facturas" element={<Lista_facturas />} />
        <Route path="conIVA" element={<Lista_conIva />}  />
        <Route path="sinIVA" element={<Lista_sinIva />}  />
      </Route>
    </Routes>
  </BrowserRouter>
)
