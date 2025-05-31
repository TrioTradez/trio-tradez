import React from 'react';
import { Button } from './ui/button';
import { TrendingUp, BookOpen, Shield, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BarChart3,
      title: 'Data-Driven Strategies',
      description: 'Trading approaches backed by market analysis'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Learning',
      description: 'From basics to advanced trading techniques'
    },
    {
      icon: TrendingUp,
      title: 'Proven Track Record',
      description: 'Consistent results over 7+ years in the markets'
    },
    {
      icon: Shield,
      title: 'Risk Management Focus',
      description: 'Learn to protect your capital while growing it'
    }
  ];

  const stats = [
    { number: '500+', label: 'Students Trained' },
    { number: '20+', label: 'Countries' },
    { number: '85%', label: 'Success Rate' },
    { number: '7+', label: 'Years Experience' }
  ];

  return (
    <div className="relative">
      {/* Main Hero Content */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-16 mb-16">
        <div className="flex-1 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Trade Smarter.{' '}
            <span className="text-yellow-400">Profit Faster.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
            Expert forex trading training and digital marketing solutions to
            elevate your trading and business. Learn proven strategies that
            deliver results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-6 text-lg w-full sm:w-auto"
              onClick={() => navigate('/payment')}
            >
              Book a Session →
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg w-full sm:w-auto"
              onClick={() => navigate('/library')}
            >
              Explore Courses
            </Button>
          </div>
        </div>
        
        {/* Features Panel */}
        <div className="flex-1 w-full lg:max-w-md">
          <div className="glass-card p-6 sm:p-8 rounded-2xl">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-yellow-400">
              Why Choose TradeMaster?
            </h3>
            
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-yellow-500/20">
                      <Icon className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="glass-card p-6 text-center rounded-xl">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">
              {stat.number}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
