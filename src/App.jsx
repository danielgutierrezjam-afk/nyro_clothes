import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ProductDetail from './ProductDetail';
import Productos from './Productos';
import Ayuda from './Ayuda';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductDetail />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/ayuda" element={<Ayuda />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
