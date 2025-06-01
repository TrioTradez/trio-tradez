
import React from 'react';
import { useAuthStore } from '../store/authStore';
import { PremiumDashboard } from '../components/PremiumDashboard';
import { Library } from './Library';

export const Dashboard: React.FC = () => {
  const { profile, isLoading } = useAuthStore();

  console.log('Dashboard render - Profile:', profile, 'Loading:', isLoading);
  console.log('Is premium check:', profile?.is_premium);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Check if user is premium
  if (profile?.is_premium === true) {
    console.log('Rendering PremiumDashboard for premium user');
    return <PremiumDashboard />;
  }

  console.log('Rendering Library for basic user');
  // For basic users, show the library as the main dashboard
  return <Library />;
};
