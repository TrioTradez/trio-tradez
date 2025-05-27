
import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { Badge } from '../components/ui/badge';

export const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: '5 Essential Risk Management Rules Every Trader Must Follow',
      excerpt: 'Learn the fundamental risk management principles that separate successful traders from those who lose money in the markets.',
      author: 'TradeMaster Team',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'Risk Management',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'Understanding Market Psychology: Fear vs Greed',
      excerpt: 'Explore how emotions drive market movements and learn to master your trading psychology for better results.',
      author: 'TradeMaster Team',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'Psychology',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'Technical Analysis Basics: Support and Resistance Levels',
      excerpt: 'Master the art of identifying key support and resistance levels to improve your entry and exit timing.',
      author: 'TradeMaster Team',
      date: '2024-01-05',
      readTime: '10 min read',
      category: 'Technical Analysis',
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop'
    },
    {
      id: 4,
      title: 'Building Your First Trading Strategy',
      excerpt: 'Step-by-step guide to creating a robust trading strategy that fits your personality and risk tolerance.',
      author: 'TradeMaster Team',
      date: '2023-12-28',
      readTime: '12 min read',
      category: 'Strategy',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'
    },
    {
      id: 5,
      title: 'The Importance of Backtesting Your Trading Ideas',
      excerpt: 'Learn how to properly backtest your trading strategies to validate their effectiveness before risking real money.',
      author: 'TradeMaster Team',
      date: '2023-12-20',
      readTime: '9 min read',
      category: 'Strategy',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
    },
    {
      id: 6,
      title: 'Market Trends: How to Identify and Trade with the Flow',
      excerpt: 'Discover how to identify market trends early and position yourself to profit from major market movements.',
      author: 'TradeMaster Team',
      date: '2023-12-15',
      readTime: '7 min read',
      category: 'Technical Analysis',
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop'
    }
  ];

  const categories = ['All', 'Risk Management', 'Psychology', 'Technical Analysis', 'Strategy'];

  return (
    <div className="container mx-auto px-6 py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Trading <span className="text-yellow-400">Blog</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Stay updated with the latest trading insights, strategies, and market analysis 
          from our team of experienced traders.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category, index) => (
          <Badge 
            key={index}
            variant={index === 0 ? "default" : "secondary"}
            className="cursor-pointer hover:bg-yellow-500 hover:text-black"
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="glass-card rounded-xl overflow-hidden hover:scale-105 transition-transform">
            <div className="aspect-video overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <Badge variant="secondary" className="mb-3">
                {post.category}
              </Badge>
              <h2 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h2>
              <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="glass-card rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Subscribe to our newsletter and never miss the latest trading insights and strategies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg bg-background border border-border"
          />
          <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};
