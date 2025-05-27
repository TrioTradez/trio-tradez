
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Index = () => {
  const { isAuthenticated } = useAuthStore();
  
  // Redirect to login if not authenticated, otherwise to home
  return <Navigate to={isAuthenticated ? "/" : "/login"} replace />;
};

export default Index;
