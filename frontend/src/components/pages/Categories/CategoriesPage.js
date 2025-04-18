import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching categories from an API
    setTimeout(() => {
      setCategories([
        { id: 1, name: 'Electronics', image: 'https://source.unsplash.com/500x300/?electronics', description: 'Latest gadgets and electronic devices' },
        { id: 2, name: 'Clothing', image: 'https://source.unsplash.com/500x300/?clothing', description: 'Fashion for all ages and styles' },
        { id: 3, name: 'Home & Kitchen', image: 'https://source.unsplash.com/500x300/?kitchen', description: 'Everything you need for your home' },
        { id: 4, name: 'Books', image: 'https://source.unsplash.com/500x300/?books', description: 'Browse our collection of books' },
        { id: 5, name: 'Sports & Outdoors', image: 'https://source.unsplash.com/500x300/?sports', description: 'Gear up for your outdoor adventures' },
        { id: 6, name: 'Beauty & Health', image: 'https://source.unsplash.com/500x300/?beauty', description: 'Self-care products for everyone' }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8 text-center">Shop by Category</h1>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {categories.map(category => (
          <motion.div 
            key={category.id} 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Link to={`/products?category=${category.id}`}>
              <div className="h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
                <div className="mt-4">
                  <span className="inline-block px-4 py-2 text-primary font-medium border border-primary rounded hover:bg-primary hover:text-white transition-colors duration-300">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CategoriesPage; 