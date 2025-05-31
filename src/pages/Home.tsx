
import React from 'react';
import { TrendingUp, Award, BookOpen, Users } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { PricingPlans } from '../components/PricingPlans';

export const Home: React.FC = () => {
  return (
    <div className="space-y-16 max-w-[1400px] mx-auto">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="glass-card p-6 text-center">
          <TrendingUp className="w-8 h-8 mx-auto mb-3 text-primary" />
          <h3 className="text-2xl font-bold">500+</h3>
          <p className="text-muted-foreground">Students Trained</p>
        </div>
        <div className="glass-card p-6 text-center">
          <BookOpen className="w-8 h-8 mx-auto mb-3 text-accent" />
          <h3 className="text-2xl font-bold">7+</h3>
          <p className="text-muted-foreground">Years Experience</p>
        </div>
        <div className="glass-card p-6 text-center">
          <Award className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
          <h3 className="text-2xl font-bold">85%</h3>
          <p className="text-muted-foreground">Success Rate</p>
        </div>
        <div className="glass-card p-6 text-center">
          <Users className="w-8 h-8 mx-auto mb-3 text-green-400" />
          <h3 className="text-2xl font-bold">20+</h3>
          <p className="text-muted-foreground">Countries Served</p>
        </div>
      </div>

      {/* Pricing Plans */}
      <div id="pricing-plans">
        <PricingPlans />
      </div>
    </div>
  );
};
