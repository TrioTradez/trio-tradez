
import React, { useState, useEffect } from 'react';
import { Crown, Check, ArrowLeft, ShieldAlert } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../components/ui/use-toast';

export const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { updateSubscription, profile } = useAuthStore();
  const location = useLocation();
  // Destructure with optional chaining and defaults for robustness
  const planName = location.state?.planName as string | undefined;
  const planPrice = location.state?.planPrice as string | undefined;
  const isPremiumChoice = location.state?.isPremiumChoice as boolean | undefined;
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [initialStateChecked, setInitialStateChecked] = useState(false);

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      if (typeof isPremiumChoice !== 'boolean') {
        throw new Error('Subscription choice not specified.');
      }
      const result = await updateSubscription(isPremiumChoice);
      if (result?.error) {
        throw new Error(result.error.message || 'Failed to update subscription.');
      }
      setIsProcessing(false);
      
      toast({
        title: `Successfully Subscribed to ${planName}! 🎉`,
        description: `You now have access to your ${planName} features.`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Payment Failed",
        description: (error as Error).message || "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    // Mark that the component has mounted and had a chance to receive location.state
    setInitialStateChecked(true);
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    if (initialStateChecked) {
      if (location.state === null || location.state === undefined || !planName || !planPrice || typeof isPremiumChoice === 'undefined') {
        toast({
          title: 'Error',
          description: 'Subscription plan details missing or invalid. Redirecting to plan selection.',
          variant: 'destructive',
        });
        navigate('/select-subscription');
      }
    }
  }, [initialStateChecked, location.state, planName, planPrice, isPremiumChoice, navigate, toast]);

  if (!initialStateChecked || !planName || !planPrice || typeof isPremiumChoice === 'undefined') {
    // Show a loading state until initialStateChecked is true and details are confirmed,
    // or if details are missing, the useEffect will trigger navigation.
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="text-center">
          {initialStateChecked && (!planName || !planPrice || typeof isPremiumChoice === 'undefined') ? 
            <ShieldAlert className="w-12 h-12 mx-auto mb-4 text-destructive" /> : 
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>}
          <p className="text-muted-foreground">
            {initialStateChecked && (!planName || !planPrice || typeof isPremiumChoice === 'undefined') 
              ? 'Invalid payment details. Redirecting...' 
              : 'Loading payment details...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/select-subscription')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Plan Selection
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Premium Features */}
          {/* Plan Details Display */}
          <div className="glass-card rounded-xl p-8">
            <div className="text-center mb-8">
              {isPremiumChoice ? 
                <Crown className="w-16 h-16 mx-auto mb-4 text-yellow-400" /> : 
                <Check className="w-16 h-16 mx-auto mb-4 text-green-500" />}
              <h1 className="text-3xl font-bold mb-2">{planName}</h1>
              <p className="text-muted-foreground">
                You are about to subscribe to the {planName}.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{planPrice}</div>
              {/* <div className="text-muted-foreground">per month</div> Removed as price string includes it */}
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Confirm your selection and proceed to payment. You can review the features on the previous page if needed.
            </p>
          </div>

          {/* Payment Form */}
          <div className="glass-card rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Complete Your Purchase</h2>
            
            <form onSubmit={(e) => { e.preventDefault(); handleConfirmPayment(); }} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input id="cardName" placeholder="John Doe" />
                </div>
                
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span>{planName}</span>
                  <span className="font-semibold">{planPrice}</span>
                </div>
                <div className="flex justify-between items-center mb-6 text-lg font-bold">
                  <span>Total</span>
                  <span>{planPrice}</span>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full trading-gradient text-white"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Complete Purchase'}
                </Button>
              </div>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              This is a demo payment form. No actual charges will be made.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
