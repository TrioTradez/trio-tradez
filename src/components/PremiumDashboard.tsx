
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Crown, Calendar, Video, MessageSquare, TrendingUp, Clock } from 'lucide-react';
import { BookingForm } from './BookingForm';

export const PremiumDashboard: React.FC = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);

  const premiumFeatures = [
    {
      icon: Video,
      title: 'Next 1-on-1 Session',
      description: 'Advanced Market Analysis',
      date: 'Dec 15, 2024 at 3:00 PM',
      status: 'confirmed'
    },
    {
      icon: MessageSquare,
      title: 'Priority Support',
      description: 'Direct access to expert traders',
      action: 'Chat Now'
    },
    {
      icon: TrendingUp,
      title: 'Trading Signals',
      description: 'Live market opportunities',
      count: '12 new signals'
    }
  ];

  const upcomingSessions = [
    {
      date: 'Dec 15, 2024',
      time: '3:00 PM - 4:00 PM',
      topic: 'Advanced Market Analysis',
      status: 'confirmed'
    },
    {
      date: 'Dec 22, 2024',
      time: '2:00 PM - 3:00 PM', 
      topic: 'Risk Management Strategies',
      status: 'pending'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Premium Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-yellow-500/20">
            <Crown className="w-8 h-8 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Premium Dashboard</h1>
            <p className="text-muted-foreground">Access to exclusive premium features</p>
          </div>
        </div>
        <Badge className="bg-yellow-500 text-black font-semibold px-3 py-1">
          Premium Member
        </Badge>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        {premiumFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="glass-card border border-yellow-400/20 hover:border-yellow-400/40 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/20">
                    <Icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {feature.date && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Clock className="w-4 h-4" />
                    {feature.date}
                  </div>
                )}
                {feature.count && (
                  <p className="text-sm font-medium text-yellow-400">{feature.count}</p>
                )}
                {feature.action && (
                  <Button size="sm" className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-black">
                    {feature.action}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Booking Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Book New Session */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-yellow-400" />
              Book 1-on-1 Session
            </CardTitle>
            <CardDescription>
              Schedule a personalized mentorship session with our expert traders
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showBookingForm ? (
              <Button 
                onClick={() => setShowBookingForm(true)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              >
                Schedule New Session
              </Button>
            ) : (
              <div>
                <BookingForm onClose={() => setShowBookingForm(false)} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your scheduled mentorship sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/20 border border-border/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{session.topic}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {session.date} • {session.time}
                      </p>
                    </div>
                    <Badge 
                      variant={session.status === 'confirmed' ? 'default' : 'secondary'}
                      className={session.status === 'confirmed' ? 'bg-green-500' : ''}
                    >
                      {session.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
