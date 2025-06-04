
import React from 'react';
import {
  Calendar,
  Award,
  BookOpen,
  Download,
  Crown,
  LogOut,
  UserCircle,
  ChevronRight,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const statItemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

export const Profile: React.FC = () => {
  const { user, profile, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Mock data - consider fetching this from profile or a related store
  const userStats = {
    coursesCompleted: 3,
    certificatesEarned: 2,
    downloadsMade: 12,
  };

  const achievements = [
    { title: 'First Course Completed', icon: BookOpen, earned: true, date: '2024-01-15' },
    { title: 'Trading Fundamentals Master', icon: Award, earned: true, date: '2024-03-22' },
    { title: 'Risk Management Expert', icon: Award, earned: false, date: null },
    { title: 'Technical Analysis Pro', icon: Crown, earned: false, date: null },
  ];

  const learningProgress = [
    { title: 'Trading Fundamentals', percentage: 100, color: 'bg-green-500' },
    { title: 'Risk Management', percentage: 65, color: 'trading-gradient' }, // Assuming trading-gradient can be applied to bg
    { title: 'Technical Analysis', percentage: 30, color: 'bg-blue-500' }, // Changed from bg-primary for variety
  ];

  if (!user || !profile) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-8 font-sans">
      {/* Profile Header */}
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card className="overflow-hidden shadow-xl bg-card/80 backdrop-blur-lg border-border/20">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Avatar className="w-24 h-24 md:w-28 md:h-28 border-4 border-primary/50 shadow-lg">
                  <AvatarImage src={profile.avatar_url || undefined} alt={profile.full_name || 'User Avatar'} />
                  <AvatarFallback className="text-3xl bg-muted">
                    {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : <UserCircle size={48} />}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-1">
                  {profile.full_name || user.email?.split('@')[0] || 'Valued Trader'}
                </h1>
                <p className="text-base text-muted-foreground mb-3">{user.email}</p>
                
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 mb-4">
                  <Badge 
                    variant={profile.is_premium ? 'default' : 'secondary'}
                    className={`${profile.is_premium ? 'trading-gradient text-primary-foreground' : 'bg-accent text-accent-foreground'} py-1 px-3 text-sm shadow-md`}
                  >
                    <Crown className="w-4 h-4 mr-1.5" />
                    {profile.is_premium ? 'Premium Member' : 'Basic Member'}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Joined {formatDate(profile.created_at)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:ml-auto items-center sm:items-end gap-2 w-full sm:w-auto">
                {!profile.is_premium && (
                  <Button 
                    className="w-full sm:w-auto trading-gradient text-primary-foreground shadow-lg hover:opacity-90 transition-opacity"
                    onClick={() => navigate('/payment')}
                  >
                    Upgrade to Premium <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
                <Button 
                  variant="outline"
                  className="w-full sm:w-auto hover:bg-muted/50 transition-colors"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" /> Sign Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {[ 
          { icon: BookOpen, label: 'Courses Completed', value: userStats.coursesCompleted, color: 'text-blue-500' },
          { icon: Award, label: 'Certificates Earned', value: userStats.certificatesEarned, color: 'text-amber-500' },
          { icon: Download, label: 'Resources Downloaded', value: userStats.downloadsMade, color: 'text-green-500' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} variants={statItemVariants} custom={index}>
              <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-md border-border/20">
                <Icon className={`w-10 h-10 mx-auto mb-3 ${stat.color}`} strokeWidth={1.5} />
                <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Achievements Section */}
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card className="shadow-lg bg-card/80 backdrop-blur-md border-border/20">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tracking-tight">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            {achievements.length > 0 ? (
              <ul className="space-y-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.li 
                      key={index} 
                      variants={listItemVariants} 
                      custom={index}
                      className={`flex items-center p-4 rounded-lg border transition-all duration-300
                        ${achievement.earned 
                          ? 'bg-primary/10 border-primary/30 hover:bg-primary/20'
                          : 'bg-muted/50 border-muted/50 hover:bg-muted/70'}`}
                    >
                      <div className={`p-2 rounded-full mr-4 ${achievement.earned ? 'bg-primary/20' : 'bg-muted'}`}>
                        <Icon className={`w-6 h-6 ${achievement.earned ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {achievement.title}
                        </p>
                        {achievement.earned && achievement.date && (
                          <p className="text-xs text-muted-foreground">Earned on {formatDate(achievement.date)}</p>
                        )}
                      </div>
                      {achievement.earned ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500 ml-4" />
                      ) : (
                        <XCircle className="w-6 h-6 text-slate-400 ml-4" />
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-4">No achievements yet. Keep learning!</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Learning Progress Section */}
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card className="shadow-lg bg-card/80 backdrop-blur-md border-border/20">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tracking-tight">Learning Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {learningProgress.map((item, index) => (
              <motion.div key={item.title} variants={listItemVariants} custom={index}>
                <div className="flex justify-between items-end mb-1.5">
                  <span className="font-medium text-foreground">{item.title}</span>
                  <span className="text-sm font-semibold 
                    ${item.percentage === 100 ? 'text-green-500' : item.percentage > 50 ? 'text-blue-500' : 'text-amber-500'}"
                  >
                    {item.percentage}%
                  </span>
                </div>
                <Progress 
                  value={item.percentage} 
                  className="h-3 rounded-full"
                  indicatorClassName={item.percentage === 100 ? 'bg-green-500' : item.color} // Use item.color for indicator, special case 100%
                />
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

    </div>
  );
};
