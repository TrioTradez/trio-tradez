
import React from 'react';
import { Calendar, Award, BookOpen, Download, Crown } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { user, profile, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const achievements = [
    { title: 'First Course Completed', icon: BookOpen, earned: true },
    { title: 'Trading Fundamentals Master', icon: Award, earned: true },
    { title: 'Risk Management Expert', icon: Award, earned: false },
    { title: 'Technical Analysis Pro', icon: Crown, earned: false },
  ];

  if (!user || !profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="glass-card rounded-xl p-8">
        <div className="flex items-center gap-6 mb-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profile.avatar_url || undefined} />
            <AvatarFallback className="text-2xl">
              {(profile.full_name || user.email || 'U').charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {profile.full_name || user.email?.split('@')[0] || 'User'}
            </h1>
            <p className="text-muted-foreground mb-3">{user.email}</p>
            
            <div className="flex items-center gap-4">
              <Badge variant={profile.is_premium ? "default" : "secondary"} className="trading-gradient text-white">
                {profile.is_premium ? (
                  <>
                    <Crown className="w-4 h-4 mr-1" />
                    Premium Member
                  </>
                ) : (
                  'Basic Member'
                )}
              </Badge>
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Joined {formatDate(profile.created_at)}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            {!profile.is_premium && (
              <Button className="trading-gradient text-white mb-3" onClick={() => navigate('/payment')}>
                Upgrade to Premium
              </Button>
            )}
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 text-center">
          <BookOpen className="w-8 h-8 mx-auto mb-3 text-primary" />
          <h3 className="text-2xl font-bold">3</h3>
          <p className="text-muted-foreground">Courses Completed</p>
        </div>
        <div className="glass-card p-6 text-center">
          <Award className="w-8 h-8 mx-auto mb-3 text-accent" />
          <h3 className="text-2xl font-bold">2</h3>
          <p className="text-muted-foreground">Certificates</p>
        </div>
        <div className="glass-card p-6 text-center">
          <Download className="w-8 h-8 mx-auto mb-3 text-green-400" />
          <h3 className="text-2xl font-bold">12</h3>
          <p className="text-muted-foreground">Downloads</p>
        </div>
      </div>

      {/* Achievements */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Achievements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${
                  achievement.earned 
                    ? 'bg-primary/10 border-primary/20' 
                    : 'bg-muted/50 border-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-6 h-6 ${
                    achievement.earned ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <span className={`font-medium ${
                    achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {achievement.title}
                  </span>
                  {achievement.earned && (
                    <Badge variant="outline" className="ml-auto">
                      Earned
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Learning Progress */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Learning Progress</h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Trading Fundamentals</span>
              <span className="text-sm text-muted-foreground">100%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full w-full"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Risk Management</span>
              <span className="text-sm text-muted-foreground">65%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="trading-gradient h-2 rounded-full w-2/3"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Technical Analysis</span>
              <span className="text-sm text-muted-foreground">30%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
