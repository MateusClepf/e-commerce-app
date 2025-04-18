import React from 'react';
import { FiShield, FiUser, FiClock, FiDatabase, FiGlobe, FiLock } from 'react-icons/fi';

const PrivacyPolicyPage = () => {
  const lastUpdated = "July 1, 2023";
  
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-2 text-center">Privacy Policy</h1>
      <p className="text-gray-600 text-center mb-2">Last Updated: {lastUpdated}</p>
      <p className="text-gray-600 text-center mb-12">This Privacy Policy explains how we collect, use, and protect your personal information.</p>
      
      <div className="max-w-4xl mx-auto">
        {/* Introduction Section */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-600 mb-4">
            E-Commerce Store ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from our store.
          </p>
          <p className="text-gray-600 mb-4">
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site. By accessing or using our website, you consent to the collection, use, and disclosure of information in accordance with this policy.
          </p>
          <p className="text-gray-600">
            We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this privacy policy. Any changes or modifications will be effective immediately upon posting the updated Privacy Policy on the site.
          </p>
        </section>
        
        {/* Information We Collect */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiDatabase className="mr-3 text-primary" /> Information We Collect
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
            <p className="text-gray-600 mb-4">
              We may collect personal information that you voluntarily provide to us when you register for an account, express interest in obtaining information about us or our products, participate in activities on the site, or otherwise contact us. The personal information we collect may include:
            </p>
            <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-600">
              <li>Name</li>
              <li>Email address</li>
              <li>Mailing address</li>
              <li>Phone number</li>
              <li>Billing information and payment details</li>
              <li>Login credentials</li>
              <li>Preferences and purchase history</li>
            </ul>
            
            <h3 className="text-lg font-semibold mb-3">Automatically Collected Information</h3>
            <p className="text-gray-600 mb-4">
              When you access our website, we may automatically collect certain information about your device and usage of the site, including:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Device type and browser information</li>
              <li>Operating system</li>
              <li>IP address</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website or application</li>
              <li>Geographic location (country or city level)</li>
              <li>Browsing habits and preferences</li>
            </ul>
          </div>
        </section>
        
        {/* How We Use Your Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiUser className="mr-3 text-primary" /> How We Use Your Information
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              We may use the information we collect about you for various purposes, including:
            </p>
            <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-600">
              <li>Processing and fulfilling your orders and managing your account</li>
              <li>Providing customer service and responding to your inquiries</li>
              <li>Sending administrative information such as order confirmations and updates</li>
              <li>Personalizing your shopping experience and presenting relevant products</li>
              <li>Sending marketing and promotional communications (with opt-out options)</li>
              <li>Analyzing and improving our website functionality and user experience</li>
              <li>Preventing fraudulent transactions and monitoring against theft</li>
              <li>Complying with legal obligations</li>
            </ul>
            
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="font-medium text-blue-700 mb-2">Marketing Communications</h3>
              <p className="text-blue-600 text-sm">
                We may use your personal information to send you marketing communications about our products, services, and promotions. You can opt out of these communications at any time by clicking the "unsubscribe" link in our emails or contacting our customer service team.
              </p>
            </div>
          </div>
        </section>
        
        {/* Information Sharing and Disclosure */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiGlobe className="mr-3 text-primary" /> Information Sharing and Disclosure
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              We may share your information with third parties in the following situations:
            </p>
            <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-600">
              <li><strong>Service Providers:</strong> We may share your information with third-party vendors, service providers, and contractors who perform services for us, such as payment processing, order fulfillment, data analysis, email delivery, and customer service.</li>
              <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information when we believe it is necessary to comply with applicable laws, regulations, legal processes, or governmental requests.</li>
              <li><strong>Protection of Rights:</strong> We may disclose your information to protect the rights, property, or safety of our company, our customers, or others.</li>
            </ul>
            
            <div className="bg-yellow-50 p-4 rounded-md mb-6">
              <h3 className="font-medium text-yellow-700 mb-2">Third-Party Websites</h3>
              <p className="text-yellow-600 text-sm">
                Our website may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. We encourage you to review the privacy policy of every site you visit.
              </p>
            </div>
            
            <p className="text-gray-600">
              We do not sell, rent, or trade your personal information with third parties for their marketing purposes without your explicit consent.
            </p>
          </div>
        </section>
        
        {/* Data Security */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiLock className="mr-3 text-primary" /> Data Security
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
            </p>
            <p className="text-gray-600 mb-4">
              We use industry-standard encryption technologies when transferring and receiving consumer data exchanged with our site. We also have appropriate security measures in place in our physical facilities to protect against the loss, misuse, or alteration of information that we have collected from you at our site.
            </p>
            <div className="bg-green-50 p-4 rounded-md">
              <h3 className="font-medium text-green-700 mb-2">Payment Security</h3>
              <p className="text-green-600 text-sm">
                We use trusted third-party payment processors for all transactions. We do not store your credit card information on our servers. All payment information is encrypted during transmission using secure SSL (Secure Socket Layer) protocols.
              </p>
            </div>
          </div>
        </section>
        
        {/* Data Retention */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiClock className="mr-3 text-primary" /> Data Retention
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              We will retain your personal information only for as long as necessary to fulfill the purposes for which we collected it, including to satisfy any legal, accounting, or reporting requirements.
            </p>
            <p className="text-gray-600 mb-4">
              To determine the appropriate retention period for personal information, we consider the amount, nature, and sensitivity of the data, the potential risk of harm from unauthorized use or disclosure, the purposes for which we process the data, and applicable legal requirements.
            </p>
            <p className="text-gray-600">
              In some circumstances, we may anonymize or aggregate your personal information so that it can no longer be associated with you, in which case we may use such information without further notice to you.
            </p>
          </div>
        </section>
        
        {/* Your Privacy Rights */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiShield className="mr-3 text-primary" /> Your Privacy Rights
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              Depending on your location, you may have various rights regarding your personal information, which may include:
            </p>
            <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-600">
              <li><strong>Access:</strong> You have the right to request access to the personal information we have collected about you.</li>
              <li><strong>Correction:</strong> You have the right to request that we correct any information you believe is inaccurate or incomplete.</li>
              <li><strong>Deletion:</strong> You have the right to request that we delete your personal information, subject to certain exceptions.</li>
              <li><strong>Data Portability:</strong> You have the right to request that we transfer the data we have collected to another organization or directly to you, under certain conditions.</li>
              <li><strong>Opt-Out:</strong> You have the right to opt out of certain uses of your personal information, such as marketing communications.</li>
            </ul>
            
            <p className="text-gray-600 mb-4">
              To exercise these rights, please contact us using the information provided in the "Contact Us" section below. We will respond to your request within a reasonable timeframe.
            </p>
            
            <div className="bg-indigo-50 p-4 rounded-md">
              <h3 className="font-medium text-indigo-700 mb-2">California Residents</h3>
              <p className="text-indigo-600 text-sm">
                If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA) regarding your personal information. Please contact us for more information about your California privacy rights.
              </p>
            </div>
          </div>
        </section>
        
        {/* Children's Privacy */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Children's Privacy</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately. If we become aware that we have collected personal information from children without verification of parental consent, we will take steps to remove that information from our servers.
            </p>
          </div>
        </section>
        
        {/* Contact Section */}
        <section>
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">If you have questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
            <div className="space-y-2 text-gray-600">
              <p>E-Commerce Store</p>
              <p>123 E-Commerce Street</p>
              <p>Shopville, SV 12345</p>
              <p>Email: privacy@example.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 