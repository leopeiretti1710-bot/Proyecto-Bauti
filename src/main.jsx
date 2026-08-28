import { createRoot } from 'react-dom/client'
import {useState} from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lista_facturas from './Principal.jsx';
import Lista_conIva from './conIva.jsx';
const  [lista , setLista] = useState([]);

const rout = createRoot(document.getElementById('root'));
rout.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Lista_facturas />} context = {[lista , setLista]}>
        <Route path="conIVA" element={<Lista_conIva />} context = {[lista , setLista]} />
      </Route>
    </Routes>
  </BrowserRouter>
)
