import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './components/pages/Home/HomePage';
import ProductsPage from './components/pages/Product/ProductsPage';
import ProductDetailPage from './components/pages/Product/ProductDetailPage';
import CartPage from './components/pages/Cart/CartPage';
import CheckoutPage from './components/pages/Checkout/CheckoutPage';
import LoginPage from './components/pages/Auth/LoginPage';
import RegisterPage from './components/pages/Auth/RegisterPage';
import ProfilePage from './components/pages/Auth/ProfilePage';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;