import React from 'react';
import { FiTruck, FiClock, FiMapPin, FiGlobe, FiAlertCircle, FiPackage } from 'react-icons/fi';

const ShippingPage = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-2 text-center">Shipping Information</h1>
      <p className="text-gray-600 text-center mb-12">Learn about our shipping methods, timeframes, and policies.</p>
      
      <div className="max-w-4xl mx-auto">
        {/* Shipping Methods */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiTruck className="mr-3 text-primary" /> Shipping Methods
          </h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimated Delivery</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">Standard Shipping</div>
                      <div className="text-sm text-gray-500">USPS, FedEx, or UPS</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">3-7 business days</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">$5.99</div>
                      <div className="text-xs text-gray-500">Free on orders over $50</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">Express Shipping</div>
                      <div className="text-sm text-gray-500">FedEx or UPS</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">2-3 business days</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">$12.99</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">Next Day Delivery</div>
                      <div className="text-sm text-gray-500">FedEx or UPS</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">1 business day</div>
                      <div className="text-xs text-gray-500">Order by 2 PM EST</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">$24.99</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        
        {/* Processing Times */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiClock className="mr-3 text-primary" /> Order Processing
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              Most orders are processed and shipped within 1-2 business days after payment confirmation. During peak seasons or promotional periods, processing may take an additional 1-2 business days.
            </p>
            <p className="text-gray-600 mb-4">
              After your order ships, you'll receive a confirmation email with tracking information. You can also track your order through your account dashboard.
            </p>
            <div className="flex items-center text-sm text-primary font-medium mt-2">
              <FiAlertCircle className="mr-2" />
              Business days are Monday through Friday, excluding holidays
            </div>
          </div>
        </section>
        
        {/* Domestic Shipping */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiMapPin className="mr-3 text-primary" /> Domestic Shipping
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              We ship to all 50 U.S. states, including Alaska and Hawaii, as well as U.S. territories. Shipping rates and delivery times for Alaska, Hawaii, and U.S. territories may vary from those shown in the table above.
            </p>
            <p className="text-gray-600 mb-4">
              For P.O. Box addresses, we typically ship via USPS. Please note that express shipping options may not be available for P.O. Box addresses.
            </p>
            <div className="mt-4 bg-blue-50 p-4 rounded-md">
              <h3 className="font-medium text-blue-700 mb-2">Free Shipping Promotion</h3>
              <p className="text-blue-600 text-sm">
                Orders over $50 qualify for free standard shipping within the continental United States. This promotion applies automatically at checkout for eligible orders.
              </p>
            </div>
          </div>
        </section>
        
        {/* International Shipping */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiGlobe className="mr-3 text-primary" /> International Shipping
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              We ship to most countries worldwide. International shipping rates and delivery times vary by location. Typical delivery times range from 7-21 business days, depending on destination and customs processing.
            </p>
            <p className="text-gray-600 mb-4">
              Please note that international customers may be responsible for customs duties, taxes, and import fees. These charges are not included in the shipping cost and will be collected by the delivery carrier or local customs office.
            </p>
            <div className="mt-4 bg-yellow-50 p-4 rounded-md">
              <h3 className="font-medium text-yellow-700 mb-2">Important Information</h3>
              <p className="text-yellow-600 text-sm">
                We cannot guarantee delivery timeframes for international shipments due to potential customs delays. Tracking information may be limited once a package leaves the United States.
              </p>
            </div>
          </div>
        </section>
        
        {/* Shipping Restrictions */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiPackage className="mr-3 text-primary" /> Shipping Restrictions
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              Certain products may have shipping restrictions due to size, weight, or regulatory requirements. These restrictions will be noted on the product page.
            </p>
            <p className="text-gray-600 mb-4">
              We reserve the right to cancel orders for restricted items that cannot be shipped to your location. In such cases, we will notify you and provide a full refund.
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-600">
              <li>Hazardous materials cannot be shipped internationally or via air transportation</li>
              <li>Oversized items may require additional shipping fees</li>
              <li>Some products cannot be shipped to P.O. Box addresses</li>
              <li>Certain countries may have import restrictions on specific products</li>
            </ul>
          </div>
        </section>
        
        {/* Contact Section */}
        <section>
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Have questions about shipping?</h2>
            <p className="text-gray-600 mb-6">Our customer service team is available to assist you with any shipping-related inquiries.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="mailto:shipping@example.com" 
                className="inline-block bg-primary text-white text-center font-medium py-3 px-6 rounded-md hover:bg-primary-dark transition-colors duration-300"
              >
                Email Shipping Department
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

export default ShippingPage; 