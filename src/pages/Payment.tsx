
import React, { useState } from 'react';
import { Crown, Check, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { upgradeToPremium } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    upgradeToPremium();
    setIsProcessing(false);
    
    // Show success and redirect
    alert('Welcome to TradeMaster Premium! 🎉');
    navigate('/');
  };

  const features = [
    'Access to all premium courses',
    'Advanced trading strategies',
    'Downloadable resources',
    'Priority support',
    'Exclusive webinars',
    'Trading signals',
    'Portfolio analysis tools',
    'Certificate of completion'
  ];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Premium Features */}
          <div className="glass-card rounded-xl p-8">
            <div className="text-center mb-8">
              <Crown className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
              <h1 className="text-3xl font-bold mb-2">TradeMaster Premium</h1>
              <p className="text-muted-foreground">
                Unlock advanced trading education and tools
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold mb-2">$29.99</div>
              <div className="text-muted-foreground">per month</div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="glass-card rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Complete Your Purchase</h2>
            
            <form onSubmit={(e) => { e.preventDefault(); handleUpgrade(); }} className="space-y-6">
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
                  <span>TradeMaster Premium</span>
                  <span className="font-semibold">$29.99</span>
                </div>
                <div className="flex justify-between items-center mb-6 text-lg font-bold">
                  <span>Total</span>
                  <span>$29.99</span>
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
