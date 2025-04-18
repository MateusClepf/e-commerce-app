import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { ProductCardSkeleton } from '../../../components/ui';
import PageTransition from '../../shared/PageTransition';
import { AnimatedButton } from '../../../components/ui/animations';

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingDeals, setLoadingDeals] = useState(true);
  const [error, setError] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  
  // API URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const PLACEHOLDER_URL = process.env.REACT_APP_PLACEHOLDER_IMAGE_URL || 'https://via.placeholder.com';
  
  // Fetch featured products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/products?limit=6`);
        setFeaturedProducts(response.data.products || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch featured products');
        setLoading(false);
      }
    };
    
    fetchFeaturedProducts();
  }, [API_URL]);
  
  // Fetch categories
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
  
  // Fetch promotional deals
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoadingDeals(true);
        const response = await axios.get(`${API_URL}/deals`);
        setDeals(response.data || []);
        setLoadingDeals(false);
      } catch (err) {
        console.error('Failed to fetch deals:', err);
        setLoadingDeals(false);
      }
    };
    
    fetchDeals();
  }, [API_URL]);
  
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      avatar: `${PLACEHOLDER_URL}/100x100?text=SJ`,
      quote: 'I\'ve been shopping here for years. The product quality and customer service are consistently excellent.',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Tech Enthusiast',
      avatar: `${PLACEHOLDER_URL}/100x100?text=MC`,
      quote: 'Their electronics selection is impressive. Fast shipping and the prices are very competitive.',
      rating: 4
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Fashion Blogger',
      avatar: `${PLACEHOLDER_URL}/100x100?text=ER`,
      quote: 'I always find the latest fashion trends here. The clothing quality exceeds my expectations every time.',
      rating: 5
    }
  ];
  
  // Carousel logic
  const nextSlide = () => {
    if (featuredProducts.length <= 3) return;
    setActiveSlide((prev) => (prev === featuredProducts.length - 3 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    if (featuredProducts.length <= 3) return;
    setActiveSlide((prev) => (prev === 0 ? featuredProducts.length - 3 : prev - 1));
  };
  
  // Auto scroll carousel
  useEffect(() => {
    if (featuredProducts.length <= 3) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [featuredProducts.length, activeSlide]);
  
  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement add to cart logic
  };

  return (
    <PageTransition>
      <div className="pt-24 pb-8">
      {/* Hero section */}
        <section className="relative overflow-hidden rounded-xl mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-dark/80 to-dark/50 z-10"></div>
          <img 
            src={`${PLACEHOLDER_URL}/1600x600?text=Modern+E-Commerce`} 
            alt="Hero Banner" 
            className="w-full h-[500px] object-cover"
          />
          
          <div className="absolute inset-0 z-20 flex items-center justify-start">
            <div className="container mx-auto px-4">
              <div className="max-w-lg">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-4"
                >
                  Discover Our Premium Collection
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg text-white/90 mb-8"
                >
                  Shop the latest trends with premium quality and exceptional service. Find your perfect style today.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex space-x-4"
                >
                  <AnimatedButton
                    className="btn btn-primary px-8 py-3 flex items-center"
                    onClick={() => navigate('/products')}
                  >
                    Shop Now <FiArrowRight className="ml-2" />
                  </AnimatedButton>
                  
                  <Link 
                    to="/categories" 
                    className="btn btn-outline bg-white/10 backdrop-blur-sm border-white text-white px-8 py-3"
                  >
                    Browse Categories
                  </Link>
                </motion.div>
              </div>
            </div>
        </div>
      </section>
      
      {/* Categories section */}
        <section className="mb-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-dark">Shop by Category</h2>
                <p className="text-gray-500 mt-2">Explore our wide range of products across various categories</p>
              </div>
              <Link to="/categories" className="text-primary font-medium flex items-center mt-2 md:mt-0 hover:underline">
                View All Categories <FiArrowRight className="ml-1" />
              </Link>
        </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {loadingCategories ? (
                // Loading skeleton for categories
                Array(6).fill(0).map((_, index) => (
                  <div 
                    key={index}
                    className="bg-gray-100 rounded-xl p-6 flex flex-col items-center text-center animate-pulse h-32"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                    <div className="w-20 h-4 bg-gray-200 rounded"></div>
                  </div>
                ))
              ) : (
                categories.map((category) => (
                  <motion.div
                    key={category.id}
                    whileHover={{ y: -8, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`${category.bgColor} rounded-xl p-6 flex flex-col items-center text-center cursor-pointer`}
                  >
                    <Link to={`/products?categoryId=${category.id}`} className="flex flex-col items-center">
                      <div className="text-4xl mb-4">{category.icon}</div>
                      <span className="font-medium">{category.name}</span>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
        </div>
      </section>
      
        {/* Featured products carousel */}
        <section className="mb-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-dark">Featured Products</h2>
                <p className="text-gray-500 mt-2">Check out our most popular items</p>
              </div>
              <Link to="/products" className="text-primary font-medium flex items-center mt-2 md:mt-0 hover:underline">
                View All Products <FiArrowRight className="ml-1" />
              </Link>
        </div>
        
            <div className="relative">
              {/* Carousel navigation */}
              {featuredProducts.length > 3 && (
                <>
                  <button 
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-elevated text-dark hover:text-primary transition-colors"
                    aria-label="Previous slide"
                  >
                    <FiChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-elevated text-dark hover:text-primary transition-colors"
                    aria-label="Next slide"
                  >
                    <FiChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              
              {/* Products carousel */}
              <div className="overflow-hidden">
        {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(3).fill(0).map((_, i) => (
                      <ProductCardSkeleton key={i} />
                    ))}
                  </div>
        ) : error ? (
                  <div className="text-center py-8">
                    <p className="text-error">{error}</p>
                    <button 
                      onClick={() => window.location.reload()}
                      className="mt-4 btn btn-outline"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {featuredProducts.slice(activeSlide, activeSlide + 3).map((product) => (
                      <motion.div
                        key={product.id}
                        whileHover={{ y: -5 }}
                        className="card"
                      >
                        <Link to={`/products/${product.id}`}>
                          <img 
                            src={product.imageUrl || `${PLACEHOLDER_URL}/300x300?text=No+Image`} 
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                        </Link>
                        <div className="card-body">
                          <h3 className="card-title">
                            <Link to={`/products/${product.id}`}>{product.name}</Link>
                          </h3>
                          <p className="card-price">${parseFloat(product.price).toFixed(2)}</p>
                          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description || 'No description available'}</p>
                          <button 
                            className="btn btn-primary w-full"
                            onClick={(e) => handleAddToCart(product, e)}
                            disabled={!product.isAvailable || product.stockQuantity <= 0}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Promotional banners - dynamic based on deals */}
        {!loadingDeals && deals.length > 0 && (
          <>
            {deals.filter(deal => deal.active).sort((a, b) => a.position - b.position).map((deal, index) => (
              <section key={deal.id} className="mb-16">
                <div className="container mx-auto px-4">
                  <div className={`bg-gradient-to-r ${index % 2 === 0 ? 'from-primary to-secondary' : 'from-secondary to-primary'} rounded-xl overflow-hidden`}>
                    <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}>
                      <div className="lg:w-1/2 p-8 lg:p-12">
                        <motion.div
                          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{deal.title}</h2>
                          <p className="text-white/90 text-lg mb-6">{deal.bannerText}</p>
                          <Link to={deal.targetUrl} className="btn bg-white text-primary hover:bg-white/90 px-8 py-3">
                            {deal.discountPercentage ? `Shop ${deal.discountPercentage}% Off` : 'Shop Now'}
                          </Link>
                        </motion.div>
                      </div>
                      <div className="lg:w-1/2">
                        <img 
                          src={deal.imageUrl || `${PLACEHOLDER_URL}/600x400?text=${deal.title.replace(/\s+/g, '+')}`} 
                          alt={deal.title}
                          className="w-full h-64 lg:h-80 object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </>
        )}
        
        {/* If no deals are available, show the original hardcoded banners */}
        {(!deals.length || loadingDeals) && (
          <>
            {/* Original promotional banners (kept as fallback) */}
            <section className="mb-16">
              <div className="container mx-auto px-4">
                <div className="bg-gradient-to-r from-primary to-secondary rounded-xl overflow-hidden">
                  <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 p-8 lg:p-12">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Summer Sale!</h2>
                        <p className="text-white/90 text-lg mb-6">Get up to 50% off on selected items. Limited time offer.</p>
                        <Link to="/products?isOnSale=true" className="btn bg-white text-primary hover:bg-white/90 px-8 py-3">
                          Shop the Sale
                        </Link>
                      </motion.div>
                    </div>
                    <div className="lg:w-1/2">
                      <img 
                        src={`${PLACEHOLDER_URL}/600x400?text=Summer+Sale`} 
                        alt="Summer Sale"
                        className="w-full h-64 lg:h-80 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="mb-16">
              <div className="container mx-auto px-4">
                <div className="bg-light rounded-xl overflow-hidden">
                  <div className="flex flex-col-reverse lg:flex-row items-center">
                    <div className="lg:w-1/2">
                      <img 
                        src={`${PLACEHOLDER_URL}/600x400?text=New+Arrivals`} 
                        alt="New Arrivals"
                        className="w-full h-64 lg:h-80 object-cover"
                      />
                    </div>
                    <div className="lg:w-1/2 p-8 lg:p-12">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">New Arrivals</h2>
                        <p className="text-gray-600 text-lg mb-6">Check out our latest products. Be the first to own our newest items.</p>
                        <Link to="/products?newArrival=true" className="btn btn-primary px-8 py-3">
                          Explore New Items
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
        
        {/* Testimonials section */}
        <section className="mb-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">What Our Customers Say</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Don't just take our word for it. Read what our customers have to say about their shopping experience.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-card"
                >
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-dark">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                  
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <FiStar 
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-accent fill-accent' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
      </section>
      
        {/* Newsletter subscription */}
        <section>
          <div className="container mx-auto px-4">
            <div className="bg-dark rounded-xl p-8 md:p-12">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Join Our Newsletter</h2>
                <p className="text-white/80 mb-8">Subscribe to our newsletter to receive updates on new products, special offers, and more.</p>
                
                <form className="flex flex-col sm:flex-row">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="form-control rounded-r-none sm:flex-1 mb-2 sm:mb-0"
                    required
                  />
                  <button 
                    type="submit" 
                    className="btn btn-primary rounded-l-none sm:rounded-l-none"
                  >
                    Subscribe
                  </button>
                </form>
                
                <p className="text-white/60 mt-4 text-sm">By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.</p>
              </div>
            </div>
        </div>
      </section>
    </div>
    </PageTransition>
  );
};

export default HomePage;