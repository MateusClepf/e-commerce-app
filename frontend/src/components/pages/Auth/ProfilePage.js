import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import './AuthForms.css';

const ProfilePage = () => {
  const { user, loading, error, updateProfile, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated && !loading) {
      navigate('/login', { state: { from: { pathname: '/profile' } } });
      return;
    }
    
    // Populate form with user data
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || '',
        country: user.country || 'US'
      });
    }
  }, [user, isAuthenticated, loading, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear success message when form changes
    if (updateSuccess) {
      setUpdateSuccess(false);
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await updateProfile(formData);
      setUpdateSuccess(true);
    } catch (err) {
      // Error is handled by AuthContext
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }
  
  return (
    <div className="auth-page">
      <div className="auth-container profile-container">
        <h1>My Profile</h1>
        
        {error && <div className="alert alert-danger">{error}</div>}
        {updateSuccess && <div className="alert alert-success">Profile updated successfully!</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Personal Information</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`} 
              />
              {formErrors.firstName && <div className="invalid-feedback">{formErrors.firstName}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
                className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`} 
              />
              {formErrors.lastName && <div className="invalid-feedback">{formErrors.lastName}</div>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className={`form-control ${formErrors.email ? 'is-invalid' : ''}`} 
                disabled // Email cannot be changed
              />
              {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                className="form-control" 
              />
            </div>
          </div>
          
          <h2>Address Information</h2>
          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input 
              type="text" 
              id="address" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              className="form-control" 
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input 
                type="text" 
                id="city" 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
                className="form-control" 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input 
                type="text" 
                id="state" 
                name="state" 
                value={formData.state} 
                onChange={handleChange} 
                className="form-control" 
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="zipCode">ZIP Code</label>
              <input 
                type="text" 
                id="zipCode" 
                name="zipCode" 
                value={formData.zipCode} 
                onChange={handleChange} 
                className="form-control" 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select 
                id="country" 
                name="country" 
                value={formData.country} 
                onChange={handleChange} 
                className="form-control"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
          </div>
          
          <div className="form-buttons">
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
            
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;