import React from 'react';
import { FiRefreshCw, FiCheckCircle, FiXCircle, FiClock, FiDollarSign, FiFileText } from 'react-icons/fi';

const ReturnsPage = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-2 text-center">Returns & Refunds</h1>
      <p className="text-gray-600 text-center mb-12">Our hassle-free return policy and refund process explained.</p>
      
      <div className="max-w-4xl mx-auto">
        {/* Return Policy Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiRefreshCw className="mr-3 text-primary" /> Return Policy Overview
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              At E-Commerce Store, we want you to be completely satisfied with your purchase. If you're not happy with your order for any reason, we offer a simple and convenient return process.
            </p>
            <div className="bg-blue-50 p-4 rounded-md my-6">
              <p className="text-blue-700 font-medium">
                Most items can be returned within 30 days of delivery for a full refund or exchange.
              </p>
            </div>
            <p className="text-gray-600 mb-4">
              To qualify for a return, items must be unused, unwashed, and in their original packaging with all tags attached. Some products have special return conditions or may be excluded from our standard return policy (see details below).
            </p>
          </div>
        </section>
        
        {/* Return Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiFileText className="mr-3 text-primary" /> Return Process
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <ol className="relative border-l border-gray-200 ml-3 space-y-8">
              <li className="mb-6 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full -left-4">
                  1
                </span>
                <h3 className="font-bold text-lg mb-2">Initiate Your Return</h3>
                <p className="text-gray-600 mb-2">
                  Log in to your account and go to "Order History". Find the order containing the item(s) you wish to return and select "Return Items". If you checked out as a guest, use the order number and email from your confirmation.
                </p>
                <p className="text-gray-600">
                  Alternatively, contact our customer service team for assistance with initiating your return.
                </p>
              </li>
              
              <li className="mb-6 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full -left-4">
                  2
                </span>
                <h3 className="font-bold text-lg mb-2">Package Your Return</h3>
                <p className="text-gray-600 mb-2">
                  Place the item(s) in their original packaging along with all tags and accessories. Include a copy of the return form or order confirmation in the package.
                </p>
                <p className="text-gray-600">
                  For hygiene reasons, certain items like underwear, swimwear, and earrings cannot be returned if the hygiene seal has been broken or removed.
                </p>
              </li>
              
              <li className="mb-6 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full -left-4">
                  3
                </span>
                <h3 className="font-bold text-lg mb-2">Ship Your Return</h3>
                <p className="text-gray-600 mb-2">
                  After initiating your return, you'll receive a prepaid return shipping label by email. Print the label and attach it to your package.
                </p>
                <p className="text-gray-600">
                  Drop off your package at any authorized carrier location. We recommend keeping the receipt or tracking information until your return is processed.
                </p>
              </li>
              
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full -left-4">
                  4
                </span>
                <h3 className="font-bold text-lg mb-2">Refund Processing</h3>
                <p className="text-gray-600 mb-2">
                  Once we receive your return, our team will inspect the item(s) to ensure they meet our return requirements. We'll process your refund within 3-5 business days.
                </p>
                <p className="text-gray-600">
                  Refunds will be issued to the original payment method. Please allow an additional 2-7 business days for the refund to appear in your account, depending on your financial institution.
                </p>
              </li>
            </ol>
          </div>
        </section>
        
        {/* Return Timeframes */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiClock className="mr-3 text-primary" /> Return Timeframes
          </h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Category</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Window</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Special Conditions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">Clothing & Accessories</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">30 days</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">Items must be unworn with original tags attached</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">Electronics</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">15 days</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">All original packaging, accessories, and manuals must be included</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">Home & Kitchen</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">30 days</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">Items must be unused and in original packaging</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">Beauty & Personal Care</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">14 days</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">Sealed items only; products cannot be returned if opened</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">Sale Items</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">14 days</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">Items marked "Final Sale" cannot be returned</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        
        {/* Refund Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiDollarSign className="mr-3 text-primary" /> Refund Information
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center">
                  <FiCheckCircle className="mr-2 text-green-500" /> Refund Includes
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Full purchase price of the returned item(s)
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Original shipping costs (for defective or incorrect items only)
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Sales tax applied to the returned items
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center">
                  <FiXCircle className="mr-2 text-red-500" /> Refund Excludes
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Original shipping costs (for standard returns)
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Gift wrapping fees or other special services
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Return shipping costs (unless item is defective)
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-bold text-lg mb-3">Refund Methods</h3>
              <p className="text-gray-600 mb-4">
                Refunds will be processed to the original payment method used for the purchase. If the original payment method is no longer available, we will issue the refund as store credit.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>Credit/Debit Card: 2-7 business days after processing</li>
                <li>PayPal: 1-3 business days after processing</li>
                <li>Store Credit/Gift Card: Immediately after processing</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Non-Returnable Items */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiXCircle className="mr-3 text-primary" /> Non-Returnable Items
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              For hygiene, safety, and other reasons, the following items cannot be returned:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Intimate apparel and swimwear with removed hygiene seals</li>
              <li>Personalized or custom-made items</li>
              <li>Digital downloads or software</li>
              <li>Gift cards and e-gift certificates</li>
              <li>Perishable goods</li>
              <li>Products marked as "Final Sale" or "Non-Returnable"</li>
              <li>Items without proof of purchase</li>
              <li>Opened health and personal care items</li>
            </ul>
            <div className="mt-6 bg-yellow-50 p-4 rounded-md">
              <p className="text-yellow-700 text-sm">
                If you received a damaged or defective item, please contact our customer service team within 48 hours of delivery for special handling.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section>
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Need Help with a Return?</h2>
            <p className="text-gray-600 mb-6">Our customer service team is here to assist you with any questions about returns or refunds.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="mailto:returns@example.com" 
                className="inline-block bg-primary text-white text-center font-medium py-3 px-6 rounded-md hover:bg-primary-dark transition-colors duration-300"
              >
                Email Returns Department
              </a>
              <a 
                href="tel:+11234567890" 
                className="inline-block border border-primary text-primary text-center font-medium py-3 px-6 rounded-md hover:bg-primary hover:text-white transition-colors duration-300"
              >
                Call Customer Service
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReturnsPage; 