import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiMail, FiPrinter, FiChevronRight } from 'react-icons/fi';
import PageTransition from '../../shared/PageTransition';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;
  
  // Use effect hook outside of conditional
  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [navigate, order]);
  
  // If no order data, return early
  if (!order) {
    return null;
  }
  
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <FiCheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been received.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-semibold text-xl">Order #{order.orderNumber}</h2>
              <p className="text-gray-500 text-sm">
                Placed on {new Date(order.orderDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="text-gray-600 hover:text-gray-800 p-2">
                <FiMail className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-gray-800 p-2">
                <FiPrinter className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="border-t border-b py-4 mb-6">
            <div className="flex items-start mb-4">
              <div className="bg-blue-50 p-2 rounded-full mr-4">
                <FiPackage className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">Delivery Information</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Your order will be delivered to:
                </p>
                <p className="text-sm mt-2">
                  {order.firstName} {order.lastName}<br />
                  {order.address}{order.apartment ? `, ${order.apartment}` : ''}<br />
                  {order.city}, {order.state} {order.zipCode}<br />
                  {order.country}
                </p>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span>
                {order.deliveryMethod === 'standard' && 'Estimated delivery in 3-5 business days'}
                {order.deliveryMethod === 'express' && 'Estimated delivery in 1-2 business days'}
                {order.deliveryMethod === 'overnight' && 'Estimated delivery by tomorrow'}
              </span>
            </div>
          </div>
          
          <h3 className="font-medium mb-3">Order Summary</h3>
          <div className="divide-y mb-4">
            {order.items.map(item => (
              <div key={item.id} className="py-3 flex items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={item.imageUrl || `https://via.placeholder.com/64?text=No+Image`} 
                    alt={item.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-medium">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>${order.subtotal}</span>
            </div>
            
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-gray-600">Shipping</span>
              <span>
                {parseFloat(order.deliveryCost) === 0 
                  ? 'Free' 
                  : `$${order.deliveryCost}`}
              </span>
            </div>
            
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>Total</span>
              <span>${order.total}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            to="/account/orders" 
            className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center hover:shadow-md transition-shadow"
          >
            <div>
              <h3 className="font-medium">View Order History</h3>
              <p className="text-sm text-gray-500">Track all your orders</p>
            </div>
            <FiChevronRight className="text-gray-400" />
          </Link>
          
          <Link 
            to="/products" 
            className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center hover:shadow-md transition-shadow"
          >
            <div>
              <h3 className="font-medium">Continue Shopping</h3>
              <p className="text-sm text-gray-500">Browse our latest products</p>
            </div>
            <FiChevronRight className="text-gray-400" />
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default OrderConfirmation; 