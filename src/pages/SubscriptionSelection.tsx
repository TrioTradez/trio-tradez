import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle, XCircle, Zap, ShieldCheck, BookOpen, BarChart3, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { motion } from 'framer-motion';

const SubscriptionSelection: React.FC = () => {
  const navigate = useNavigate();
  const {
    profile,
    isAuthenticated,
    isLoading: authLoading,
    updateSubscription,
    fetchProfile,
    signOut
  } = useAuthStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBack = async () => {
    // Sign out and navigate to login
    await signOut();
    navigate('/login');
  };

  useEffect(() => {
    // Ensure profile is loaded before making decisions
    if (!authLoading && !isAuthenticated) {
      navigate('/login'); // User not logged in
      return;
    }

    if (!authLoading && isAuthenticated && profile === null) {
      fetchProfile(); // Profile not yet loaded, fetch it
      return;
    }

    // If the profile is loaded and the user has already selected a subscription (true or false),
    // redirect them to dashboard
    if (profile && profile.is_premium !== null) {
      console.log('User already has a subscription status, redirecting to dashboard.');
      navigate('/dashboard');
      return;
    }
    // If profile.is_premium is null, user stays on this page to choose subscription
  }, [isAuthenticated, profile, authLoading, navigate, fetchProfile]);

  const handleSelectSubscription = (planName: string, planPrice: string, isPremiumChoice: boolean) => {
    setError(null);
    setIsProcessing(true);
    // Navigate to payment page with plan details in state
    navigate('/payment', {
      state: {
        planName,
        planPrice,
        isPremiumChoice
      }
    });
  };

  if (authLoading || profile === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p>Loading your account details...</p>
      </div>
    );
  }

  const commonFeatures = [
    { text: 'Access to educational content', basic: true, premium: true, icon: <BookOpen className="w-5 h-5 mr-2 text-primary" /> },
    { text: 'Portfolio Tracking', basic: true, premium: true, icon: <BarChart3 className="w-5 h-5 mr-2 text-primary" /> },
    { text: 'Community Access', basic: true, premium: true, icon: <ShieldCheck className="w-5 h-5 mr-2 text-primary" /> },
  ];

  const premiumOnlyFeatures = [
    { text: 'Advanced Market Analytics', premium: true, icon: <Zap className="w-5 h-5 mr-2 text-yellow-500" /> },
    { text: 'Real-time Data Streams', premium: true, icon: <Zap className="w-5 h-5 mr-2 text-yellow-500" /> },
    { text: 'Exclusive Trading Tools', premium: true, icon: <Zap className="w-5 h-5 mr-2 text-yellow-500" /> },
    { text: 'Priority Support', premium: true, icon: <Zap className="w-5 h-5 mr-2 text-yellow-500" /> },
  ];

  const renderFeature = (feature: { text: string; basic?: boolean; premium: boolean; icon: JSX.Element }, isPremiumCard: boolean) => (
    <li key={feature.text} className="flex items-center mb-2">
      {isPremiumCard || feature.basic ? 
        <CheckCircle className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" /> : 
        <XCircle className="w-5 h-5 mr-2 text-muted-foreground flex-shrink-0" />}
      <span className={isPremiumCard || feature.basic ? '' : 'text-muted-foreground line-through'}>{feature.text}</span>
    </li>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background to-background/80">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-4 left-4 z-10"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="flex items-center gap-2 text-muted-foreground/70 hover:text-white hover:bg-primary/20 hover:translate-x-[-2px] transition-all duration-200 ease-in-out group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:text-primary group-hover:scale-110" />
          <span className="font-semibold">Back to Login</span>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold mb-3 gradient-text">Choose Your Plan</h1>
        <p className="text-muted-foreground max-w-lg">
          Welcome, {profile?.full_name || 'Trader'}! Select a plan that best fits your trading journey with TrioTradez Academy.
        </p>
      </motion.div>

      {error && (
        <Alert variant="destructive" className="mb-6 max-w-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Basic Plan Card */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card className="h-full flex flex-col glass-card shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl">Basic Access</CardTitle>
              <CardDescription>Start with essential tools and resources to build your foundation.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <h3 className="text-3xl font-bold mb-4">$9<span className="text-sm font-normal text-muted-foreground">/month</span></h3>
              <ul className="mb-6">
                {commonFeatures.map(f => renderFeature(f, false))}
                {premiumOnlyFeatures.map(f => renderFeature({ ...f, basic: false }, false))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSelectSubscription('Basic Access', '$9/month', false)} 
                variant="outline" 
                className="w-full" 
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Choose Basic'}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Premium Plan Card */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <Card className="h-full flex flex-col glass-card border-primary border-2 relative overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-primary/5">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg">
              Recommended
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Premium Pro</CardTitle>
              <CardDescription>Unlock the full potential of TrioTradez with advanced features and real-time insights.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <h3 className="text-3xl font-bold mb-4">$19<span className="text-sm font-normal text-muted-foreground">/month</span></h3>
              <ul className="mb-6">
                {commonFeatures.map(f => renderFeature(f, true))}
                {premiumOnlyFeatures.map(f => renderFeature(f, true))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSelectSubscription('Premium Pro', '$19/month', true)} 
                className="w-full trading-gradient text-white" 
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Go Premium'}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SubscriptionSelection;
