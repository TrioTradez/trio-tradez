import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { PremiumDashboard } from '../components/PremiumDashboard';
import { BasicDashboard } from '../components/BasicDashboard';
import { Library } from './Library';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { profile, isLoading, fetchProfile } = useAuthStore();
  const navigate = useNavigate();

  // Add effect to ensure profile is loaded
  useEffect(() => {
    console.log('Dashboard component mounted - fetching profile');
    fetchProfile();
  }, [fetchProfile]);

  console.log('Dashboard render - Full Profile:', profile);
  console.log('Is premium check:', profile?.is_premium);
  console.log('Loading state:', isLoading);

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

  // Ensure profile exists before checking premium status
  if (!profile) {
    console.log('No profile found, fetching again...');
    fetchProfile();
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  // We need to check the user email from the session
  const { session } = useAuthStore();
  const userEmail = session?.user?.email;
  
  // Check if user has premium email
  const isEmailPremium = userEmail === 'premium@demo.com';
  
  // Force premium status if email is premium@demo.com
  const isPremium = isEmailPremium || profile.is_premium === true;
  
  console.log('Profile data received in Dashboard:', profile);
  console.log('Email check - isPremium:', isEmailPremium);
  console.log('Profile is_premium value:', profile.is_premium);
  console.log('Final premium status decision:', isPremium);

  // No longer need to redirect - we render the appropriate dashboard based on account type

  // Render the appropriate dashboard based on user type
  if (isEmailPremium || profile?.is_premium === true) {
    console.log('Premium account confirmed - rendering PremiumDashboard');
    return <PremiumDashboard />;
  } else {
    console.log('Basic account confirmed - rendering BasicDashboard');
    return <BasicDashboard />;
  }
};
