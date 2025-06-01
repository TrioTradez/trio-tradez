
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { BookOpen, Video, Download, Lock, Crown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { CourseProgress } from '../components/CourseProgress';

export const Library: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useAuthStore();

  const basicContent = [
    {
      title: 'Trading Fundamentals PDF',
      description: 'Complete guide to trading basics and market analysis',
      type: 'PDF',
      duration: '45 pages',
      available: true,
      icon: BookOpen
    },
    {
      title: 'Risk Management Guide',
      description: 'Essential strategies for protecting your capital',
      type: 'PDF',
      duration: '30 pages',
      available: true,
      icon: BookOpen
    },
    {
      title: 'Basic Video Course Series',
      description: 'Introduction to forex trading and market basics',
      type: 'Video',
      duration: '2 hours',
      available: true,
      icon: Video
    },
    {
      title: 'Market Analysis Techniques',
      description: 'Learn technical and fundamental analysis',
      type: 'Video',
      duration: '1.5 hours',
      available: true,
      icon: Video
    }
  ];

  const premiumContent = [
    {
      title: 'Advanced Trading Strategies',
      description: 'Professional trading techniques and methodologies',
      type: 'Video',
      duration: '4 hours',
      available: false,
      icon: Video
    },
    {
      title: 'Live Trading Sessions',
      description: 'Real-time trading with expert commentary',
      type: 'Live',
      duration: 'Weekly',
      available: false,
      icon: Video
    },
    {
      title: '1-on-1 Mentorship',
      description: 'Personal guidance from trading experts',
      type: 'Session',
      duration: '60 min',
      available: false,
      icon: Crown
    },
    {
      title: 'Exclusive Trading Signals',
      description: 'Premium market opportunities and alerts',
      type: 'Signals',
      duration: 'Daily',
      available: false,
      icon: ArrowRight
    }
  ];

  const handleUpgrade = () => {
    navigate('/payment');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Learning Library</h1>
          <p className="text-muted-foreground mt-2">
            {profile?.is_premium ? 'Access all premium content' : 'Basic plan content - upgrade for more'}
          </p>
        </div>
        {!profile?.is_premium && (
          <Button 
            onClick={handleUpgrade}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
          >
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Premium
          </Button>
        )}
      </div>

      {/* Plan Status */}
      <div className="glass-card p-6 rounded-xl border-l-4 border-l-primary">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">
              {profile?.is_premium ? 'Premium Plan' : 'Basic Plan'}
            </h3>
            <p className="text-muted-foreground">
              {profile?.is_premium 
                ? 'You have access to all content and features' 
                : 'Upgrade to unlock advanced content and 1-on-1 sessions'
              }
            </p>
          </div>
          <Badge 
            className={profile?.is_premium ? 'bg-yellow-500 text-black' : 'bg-primary text-white'}
          >
            {profile?.is_premium ? 'Premium' : 'Basic'}
          </Badge>
        </div>
      </div>

      {/* Basic Content */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Your Available Content</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {basicContent.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="glass-card hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">{item.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{item.duration}</span>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Access
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Premium Content Preview */}
      {!profile?.is_premium && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Premium Content</h2>
            <Button 
              onClick={handleUpgrade}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              Unlock All Content
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {premiumContent.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="glass-card border-dashed border-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium text-muted-foreground">Premium Only</p>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-yellow-500/20">
                          <Icon className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <CardDescription>{item.description}</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-yellow-500 text-black">{item.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{item.duration}</span>
                      <Button size="sm" disabled>
                        <Lock className="w-4 h-4 mr-2" />
                        Locked
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
