import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiShare2, 
  FiStar, 
  FiShoppingCart, 
  FiHeart, 
  FiMinus, 
  FiPlus 
} from 'react-icons/fi';
import { CartContext } from '../../../context/CartContext';
import { ProductCardSkeleton } from '../../../components/ui';
import ProductCard from './ProductCard';
import PageTransition from '../../shared/PageTransition';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  
  const { addToCart } = useContext(CartContext);
  
  // API URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const PLACEHOLDER_URL = process.env.REACT_APP_PLACEHOLDER_IMAGE_URL || 'https://via.placeholder.com';
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Fetch product details from API
        const response = await axios.get(`${API_URL}/products/${id}`);
        setProduct(response.data);
        
        // Fetch related products (same category)
        const categoryId = response.data.categoryId;
        let relatedProductsResponse;
        
        if (categoryId) {
          relatedProductsResponse = await axios.get(`${API_URL}/products?categoryId=${categoryId}&limit=4`);
        } else if (response.data.category) {
          // Backward compatibility
          relatedProductsResponse = await axios.get(`${API_URL}/products?category=${response.data.category}&limit=4`);
        } else {
          // Just get some random products
          relatedProductsResponse = await axios.get(`${API_URL}/products?limit=4`);
        }
        
        // Filter out the current product from related products
        const filteredRelated = relatedProductsResponse.data.products.filter(p => p.id !== id);
        setRelatedProducts(filteredRelated || []);
        
        // Generate mock reviews (these could come from an API in the future)
        const mockReviews = Array(5).fill(null).map((_, i) => ({
          id: i + 1,
          user: {
            name: ['John D.', 'Sarah M.', 'Robert K.', 'Emily W.', 'Michael T.'][i],
            avatar: `${PLACEHOLDER_URL}/100x100?text=${['JD', 'SM', 'RK', 'EW', 'MT'][i]}`
          },
          rating: Math.floor(Math.random() * 5) + 1,
          date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
          title: ['Great product!', 'Highly recommended', 'Good quality', 'As described', 'Fast shipping'][i],
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl nec ultricies tincidunt, nisl nunc aliquet nisl, nec aliquet nisl nisl nec nisl.',
          helpful: Math.floor(Math.random() * 20),
          verified: Math.random() > 0.3
        }));
        
        setReviews(mockReviews);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };
    
    fetchProduct();
    // Reset active image and scroll to top when product ID changes
    setActiveImage(0);
    window.scrollTo(0, 0);
  }, [id, API_URL, PLACEHOLDER_URL]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (product?.stockQuantity || 0)) {
      setQuantity(value);
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < product?.stockQuantity) {
      setQuantity(prev => prev + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product && quantity > 0) {
      addToCart({...product, imageUrl: product.images[0]}, quantity);
    }
  };
  
  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };
  
  // Render star ratings
  const renderRatingStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FiStar 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-accent fill-accent' : 'text-gray-300'}`} 
      />
    ));
  };
  
  if (loading) {
    return (
      <PageTransition>
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-card overflow-hidden">
              <div className="animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                  <div className="bg-gray-200 rounded-lg h-96"></div>
                  <div>
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                    <div className="h-32 bg-gray-200 rounded mb-6"></div>
                    <div className="h-10 bg-gray-200 rounded mb-4"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }
  
  if (error) {
    return (
      <PageTransition>
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="bg-error/10 text-error p-8 rounded-lg text-center">
              <p className="text-lg font-medium mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }
  
  if (!product) {
    return (
      <PageTransition>
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="bg-light p-8 rounded-lg text-center">
              <h2 className="text-xl font-semibold mb-2">Product Not Found</h2>
              <p className="text-gray-500 mb-4">The product you're looking for doesn't exist or has been removed.</p>
              <Link to="/products" className="btn btn-primary">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }
  
  return (
    <PageTransition>
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex mb-6 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-primary">Products</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to={`/products?category=${product.category}`} className="text-gray-500 hover:text-primary">{product.category}</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">{product.name}</span>
          </nav>
          
          {/* Product main content */}
          <div className="bg-white rounded-lg shadow-card overflow-hidden mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Product Image Gallery */}
              <div>
                <div 
                  className="relative rounded-lg overflow-hidden mb-4 h-96 bg-light cursor-zoom-in"
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onMouseMove={handleMouseMove}
                >
                  <img 
                    src={product.images[activeImage]} 
                    alt={`${product.name} - view ${activeImage + 1}`}
                    className={`w-full h-full object-contain transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
                  />
                  {isZoomed && (
                    <div 
                      className="absolute inset-0 bg-no-repeat bg-origin-border"
                      style={{
                        backgroundImage: `url(${product.images[activeImage]})`,
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        backgroundSize: '200%'
                      }}
                    />
                  )}
                </div>
                
                {/* Thumbnail Gallery */}
                <div className="flex space-x-2 relative">
                  {product.images.length > 4 && (
                    <button 
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md text-dark hover:text-primary"
                      onClick={() => setActiveImage(prev => Math.max(0, prev - 1))}
                    >
                      <FiChevronLeft className="w-4 h-4" />
                    </button>
                  )}
                  
                  <div className="flex space-x-2 overflow-x-auto py-2 px-1">
                    {product.images.map((image, index) => (
                      <button 
                        key={index}
                        className={`w-20 h-20 rounded border-2 transition-colors ${activeImage === index ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}
                        onClick={() => setActiveImage(index)}
                      >
                        <img 
                          src={image} 
                          alt={`${product.name} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover rounded"
                        />
                      </button>
                    ))}
                  </div>
                  
                  {product.images.length > 4 && (
                    <button 
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md text-dark hover:text-primary"
                      onClick={() => setActiveImage(prev => Math.min(product.images.length - 1, prev + 1))}
                    >
                      <FiChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Product Info */}
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-dark">{product.name}</h1>
                  <button className="text-gray-400 hover:text-primary p-1">
                    <FiShare2 className="w-5 h-5" />
                  </button>
        </div>
        
                {/* Brand */}
                <p className="text-gray-500 mb-4">
                  Brand: <span className="text-primary">{product.brand}</span>
                </p>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {renderRatingStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.rating}/5 ({product.reviewCount} reviews)
                  </span>
                </div>
                
                {/* Price */}
                <p className="text-2xl font-bold text-primary mb-4">
                  ${parseFloat(product.price).toFixed(2)}
                </p>
                
                {/* Availability */}
                <div className="mb-6">
            {product.isAvailable && product.stockQuantity > 0 ? (
                    <span className="inline-flex items-center text-sm text-green-500">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      In Stock ({product.stockQuantity} available)
                    </span>
            ) : (
                    <span className="inline-flex items-center text-sm text-red-500">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Out of Stock
                    </span>
            )}
          </div>
          
                {/* Short Description */}
                <p className="text-gray-600 mb-6">{product.description.substring(0, 150)}...</p>
                
                {/* Actions */}
          {product.isAvailable && product.stockQuantity > 0 && (
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <div className="flex items-center border rounded-l-md">
                        <button 
                          onClick={decrementQuantity}
                          className="px-3 py-2 text-gray-600 hover:text-primary"
                          disabled={quantity <= 1}
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                <input 
                  type="number" 
                          value={quantity}
                          onChange={handleQuantityChange}
                  min="1" 
                  max={product.stockQuantity} 
                          className="w-16 border-0 text-center focus:ring-0"
                        />
                        <button 
                          onClick={incrementQuantity}
                          className="px-3 py-2 text-gray-600 hover:text-primary"
                          disabled={quantity >= product.stockQuantity}
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex-1 ml-4">
                        <button 
                          className="btn btn-primary w-full py-2 flex items-center justify-center"
                          onClick={handleAddToCart}
                        >
                          <FiShoppingCart className="mr-2" /> Add to Cart
                        </button>
                      </div>
                    </div>
                    <button className="btn btn-outline w-full py-2 flex items-center justify-center">
                      <FiHeart className="mr-2" /> Add to Wishlist
                    </button>
                  </div>
                )}
                
                {/* Specifications Preview */}
                <div className="border-t border-b py-4 mb-6">
                  <h3 className="font-semibold mb-2">Specifications:</h3>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    {product.specifications.slice(0, 4).map((spec, index) => (
                      <li key={index} className="flex justify-between">
                        <span className="text-gray-500">{spec.name}:</span>
                        <span className="font-medium">{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* SKU, Category info */}
                <div className="text-sm text-gray-500 space-y-1">
                  <p>SKU: {product.id.toString().padStart(6, '0')}</p>
                  <p>Category: {product.category}</p>
                </div>
              </div>
            </div>
          </div>
              </div>
              
        {/* Product Tabs */}
        <div className="bg-white rounded-lg shadow-card overflow-hidden mb-12">
          <div className="border-b">
            <div className="flex overflow-x-auto">
              <button 
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'description' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'specifications' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button 
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'reviews' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({reviews.length})
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="mb-4">{product.description}</p>
                <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                <ul className="list-disc pl-5 mb-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="mb-1">{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div className="max-w-2xl">
                <table className="w-full text-left">
                  <tbody>
                    {product.specifications.map((spec, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-light' : 'bg-white'}>
                        <th className="px-4 py-3 w-1/3 font-medium text-dark">{spec.name}</th>
                        <td className="px-4 py-3 text-gray-600">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                {/* Reviews summary */}
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="md:w-1/3 text-center p-6 bg-light rounded-lg">
                    <div className="text-5xl font-bold text-dark mb-2">{product.rating.toFixed(1)}</div>
                    <div className="flex justify-center mb-2">
                      {renderRatingStars(product.rating)}
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{product.reviewCount} reviews</p>
                    <button className="btn btn-primary w-full">Write a Review</button>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                    <div className="space-y-6">
                      {reviews.map(review => (
                        <div key={review.id} className="border-b pb-6 last:border-b-0">
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <img 
                                src={review.user.avatar} 
                                alt={review.user.name}
                                className="w-10 h-10 rounded-full mr-3"
                              />
                              <div>
                                <h4 className="font-medium">{review.user.name}</h4>
                                <div className="flex items-center text-sm">
                                  <div className="flex mr-2">
                                    {renderRatingStars(review.rating)}
                                  </div>
                                  <span className="text-gray-500">{review.date}</span>
                                </div>
                              </div>
                            </div>
                            {review.verified && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <h5 className="font-medium mb-2">{review.title}</h5>
                          <p className="text-gray-600 mb-2">{review.comment}</p>
                          <div className="flex items-center text-sm">
                            <button className="text-gray-500 hover:text-primary mr-4">
                              Helpful ({review.helpful})
                            </button>
                            <button className="text-gray-500 hover:text-primary">
                              Report
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-dark mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProductDetailPage;