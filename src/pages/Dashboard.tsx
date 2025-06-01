import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { PremiumDashboard } from '../components/PremiumDashboard';
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

  // Effect to handle routing based on account type
  useEffect(() => {
    if (profile) {
      if (isPremium) {
        console.log('Premium user confirmed - staying on dashboard');
        // Stay on dashboard
      } else {
        console.log('Basic user detected, redirecting to library');
        navigate('/library');
      }
    }
  }, [profile, isPremium, navigate]);

  // For premium users, immediately render the PremiumDashboard
  // This is a direct render that bypasses any other checks
  if (isEmailPremium || profile?.is_premium === true) {
    console.log('Premium account confirmed - rendering PremiumDashboard directly');
    return <PremiumDashboard />;
  }

  // This will only render temporarily until the redirect happens
  console.log('Rendering loading state while redirecting basic user');
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecting to your content library...</p>
      </div>
    </div>
  );
};
