import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Context Providers
import { CheckoutProvider } from './context/CheckoutContext';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './components/pages/Home/HomePage';
import ProductsPage from './components/pages/Product/ProductsPage';
import ProductDetailPage from './components/pages/Product/ProductDetailPage';
import CartPage from './components/pages/Cart/CartPage';
import CheckoutPage from './components/pages/Checkout/CheckoutPage';
import OrderConfirmation from './components/pages/Checkout/OrderConfirmation';
import LoginPage from './components/pages/Auth/LoginPage';
import RegisterPage from './components/pages/Auth/RegisterPage';
import ProfilePage from './components/pages/Auth/ProfilePage';
import ForgotPasswordPage from './components/pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/Auth/ResetPasswordPage';
import CategoriesPage from './components/pages/Categories/CategoriesPage';
import DealsPage from './components/pages/Deals/DealsPage';
import FAQPage from './components/pages/Help/FAQPage';
import ShippingPage from './components/pages/Help/ShippingPage';
import ReturnsPage from './components/pages/Help/ReturnsPage';
import PrivacyPolicyPage from './components/pages/Help/PrivacyPolicyPage';
import TermsOfServicePage from './components/pages/Help/TermsOfServicePage';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Hook for future global settings if needed
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={
              <CheckoutProvider>
                <CheckoutPage />
              </CheckoutProvider>
            } />
            <Route path="/checkout/confirmation" element={<OrderConfirmation />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/deals" element={<DealsPage />} />
            
            {/* Help Pages */}
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;