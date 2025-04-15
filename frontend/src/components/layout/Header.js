import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { FiShoppingCart, FiMenu, FiX, FiSearch, FiUser, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import MiniCart from './MiniCart';
import { AnimatedButton, dropdownVariants } from '../../components/ui';
import './Header.css';

const Header = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const { getItemCount } = useContext(CartContext);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const cartRef = useRef(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  
  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setMiniCartOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Fake search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      // Mock data for demonstration
      const mockResults = [
        { id: 1, name: 'Black T-Shirt', category: 'Clothing' },
        { id: 2, name: 'Blue Jeans', category: 'Clothing' },
        { id: 3, name: 'Leather Wallet', category: 'Accessories' },
        { id: 4, name: 'Smart Watch', category: 'Electronics' }
      ].filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(mockResults);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-elevated py-2' : 'bg-white/95 py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-dark hover:text-primary transition-colors">
              E-Commerce Store
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-dark hover:text-primary font-medium transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-dark hover:text-primary font-medium transition-colors">
              Products
            </Link>
            <Link to="/categories" className="text-dark hover:text-primary font-medium transition-colors">
              Categories
            </Link>
            <Link to="/deals" className="text-dark hover:text-primary font-medium transition-colors">
              Deals
            </Link>
          </nav>
          
          {/* Actions: Search, Cart, User */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <AnimatedButton 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-dark hover:text-primary rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Search"
              >
                <FiSearch className="w-5 h-5" />
              </AnimatedButton>
              
              {/* Search dropdown */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-dropdown overflow-hidden"
                  >
                    <div className="p-2">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="form-control pr-10"
                          autoFocus
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <FiSearch className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                      
                      {searchResults.length > 0 && (
                        <div className="mt-2 max-h-60 overflow-y-auto">
                          {searchResults.map(result => (
                            <Link
                              key={result.id}
                              to={`/products/${result.id}`}
                              className="block px-4 py-2 hover:bg-gray-100 rounded transition-colors"
                              onClick={() => setSearchOpen(false)}
                            >
                              <div className="font-medium">{result.name}</div>
                              <div className="text-sm text-gray-500">{result.category}</div>
                            </Link>
                          ))}
                        </div>
                      )}
                      
                      {searchQuery && searchResults.length === 0 && (
                        <div className="px-4 py-2 text-sm text-gray-500">
                          No results found
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Cart */}
            <div className="relative" ref={cartRef}>
              <AnimatedButton
                onClick={() => setMiniCartOpen(!miniCartOpen)}
                className="p-2 text-dark hover:text-primary rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Shopping cart"
              >
                <FiShoppingCart className="w-5 h-5" />
                {getItemCount() > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                  >
                    {getItemCount()}
                  </motion.div>
                )}
              </AnimatedButton>
              
              {/* Mini Cart Dropdown */}
              <AnimatePresence>
                {miniCartOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-dropdown z-10 overflow-hidden"
                  >
                    <MiniCart onClose={() => setMiniCartOpen(false)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <AnimatedButton
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                    {user.firstName?.charAt(0) || <FiUser />}
                  </div>
                  <FiChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </AnimatedButton>
                
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-dropdown z-10 overflow-hidden"
                    >
                      <div className="py-1">
                        <div className="px-4 py-2 text-sm text-gray-500">
                          Hello, {user.firstName}
                        </div>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-dark hover:bg-gray-100 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm text-dark hover:bg-gray-100 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          My Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-dark hover:bg-gray-100 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <AnimatedButton onClick={() => navigate('/login')} className="btn btn-outline text-sm py-1.5">
                  Login
                </AnimatedButton>
                <AnimatedButton onClick={() => navigate('/register')} className="btn btn-primary text-sm py-1.5">
                  Register
                </AnimatedButton>
              </div>
            )}
            
            {/* Mobile menu button */}
            <AnimatedButton
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </AnimatedButton>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <nav className="py-4 flex flex-col space-y-2">
                <Link 
                  to="/" 
                  className="px-4 py-2 text-dark hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/products" 
                  className="px-4 py-2 text-dark hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  to="/categories" 
                  className="px-4 py-2 text-dark hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link 
                  to="/deals" 
                  className="px-4 py-2 text-dark hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Deals
                </Link>
                
                {!isAuthenticated && (
                  <div className="flex flex-col space-y-2 mt-4 px-4">
                    <Link 
                      to="/login" 
                      className="btn btn-outline w-full text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      className="btn btn-primary w-full text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;