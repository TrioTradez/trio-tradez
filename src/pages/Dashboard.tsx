
import React from 'react';
import { useAuthStore } from '../store/authStore';
import { PremiumDashboard } from '../components/PremiumDashboard';
import { Library } from './Library';

export const Dashboard: React.FC = () => {
  const { profile, isLoading } = useAuthStore();

  console.log('Dashboard - Profile:', profile, 'Loading:', isLoading);

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

  if (profile?.is_premium) {
    console.log('Showing PremiumDashboard');
    return <PremiumDashboard />;
  }

  console.log('Showing Library (basic dashboard)');
  // For basic users, show the library as the main dashboard
  return <Library />;
};
