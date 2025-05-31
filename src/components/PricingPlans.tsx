
import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Check, Star, Crown, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PricingPlans: React.FC = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Basic',
      price: '$99',
      period: '/month',
      description: 'Perfect for beginners starting their trading journey',
      features: [
        'Access to all PDF materials',
        'Basic video courses',
        'Trading fundamentals',
        'Risk management basics',
        'Market analysis guides',
        'Email support',
        'Mobile app access'
      ],
      icon: BookOpen,
      popular: false
    },
    {
      name: 'Premium',
      price: '$299',
      period: '/month',
      description: 'Advanced training with personal mentorship',
      features: [
        'Everything in Basic plan',
        'Advanced video masterclasses',
        '1-on-1 mentorship sessions',
        'Live trading sessions',
        'Priority support',
        'Exclusive trading signals',
        'Custom trading strategies',
        'Weekly group calls',
        'Advanced market analysis'
      ],
      icon: Crown,
      popular: true
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Choose Your <span className="text-yellow-400">Learning Plan</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Select the perfect plan to accelerate your trading journey and achieve consistent profitability
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card 
              key={plan.name} 
              className={`relative glass-card border-2 transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'border-yellow-400 shadow-lg shadow-yellow-400/20' 
                  : 'border-border/50 hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  plan.popular ? 'bg-yellow-400/20' : 'bg-primary/20'
                }`}>
                  <Icon className={`w-8 h-8 ${plan.popular ? 'text-yellow-400' : 'text-primary'}`} />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
                <div className="flex items-baseline justify-center gap-1 mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  className={`w-full font-semibold ${
                    plan.popular 
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                  onClick={() => navigate('/login')}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
