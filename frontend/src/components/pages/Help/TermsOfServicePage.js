import React from 'react';
import { FiFileText, FiShoppingBag, FiShield, FiCreditCard, FiAlertTriangle, FiUsers } from 'react-icons/fi';

const TermsOfServicePage = () => {
  const lastUpdated = "July 1, 2023";
  
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-2 text-center">Terms of Service</h1>
      <p className="text-gray-600 text-center mb-2">Last Updated: {lastUpdated}</p>
      <p className="text-gray-600 text-center mb-12">These Terms of Service govern your use of our website and services.</p>
      
      <div className="max-w-4xl mx-auto">
        {/* Introduction Section */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-600 mb-4">
            Welcome to E-Commerce Store. These Terms of Service ("Terms") govern your access to and use of our website, products, and services. By accessing or using our website, you agree to be bound by these Terms and our Privacy Policy.
          </p>
          <p className="text-gray-600 mb-4">
            Please read these Terms carefully before using our website. If you do not agree to these Terms, you may not access or use our website or services.
          </p>
          <p className="text-gray-600">
            We reserve the right to change or modify these Terms at any time and in our sole discretion. Any changes or modifications will be effective immediately upon posting the updated Terms on the website. Your continued use of the website following the posting of revised Terms means that you accept and agree to the changes.
          </p>
        </section>
        
        {/* Account Terms */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiUsers className="mr-3 text-primary" /> Account Terms
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              To access certain features of the website, you may need to register for an account. When you register, you agree to the following:
            </p>
            <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-600">
              <li>You are at least 18 years of age or have the legal consent of a parent or guardian.</li>
              <li>You will provide accurate, current, and complete information during the registration process.</li>
              <li>You will maintain and promptly update your account information.</li>
              <li>You are responsible for safeguarding your account credentials.</li>
              <li>You are responsible for all activities that occur under your account.</li>
              <li>You agree to notify us immediately of any unauthorized use of your account.</li>
            </ul>
            
            <p className="text-gray-600">
              We reserve the right to suspend or terminate your account and refuse any and all current or future use of the website for any reason at any time. This may occur, without limitation, if we suspect that you have violated any provision of these Terms.
            </p>
          </div>
        </section>
        
        {/* Products and Purchases */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiShoppingBag className="mr-3 text-primary" /> Products and Purchases
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-3">Product Information</h3>
            <p className="text-gray-600 mb-4">
              We strive to display our products and their colors, features, and specifications as accurately as possible. However, we do not guarantee that the colors, dimensions, or other descriptions of products on our website are accurate, complete, reliable, current, or error-free.
            </p>
            <p className="text-gray-600 mb-6">
              All product descriptions, pricing, promotions, and availability are subject to change without notice. We reserve the right to limit the quantity of any item sold or to discontinue any product at any time.
            </p>
            
            <h3 className="text-lg font-semibold mb-3">Pricing and Availability</h3>
            <p className="text-gray-600 mb-4">
              All prices on our website are shown in US dollars and do not include taxes or shipping costs, which will be added at checkout. We reserve the right to change prices at any time without notice.
            </p>
            <p className="text-gray-600 mb-4">
              Despite our best efforts, a small number of the items on our website may be mispriced or show incorrect availability status. If an item's correct price is higher than our stated price, we will, at our discretion, either contact you for instructions before shipping or cancel your order and notify you of such cancellation.
            </p>
            <div className="bg-yellow-50 p-4 rounded-md mb-6">
              <h3 className="font-medium text-yellow-700 mb-2">Order Acceptance</h3>
              <p className="text-yellow-600 text-sm">
                Your receipt of an order confirmation does not constitute our acceptance of your order. We reserve the right to limit or cancel quantities purchased per person, per household, or per order. We also reserve the right to refuse any order placed with us.
              </p>
            </div>
            
            <h3 className="text-lg font-semibold mb-3">Taxes</h3>
            <p className="text-gray-600 mb-4">
              You are responsible for any applicable taxes that may be imposed on your purchase, which will be calculated and added at checkout according to the shipping address you provide.
            </p>
          </div>
        </section>
        
        {/* Payment Terms */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiCreditCard className="mr-3 text-primary" /> Payment Terms
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              We accept various payment methods as indicated during the checkout process. By providing a payment method, you represent and warrant that you are authorized to use the designated payment method and that the information you provide is accurate.
            </p>
            <p className="text-gray-600 mb-4">
              You agree to promptly update your account information with any changes in your payment information. We reserve the right to refuse or cancel your order if your payment method is declined or if we suspect fraudulent activity.
            </p>
            <p className="text-gray-600">
              All payments must be made at the time of purchase. We may pre-authorize your payment method at the time you place the order or when the order is shipped.
            </p>
          </div>
        </section>
        
        {/* Shipping and Delivery */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiFileText className="mr-3 text-primary" /> Shipping and Delivery
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              We ship to the address you provide during checkout. You are responsible for ensuring that your shipping information is accurate and complete.
            </p>
            <p className="text-gray-600 mb-4">
              Delivery times are estimates only and commence from the date of shipping, not the date of order. We are not responsible for delays in delivery caused by circumstances beyond our control, including but not limited to, acts of God, severe weather, natural disasters, strikes, civil unrest, or shipping carrier delays.
            </p>
            <p className="text-gray-600">
              Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier. You are responsible for filing any claims with carriers for damaged and/or lost shipments.
            </p>
          </div>
        </section>
        
        {/* Returns and Refunds */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Returns and Refunds</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              Please see our <a href="/returns" className="text-primary hover:underline">Returns Policy</a> for information about returns, exchanges, and refunds. By making a purchase, you agree to the terms of our Returns Policy.
            </p>
          </div>
        </section>
        
        {/* Intellectual Property */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiShield className="mr-3 text-primary" /> Intellectual Property
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              The website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by E-Commerce Store, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            <p className="text-gray-600 mb-4">
              These Terms permit you to use the website for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website, except as follows:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-600">
              <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials.</li>
              <li>You may store files that are automatically cached by your Web browser for display enhancement purposes.</li>
              <li>You may print or download one copy of a reasonable number of pages of the website for your own personal, non-commercial use and not for further reproduction, publication, or distribution.</li>
            </ul>
            <p className="text-gray-600">
              If we provide social media features with certain content, you may take such actions as are enabled by such features.
            </p>
          </div>
        </section>
        
        {/* Prohibited Uses */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiAlertTriangle className="mr-3 text-primary" /> Prohibited Uses
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              You agree not to use the website:
            </p>
            <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-600">
              <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
              <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
              <li>To send, knowingly receive, upload, download, use, or re-use any material that does not comply with these Terms.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
              <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website, or which may harm the Company or users of the website.</li>
            </ul>
            
            <p className="text-gray-600 mb-4">
              Additionally, you agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Use the website in any manner that could disable, overburden, damage, or impair the site.</li>
              <li>Use any robot, spider, or other automatic device, process, or means to access the website for any purpose, including monitoring or copying any of the material on the website.</li>
              <li>Use any manual process to monitor or copy any of the material on the website or for any other unauthorized purpose.</li>
              <li>Use any device, software, or routine that interferes with the proper working of the website.</li>
              <li>Introduce any viruses, Trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful.</li>
              <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the website, the server on which the website is stored, or any server, computer, or database connected to the website.</li>
              <li>Attack the website via a denial-of-service attack or a distributed denial-of-service attack.</li>
              <li>Otherwise attempt to interfere with the proper working of the website.</li>
            </ul>
          </div>
        </section>
        
        {/* Disclaimer of Warranties */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Disclaimer of Warranties</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              THE WEBSITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE WARRANTY OF TITLE, MERCHANTABILITY, NON-INFRINGEMENT OF THIRD PARTIES' RIGHTS, AND FITNESS FOR PARTICULAR PURPOSE.
            </p>
            <p className="text-gray-600 mb-4">
              WE DO NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE WEBSITE OR THE SERVERS THAT MAKE IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>
            <p className="text-gray-600">
              WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE WEBSITE'S CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THIS WEBSITE.
            </p>
          </div>
        </section>
        
        {/* Limitation of Liability */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Limitation of Liability</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              IN NO EVENT WILL THE COMPANY, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE WEBSITE, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
            </p>
            <p className="text-gray-600">
              THE FOREGOING DOES NOT AFFECT ANY LIABILITY THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
            </p>
          </div>
        </section>
        
        {/* Governing Law */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Governing Law</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              These Terms and your use of the website are governed by and construed in accordance with the laws of the State of [Your State], without regard to its conflict of law principles. Any legal suit, action, or proceeding arising out of, or related to, these Terms or the website shall be instituted exclusively in the federal courts of the United States or the courts of the State of [Your State].
            </p>
            <p className="text-gray-600">
              You waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts.
            </p>
          </div>
        </section>
        
        {/* Contact Section */}
        <section>
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">If you have any questions about these Terms of Service, please contact us:</p>
            <div className="space-y-2 text-gray-600">
              <p>E-Commerce Store</p>
              <p>123 E-Commerce Street</p>
              <p>Shopville, SV 12345</p>
              <p>Email: legal@example.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfServicePage; 