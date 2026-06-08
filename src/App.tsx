import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ProductListingPage from './pages/ProductListingPage';
import CheckoutPage from './pages/CheckoutPage';
import './styles/GlobalStyles.css';

const App: React.FC = () => (
  <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<ProductListingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  </CartProvider>
);
export default App;
