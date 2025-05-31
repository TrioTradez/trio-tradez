
import React from 'react';
import { useAuthStore } from '../store/authStore';
import { PremiumDashboard } from '../components/PremiumDashboard';
import { Library } from './Library';

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();

  if (user?.isPremium) {
    return <PremiumDashboard />;
  }

  // For basic users, show the library as the main dashboard
  return <Library />;
};
