
import React from 'react';
import { BookOpen, Video, Users, MessageCircle, TrendingUp, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Services: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: BookOpen,
      title: 'Trading Courses',
      description: 'Comprehensive video courses covering everything from basics to advanced strategies.',
      features: ['50+ Video Lessons', 'Downloadable Resources', 'Lifetime Access', 'Progress Tracking']
    },
    {
      icon: Users,
      title: '1-on-1 Mentorship',
      description: 'Personalized coaching sessions with experienced trading professionals.',
      features: ['Weekly Sessions', 'Custom Strategy Development', 'Portfolio Review', 'Direct Support']
    },
    {
      icon: MessageCircle,
      title: 'Community Access',
      description: 'Join our exclusive community of traders sharing insights and strategies.',
      features: ['Private Discord', 'Daily Market Analysis', 'Trade Ideas', 'Peer Support']
    },
    {
      icon: TrendingUp,
      title: 'Live Trading Sessions',
      description: 'Watch real-time trading decisions and learn from live market analysis.',
      features: ['Weekly Live Streams', 'Real-time Commentary', 'Q&A Sessions', 'Recorded Replays']
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Learn to protect your capital with proven risk management techniques.',
      features: ['Position Sizing', 'Stop Loss Strategies', 'Portfolio Management', 'Psychology Training']
    },
    {
      icon: Video,
      title: 'Premium Content',
      description: 'Access exclusive trading strategies and advanced market analysis.',
      features: ['Advanced Strategies', 'Market Insights', 'Trading Tools', 'Expert Analysis']
    }
  ];

  return (
    <div className="container mx-auto px-6 py-16 space-y-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Our <span className="text-yellow-400">Services</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Comprehensive trading education and support services designed to accelerate 
          your journey to profitable trading.
        </p>
        <Button 
          size="lg"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
          onClick={() => navigate('/login')}
        >
          Get Started Today
        </Button>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div key={index} className="glass-card rounded-xl p-8 hover:scale-105 transition-transform">
              <div className="p-3 rounded-lg bg-yellow-500/20 w-fit mb-6">
                <Icon className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="glass-card rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Trading Journey?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Join thousands of successful traders who have transformed their financial future with our proven methods.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            onClick={() => navigate('/login')}
          >
            Start Learning Now
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => navigate('/contact')}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};
