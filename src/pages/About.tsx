
import React from 'react';
import { Award, Users, TrendingUp, Shield } from 'lucide-react';

export const About: React.FC = () => {
  const stats = [
    { icon: Users, number: '500+', label: 'Students Trained' },
    { icon: TrendingUp, number: '85%', label: 'Success Rate' },
    { icon: Award, number: '7+', label: 'Years Experience' },
    { icon: Shield, number: '20+', label: 'Countries Served' }
  ];

  return (
    <div className="container mx-auto px-6 py-16 space-y-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          About <span className="text-yellow-400">TradeMaster</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Empowering traders worldwide with proven strategies, comprehensive education, 
          and personalized mentorship to achieve consistent profitability in the markets.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="glass-card p-6 text-center rounded-xl">
              <Icon className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Story Section */}
      <div className="glass-card rounded-xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              Founded with a mission to democratize trading education, TradeMaster began as a 
              small initiative to share proven trading strategies with aspiring traders. Over 
              the years, we've evolved into a comprehensive educational platform that serves 
              traders across 20+ countries.
            </p>
            <p>
              Our approach combines technical analysis, risk management, and psychological 
              discipline to create well-rounded traders who can navigate various market 
              conditions with confidence.
            </p>
            <p>
              With over 7 years of experience and a proven track record of success, we're 
              committed to providing the highest quality trading education that delivers 
              real results for our students.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-card rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-yellow-400">Our Mission</h3>
          <p className="text-muted-foreground">
            To provide world-class trading education that empowers individuals to achieve 
            financial independence through disciplined, data-driven trading strategies.
          </p>
        </div>
        <div className="glass-card rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-yellow-400">Our Vision</h3>
          <p className="text-muted-foreground">
            To become the global leader in trading education, creating a community of 
            successful traders who consistently profit while managing risk effectively.
          </p>
        </div>
      </div>
    </div>
  );
};
