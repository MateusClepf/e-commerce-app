import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const DealsPage = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching deals from an API
    setTimeout(() => {
      setDeals([
        {
          id: 1,
          title: 'Summer Sale',
          discount: '50% OFF',
          image: 'https://source.unsplash.com/800x400/?summer',
          description: 'Get amazing discounts on our summer collection',
          expiryDate: '2023-08-31',
          productId: 5
        },
        {
          id: 2,
          title: 'Electronics Flash Sale',
          discount: 'Up to 70% OFF',
          image: 'https://source.unsplash.com/800x400/?electronics',
          description: 'Limited time offers on all electronics',
          expiryDate: '2023-07-15',
          productId: 12
        },
        {
          id: 3,
          title: 'Home Decor Special',
          discount: '30% OFF',
          image: 'https://source.unsplash.com/800x400/?decor',
          description: 'Revamp your home with our special discounts',
          expiryDate: '2023-09-10',
          productId: 8
        },
        {
          id: 4,
          title: 'Weekly Bestsellers',
          discount: 'Buy 1 Get 1 Free',
          image: 'https://source.unsplash.com/800x400/?bestseller',
          description: 'Special offer on our most popular items this week',
          expiryDate: '2023-07-07',
          productId: 3
        },
        {
          id: 5,
          title: 'Clearance Sale',
          discount: 'Up to 80% OFF',
          image: 'https://source.unsplash.com/800x400/?sale',
          description: 'Final clearance on selected items while stocks last',
          expiryDate: '2023-08-15',
          productId: 22
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const calculateDaysRemaining = (dateString) => {
    const expiryDate = new Date(dateString);
    const today = new Date();
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80
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
      <h1 className="text-3xl font-bold mb-2 text-center">Special Offers & Deals</h1>
      <p className="text-gray-600 text-center mb-10">Check out our limited-time deals and save big on your favorite items!</p>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-10"
      >
        {deals.map(deal => (
          <motion.div 
            key={deal.id} 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="relative h-64 md:h-full">
                  <img 
                    src={deal.image} 
                    alt={deal.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-primary text-white font-bold py-2 px-4 rounded-br-lg">
                    {deal.discount}
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-3">{deal.title}</h3>
                  <p className="text-gray-600 mb-4">{deal.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-sm text-gray-500">Offer expires in:</span>
                    <div className="text-lg font-semibold text-red-600">
                      {calculateDaysRemaining(deal.expiryDate)} days
                    </div>
                  </div>
                </div>
                
                <Link 
                  to={`/products/${deal.productId}`}
                  className="inline-block bg-primary text-white text-center font-medium py-3 px-6 rounded-md hover:bg-primary-dark transition-colors duration-300 w-full md:w-auto"
                >
                  Shop This Deal
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DealsPage; 