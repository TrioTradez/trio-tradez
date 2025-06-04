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

  // The profile.is_premium field is now the single source of truth.
  // It's set after the user makes a choice on SubscriptionSelection.tsx.

  console.log('Dashboard: Profile loaded. is_premium:', profile.is_premium);

  if (profile.is_premium === true) {
    console.log('Dashboard: User is premium. Rendering PremiumDashboard.');
    return <PremiumDashboard />;
  } else {
    // If is_premium is false (either new user default or selected Basic)
    // render the BasicDashboard.
    console.log('Dashboard: User is basic. Rendering BasicDashboard.');
    return <BasicDashboard />;
  }
};
