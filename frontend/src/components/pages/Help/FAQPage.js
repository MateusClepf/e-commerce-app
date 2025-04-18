import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQPage = () => {
  const [openItems, setOpenItems] = useState([]);

  const faqData = [
    {
      id: 1,
      question: "How do I place an order?",
      answer: "To place an order, browse our products, select the items you want, add them to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase."
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay. We may also offer additional payment options at checkout."
    },
    {
      id: 3,
      question: "How long will it take to receive my order?",
      answer: "Standard shipping typically takes 3-7 business days. Expedited shipping options are available at checkout. Please note that delivery times may vary based on your location and product availability."
    },
    {
      id: 4,
      question: "Can I track my order?",
      answer: "Yes, once your order ships, you'll receive a confirmation email with tracking information. You can also view your order status and tracking details in your account under 'Order History'."
    },
    {
      id: 5,
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be unused and in original packaging. Some restrictions apply. Please visit our Returns page for complete details."
    },
    {
      id: 6,
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Additional customs fees or import taxes may apply and are the responsibility of the recipient."
    },
    {
      id: 7,
      question: "How can I check the status of my order?",
      answer: "You can check your order status by logging into your account and viewing your order history. If you checked out as a guest, use the order tracking link provided in your confirmation email."
    },
    {
      id: 8,
      question: "What should I do if an item is out of stock?",
      answer: "You can sign up for email notifications on product pages for out-of-stock items. We'll let you know when the item becomes available again. Alternatively, browse similar products that may serve your needs."
    },
    {
      id: 9,
      question: "Do you offer gift wrapping?",
      answer: "Yes, we offer gift wrapping services for a small additional fee. You can select this option during checkout. You can also include a personalized message with your gift."
    },
    {
      id: 10,
      question: "How do I create an account?",
      answer: "Click the 'Register' button in the top right corner of the page. Fill in the required information and submit the form. Once registered, you can log in to access your account dashboard."
    }
  ];

  const toggleItem = (id) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const isOpen = (id) => openItems.includes(id);

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-2 text-center">Frequently Asked Questions</h1>
      <p className="text-gray-600 text-center mb-12">Find answers to the most common questions about our products and services.</p>
      
      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((faq) => (
          <div 
            key={faq.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <button
              onClick={() => toggleItem(faq.id)}
              className="w-full flex justify-between items-center p-5 text-left font-medium text-dark hover:bg-gray-50 transition-colors duration-200 focus:outline-none"
            >
              <span>{faq.question}</span>
              {isOpen(faq.id) ? 
                <FiChevronUp className="w-5 h-5 text-gray-500" /> : 
                <FiChevronDown className="w-5 h-5 text-gray-500" />
              }
            </button>
            
            <AnimatePresence>
              {isOpen(faq.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-5 pt-0 text-gray-600 border-t border-gray-100">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
      <div className="max-w-3xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
        <p className="text-gray-600 mb-6">If you couldn't find an answer to your question, please contact our customer support team.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a 
            href="mailto:support@example.com" 
            className="inline-block bg-primary text-white text-center font-medium py-3 px-6 rounded-md hover:bg-primary-dark transition-colors duration-300"
          >
            Email Support
          </a>
          <a 
            href="tel:+11234567890" 
            className="inline-block border border-primary text-primary text-center font-medium py-3 px-6 rounded-md hover:bg-primary hover:text-white transition-colors duration-300"
          >
            Call Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 