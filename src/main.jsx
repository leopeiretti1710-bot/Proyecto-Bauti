import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route , useOutletContext} from "react-router-dom";
import Lista_facturas from './Principal.jsx';
import Lista_conIva from './conIva.jsx';

const rout = createRoot(document.getElementById('root'));
rout.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" >
      <Route index element={<Lista_facturas />} />
      <Route path="lista_facturas" element={<Lista_facturas />}  />
        <Route path="conIVA" element={<Lista_conIva />}  />
      </Route>
    </Routes>
  </BrowserRouter>
)
