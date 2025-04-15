import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { FiMail, FiArrowRight } from 'react-icons/fi';
import PageTransition from '../../shared/PageTransition';
import { AnimatedFormField, AnimatedButton } from '../../../components/ui';

const ForgotPasswordPage = () => {
  const { forgotPassword, loading, error } = useContext(AuthContext);
  
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    setEmail(e.target.value);
    
    // Clear error when user types
    if (formErrors.email) {
      setFormErrors({});
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitted(true);
    
    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      // Error is handled by AuthContext
      setSuccess(false);
    }
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Reset your password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email to receive a password reset link
            </p>
          </div>
          
          {!submitted || (!success && error) ? (
            <>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <AnimatedFormField
                  label="Email address"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Email address"
                  error={formErrors.email}
                  icon={<FiMail className="h-5 w-5 text-gray-400" />}
                  required
                />
                
                <div>
                  <AnimatedButton
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <FiArrowRight className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                    </span>
                    {loading ? 'Sending...' : 'Send reset link'}
                  </AnimatedButton>
                </div>
              </form>
            </>
          ) : (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">If an account exists with this email, we've sent a password reset link.</p>
                  <p className="text-sm text-green-700 mt-2">Please check your email and follow the instructions to reset your password.</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-center space-x-4 mt-4">
            <Link to="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Back to login
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/register" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ForgotPasswordPage; 