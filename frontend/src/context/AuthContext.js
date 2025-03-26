import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // API URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  // Register user
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout user
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  
  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const config = {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      };
      
      const response = await axios.put(`${API_URL}/auth/profile`, userData, config);
      
      const updatedUser = { ...user, ...response.data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      register,
      login,
      logout,
      updateProfile,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};