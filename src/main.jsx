import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Lista_facturas from './Principal.jsx';
import Lista_conIva from './conIva.jsx';

const rout = createRoot(document.getElementById('root'));
rout.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element ={<Lista_facturas/>}/>
    </Routes>
    <Routes>
      <Route path='/conIVA' element ={<Lista_conIva/>}/>
    </Routes>
  </BrowserRouter>
)
