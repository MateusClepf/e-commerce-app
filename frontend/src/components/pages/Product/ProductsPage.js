import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiFilter, FiX, FiChevronDown, FiGrid, FiList, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { ProductCardSkeleton } from '../../../components/ui';
import ProductCard from './ProductCard';
import PageTransition from '../../shared/PageTransition';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    sort: 'newest' // newest, price-low-high, price-high-low, popular
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // API URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const PLACEHOLDER_URL = process.env.REACT_APP_PLACEHOLDER_IMAGE_URL || 'https://via.placeholder.com';
  const itemsPerPage = 12;
  
  // Extract filters from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters = { ...filters };
    let hasFilters = false;
    
    if (params.has('category')) {
      newFilters.category = params.get('category');
      hasFilters = true;
    }
    
    if (params.has('minPrice')) {
      newFilters.minPrice = params.get('minPrice');
      hasFilters = true;
    }
    
    if (params.has('maxPrice')) {
      newFilters.maxPrice = params.get('maxPrice');
      hasFilters = true;
    }
    
    if (params.has('rating')) {
      newFilters.rating = params.get('rating');
      hasFilters = true;
    }
    
    if (params.has('sort')) {
      newFilters.sort = params.get('sort');
    }
    
    if (params.has('page')) {
      setCurrentPage(parseInt(params.get('page'), 10));
    } else {
      setCurrentPage(1);
    }
    
    if (params.has('view')) {
      setViewMode(params.get('view'));
    }
    
    setFilters(newFilters);
    setFiltersApplied(hasFilters);
  }, [location.search]);
  
  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const params = new URLSearchParams();
        if (filters.category) params.append('category', filters.category);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        if (filters.rating) params.append('rating', filters.rating);
        params.append('sort', filters.sort);
        params.append('page', currentPage);
        params.append('limit', itemsPerPage);
        
        const url = `${API_URL}/products?${params.toString()}`;
        
        // Simulate API call with delay
        setTimeout(async () => {
          // In a real app, we would use the actual API response
          // Here we're just using mock data
          const mockProducts = Array(24).fill(null).map((_, i) => ({
            id: i + 1,
            name: `Product ${i + 1}`,
            description: 'This is a sample product description that explains the features and benefits of the product.',
            price: (Math.random() * 100 + 10).toFixed(2),
            imageUrl: `${PLACEHOLDER_URL}/300x300?text=Product+${i + 1}`,
            isAvailable: Math.random() > 0.2,
            stockQuantity: Math.floor(Math.random() * 20),
            rating: Math.floor(Math.random() * 5) + 1,
            category: ['Electronics', 'Clothing', 'Footwear', 'Home', 'Accessories'][Math.floor(Math.random() * 5)]
          }));
          
          // Filter products based on URL params
          let filteredProducts = [...mockProducts];
          
          if (filters.category) {
            filteredProducts = filteredProducts.filter(p => p.category === filters.category);
          }
          
          if (filters.minPrice) {
            filteredProducts = filteredProducts.filter(p => parseFloat(p.price) >= parseFloat(filters.minPrice));
          }
          
          if (filters.maxPrice) {
            filteredProducts = filteredProducts.filter(p => parseFloat(p.price) <= parseFloat(filters.maxPrice));
          }
          
          if (filters.rating) {
            filteredProducts = filteredProducts.filter(p => p.rating >= parseInt(filters.rating, 10));
          }
          
          // Sort products
          switch (filters.sort) {
            case 'price-low-high':
              filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
              break;
            case 'price-high-low':
              filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
              break;
            case 'popular':
              filteredProducts.sort((a, b) => b.rating - a.rating);
              break;
            default: // newest
              filteredProducts.sort((a, b) => b.id - a.id);
          }
          
          // Paginate results
          const total = Math.ceil(filteredProducts.length / itemsPerPage);
          setTotalPages(total);
          
          // Ensure currentPage is within valid range
          const validPage = Math.max(1, Math.min(currentPage, total));
          if (validPage !== currentPage) {
            setCurrentPage(validPage);
          }
          
          const start = (validPage - 1) * itemsPerPage;
          const paginatedProducts = filteredProducts.slice(start, start + itemsPerPage);
          
          setProducts(paginatedProducts);
          setLoading(false);
        }, 800); // Simulating network delay
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [API_URL, PLACEHOLDER_URL, filters, currentPage, itemsPerPage]);
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Apply filters to URL
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (filters.category) params.append('category', filters.category);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.rating) params.append('rating', filters.rating);
    params.append('sort', filters.sort);
    params.append('view', viewMode);
    params.append('page', 1); // Reset to first page when applying new filters
    
    navigate(`/products?${params.toString()}`);
    setIsFiltersOpen(false);
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      sort: 'newest'
    });
    navigate('/products');
    setIsFiltersOpen(false);
  };
  
  // Change page
  const handlePageChange = (page) => {
    const params = new URLSearchParams(location.search);
    params.set('page', page);
    navigate(`/products?${params.toString()}`);
  };
  
  // Change view mode
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    const params = new URLSearchParams(location.search);
    params.set('view', mode);
    navigate(`/products?${params.toString()}`);
  };
  
  // Change sort order
  const handleSortChange = (e) => {
    const sort = e.target.value;
    setFilters(prev => ({ ...prev, sort }));
    
    const params = new URLSearchParams(location.search);
    params.set('sort', sort);
    navigate(`/products?${params.toString()}`);
  };
  
  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;
    
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage, endPage;
    
    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const middlePage = Math.floor(maxVisiblePages / 2);
      
      if (currentPage <= middlePage) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + middlePage >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - middlePage;
        endPage = currentPage + middlePage;
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return (
      <div className="flex justify-center mt-8">
        <nav className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-10 h-10 rounded-full 
              ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-dark hover:bg-primary hover:text-white'}`}
            aria-label="Previous page"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          
          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className={`flex items-center justify-center w-10 h-10 rounded-full 
                  ${1 === currentPage ? 'bg-primary text-white' : 'text-dark hover:bg-gray-100'}`}
              >
                1
              </button>
              {startPage > 2 && (
                <span className="flex items-center justify-center w-10 h-10">...</span>
              )}
            </>
          )}
          
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`flex items-center justify-center w-10 h-10 rounded-full 
                ${number === currentPage ? 'bg-primary text-white' : 'text-dark hover:bg-gray-100'}`}
            >
              {number}
            </button>
          ))}
          
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="flex items-center justify-center w-10 h-10">...</span>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`flex items-center justify-center w-10 h-10 rounded-full 
                  ${totalPages === currentPage ? 'bg-primary text-white' : 'text-dark hover:bg-gray-100'}`}
              >
                {totalPages}
              </button>
            </>
          )}
          
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center w-10 h-10 rounded-full 
              ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-dark hover:bg-primary hover:text-white'}`}
            aria-label="Next page"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </nav>
      </div>
    );
  };

  return (
    <PageTransition>
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-dark">{filters.category || 'All Products'}</h1>
              <p className="text-gray-500 mt-1">
                {!loading && `Showing ${products.length} of ${totalPages * itemsPerPage} products`}
              </p>
            </div>
            
            {/* Desktop filters button */}
            <div className="hidden md:flex items-center space-x-4 mt-4 md:mt-0">
              <div className="relative">
                <select
                  value={filters.sort}
                  onChange={handleSortChange}
                  className="form-control pr-8 appearance-none"
                  aria-label="Sort order"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => handleViewModeChange('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-dark hover:bg-gray-100'}`}
                  aria-label="Grid view"
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleViewModeChange('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-dark hover:bg-gray-100'}`}
                  aria-label="List view"
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
              
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className={`flex items-center space-x-1 py-2 px-4 rounded-lg border transition-colors ${filtersApplied ? 'bg-primary text-white border-primary' : 'bg-white text-dark border-gray-300 hover:bg-gray-100'}`}
              >
                <FiFilter className="w-4 h-4" />
                <span>Filters {filtersApplied && '(Active)'}</span>
              </button>
            </div>
            
            {/* Mobile filters button */}
            <div className="flex md:hidden items-center space-x-2 mt-4 w-full">
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className={`flex items-center justify-center space-x-1 py-2 px-4 rounded-lg border transition-colors flex-1 ${filtersApplied ? 'bg-primary text-white border-primary' : 'bg-white text-dark border-gray-300 hover:bg-gray-100'}`}
              >
                <FiFilter className="w-4 h-4" />
                <span>Filters {filtersApplied && '(Active)'}</span>
              </button>
              
              <div className="relative flex-1">
                <select
                  value={filters.sort}
                  onChange={handleSortChange}
                  className="form-control w-full pr-8 appearance-none"
                  aria-label="Sort order"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => handleViewModeChange('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-dark hover:bg-gray-100'}`}
                  aria-label="Grid view"
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleViewModeChange('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-dark hover:bg-gray-100'}`}
                  aria-label="List view"
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Filters panel */}
          {isFiltersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-elevated mb-8 overflow-hidden"
            >
              <div className="p-4 md:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button 
                    onClick={() => setIsFiltersOpen(false)}
                    className="text-gray-500 hover:text-dark"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Category filter */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                      className="form-control"
                    >
                      <option value="">All Categories</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Footwear">Footwear</option>
                      <option value="Home">Home</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                  
                  {/* Price range */}
                  <div>
                    <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
                      Price Range
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        id="minPrice"
                        name="minPrice"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        className="form-control w-1/2"
                        min="0"
                      />
                      <input
                        type="number"
                        id="maxPrice"
                        name="maxPrice"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        className="form-control w-1/2"
                        min="0"
                      />
                    </div>
                  </div>
                  
                  {/* Rating filter */}
                  <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Rating
                    </label>
                    <select
                      id="rating"
                      name="rating"
                      value={filters.rating}
                      onChange={handleFilterChange}
                      className="form-control"
                    >
                      <option value="">Any Rating</option>
                      <option value="5">5 Stars</option>
                      <option value="4">4+ Stars</option>
                      <option value="3">3+ Stars</option>
                      <option value="2">2+ Stars</option>
                      <option value="1">1+ Star</option>
                    </select>
                  </div>
                  
                  {/* Search (future implementation) */}
                  <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                      Search
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="search"
                        placeholder="Search products..."
                        className="form-control pl-10"
                        disabled
                      />
                      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Search functionality coming soon</p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={resetFilters}
                    className="btn btn-outline py-2"
                  >
                    Reset
                  </button>
                  <button
                    onClick={applyFilters}
                    className="btn btn-primary py-2"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Active filters display */}
          {filtersApplied && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-gray-600">Active filters:</span>
              
              {filters.category && (
                <span className="bg-gray-100 text-dark text-sm rounded-full px-3 py-1 flex items-center">
                  Category: {filters.category}
                </span>
              )}
              
              {(filters.minPrice || filters.maxPrice) && (
                <span className="bg-gray-100 text-dark text-sm rounded-full px-3 py-1 flex items-center">
                  Price: {filters.minPrice ? `$${filters.minPrice}` : '$0'} - {filters.maxPrice ? `$${filters.maxPrice}` : 'Any'}
                </span>
              )}
              
              {filters.rating && (
                <span className="bg-gray-100 text-dark text-sm rounded-full px-3 py-1 flex items-center">
                  Rating: {filters.rating}+ Stars
                </span>
              )}
              
              <button
                onClick={resetFilters}
                className="text-primary text-sm hover:underline flex items-center"
              >
                Clear all
              </button>
            </div>
          )}
          
          {/* Products display */}
          {loading ? (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
              : "space-y-6"
            }>
              {Array(8).fill(0).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="bg-error/10 text-error p-6 rounded-lg text-center">
              <p className="text-lg font-medium">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 btn btn-outline border-error text-error hover:bg-error hover:text-white"
              >
                Try Again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-light p-8 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters to find what you're looking for.</p>
              <button 
                onClick={resetFilters}
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
                : "space-y-6"
              }
            >
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  viewMode={viewMode}
                />
              ))}
            </motion.div>
          )}
          
          {/* Pagination */}
          {!loading && !error && products.length > 0 && (
            <Pagination />
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default ProductsPage;