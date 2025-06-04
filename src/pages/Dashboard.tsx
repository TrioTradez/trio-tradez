import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { PremiumDashboard } from '../components/PremiumDashboard';
import { BasicDashboard } from '../components/BasicDashboard'; // Basic users will see this
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { profile, isLoading, fetchProfile } = useAuthStore();
  const navigate = useNavigate();

  // Add effect to ensure profile is loaded
  useEffect(() => {
    console.log('Dashboard component mounted - fetching profile');
    fetchProfile();
  }, [fetchProfile]);

  // Early return with loading state if we don't have profile data
  // or if subscription check hasn't completed
  if (isLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Immediate redirect if subscription status is null
  if (profile.is_premium === null) {
    navigate('/select-subscription');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking subscription status...</p>
        </div>
      </div>
    );
  }

  // Only render dashboard content if we have a valid subscription status
  return profile.is_premium ? <PremiumDashboard /> : <BasicDashboard />;
};
