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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    categoryId: '',
    category: '', // For backward compatibility
    minPrice: '',
    maxPrice: '',
    rating: '',
    isOnSale: '',
    newArrival: '',
    sort: 'newest' // newest, price-low-high, price-high-low, popular
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // API URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const PLACEHOLDER_URL = process.env.REACT_APP_PLACEHOLDER_IMAGE_URL || 'https://via.placeholder.com';
  const itemsPerPage = 12;
  
  // Extract query params on initial load and route changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    setFilters(prev => ({
      ...prev,
      categoryId: params.get('categoryId') || '',
      category: params.get('category') || '',
      minPrice: params.get('minPrice') || '',
      maxPrice: params.get('maxPrice') || '',
      rating: params.get('rating') || '',
      isOnSale: params.get('isOnSale') || '',
      newArrival: params.get('newArrival') || '',
      sort: params.get('sort') || 'newest'
    }));
    
    setCurrentPage(parseInt(params.get('page') || '1', 10));
    
    // Check if any filters are applied
    const hasFilters = !!params.get('categoryId') || 
                       !!params.get('category') ||
                       !!params.get('minPrice') ||
                       !!params.get('maxPrice') ||
                       !!params.get('rating') ||
                       !!params.get('isOnSale') ||
                       !!params.get('newArrival');
                       
    setFiltersApplied(hasFilters);
  }, [location.search]);
  
  // Fetch categories for filter dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await axios.get(`${API_URL}/categories?active=true`);
        setCategories(response.data || []);
        setLoadingCategories(false);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setLoadingCategories(false);
      }
    };
    
    fetchCategories();
  }, [API_URL]);
  
  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const params = new URLSearchParams();
        if (filters.categoryId) params.append('categoryId', filters.categoryId);
        if (filters.category) params.append('category', filters.category); // For backward compatibility
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        if (filters.rating) params.append('rating', filters.rating);
        if (filters.isOnSale === 'true') params.append('isOnSale', 'true');
        if (filters.newArrival === 'true') params.append('newArrival', 'true');
        params.append('sort', filters.sort);
        params.append('page', currentPage);
        params.append('limit', itemsPerPage);
        
        const url = `${API_URL}/products?${params.toString()}`;
        
        // Make the actual API call
        const response = await axios.get(url);
        
        // Process the response
        if (response.data) {
          setProducts(response.data.products || []);
          setTotalPages(response.data.pagination?.totalPages || 1);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [API_URL, filters, currentPage, itemsPerPage]);
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset to page 1 when filters change
    setCurrentPage(1);
    
    // Update URL without triggering a page reload
    const params = new URLSearchParams(location.search);
    
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    
    params.set('page', '1');
    navigate(`${location.pathname}?${params.toString()}`);
  };
  
  // Handle checkbox filters
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: checked ? 'true' : ''
    }));
    
    // Reset to page 1 when filters change
    setCurrentPage(1);
    
    // Update URL without triggering a page reload
    const params = new URLSearchParams(location.search);
    
    if (checked) {
      params.set(name, 'true');
    } else {
      params.delete(name);
    }
    
    params.set('page', '1');
    navigate(`${location.pathname}?${params.toString()}`);
  };
  
  // Handle sort change
  const handleSortChange = (e) => {
    const value = e.target.value;
    setFilters(prev => ({
      ...prev,
      sort: value
    }));
    
    // Update URL without triggering a page reload
    const params = new URLSearchParams(location.search);
    params.set('sort', value);
    navigate(`${location.pathname}?${params.toString()}`);
  };
  
  // Handle pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    
    // Update URL without triggering a page reload
    const params = new URLSearchParams(location.search);
    params.set('page', newPage.toString());
    navigate(`${location.pathname}?${params.toString()}`);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      categoryId: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      isOnSale: '',
      newArrival: '',
      sort: 'newest'
    });
    
    setCurrentPage(1);
    navigate('/products');
  };
  
  // Toggle filter sidebar on mobile
  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };
  
  // Toggle view mode (grid/list)
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };
  
  // Render star rating filter
  const renderRatingOptions = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => {
        const value = 5 - index;
        return (
          <option key={value} value={value}>
            {value} Stars & Up
          </option>
        );
      });
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
                    <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select 
                      id="categoryId" 
                      name="categoryId"
                      value={filters.categoryId}
                      onChange={handleFilterChange}
                      className="form-control"
                    >
                      <option value="">All Categories</option>
                      {loadingCategories ? (
                        <option disabled>Loading categories...</option>
                      ) : (
                        categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))
                      )}
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
                      {renderRatingOptions()}
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
                    onClick={() => {
                      // Implement apply filters logic
                    }}
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
              
              {filters.categoryId && (
                <span className="bg-gray-100 text-dark text-sm rounded-full px-3 py-1 flex items-center">
                  Category: {filters.categoryId}
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