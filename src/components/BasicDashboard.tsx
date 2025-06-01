import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { AuroraBackground } from './ui/aurora-background';
import { CourseProgress } from './CourseProgress';
import { motion } from 'framer-motion';
import {
  ChartLine,
  BookOpen,
  Video,
  Compass,
  Calendar,
  TrendingUp,
  Clock,
  Check,
  Crown,
  GraduationCap,
  LucideIcon,
  Bell,
  Award,
  Star,
  Trophy,
  History
} from 'lucide-react';

export const BasicDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for basic users
  const learningPathProgress = 32; // percent
  const upcomingWebinars = [
    {
      title: 'Introduction to Technical Analysis',
      date: 'Jun 5, 2025',
      time: '10:00 AM',
      instructor: 'Sarah Miller',
      spots: '132/200',
      free: true
    },
    {
      title: 'Risk Management Fundamentals',
      date: 'Jun 8, 2025',
      time: '2:00 PM',
      instructor: 'Michael Chen',
      spots: '98/150',
      free: true
    }
  ];

  const quickStartGuides = [
    {
      title: 'Platform Navigation',
      description: 'Learn how to use the trading platform effectively',
      icon: Compass,
      duration: '10 min',
      completed: true
    },
    {
      title: 'Understanding Charts',
      description: 'Basic chart patterns and analysis techniques',
      icon: ChartLine,
      duration: '15 min',
      completed: true
    },
    {
      title: 'Market Orders',
      description: 'How to place your first market order',
      icon: TrendingUp,
      duration: '12 min',
      completed: false
    },
    {
      title: 'Risk Calculation',
      description: 'Calculate position sizes and risk levels',
      icon: Calculator,
      duration: '18 min',
      completed: false
    }
  ];

  const recentLessons = [
    {
      title: 'Candlestick Patterns',
      progress: 75,
      lastAccessed: '2 days ago',
      duration: '45 min'
    },
    {
      title: 'Support & Resistance',
      progress: 40,
      lastAccessed: '1 week ago',
      duration: '30 min'
    },
    {
      title: 'Trading Psychology',
      progress: 10,
      lastAccessed: 'Just started',
      duration: '60 min'
    }
  ];

  const basicResources = [
    { 
      title: 'Forex Fundamentals',
      type: 'E-Book',
      icon: BookOpen,
      tag: 'Beginner'
    },
    { 
      title: 'Chart Analysis 101',
      type: 'Video Course',
      icon: Video,
      tag: 'Essential'
    },
    { 
      title: 'Weekly Market Brief',
      type: 'Newsletter',
      icon: Bell,
      tag: 'Free'
    }
  ];

  const achievements = [
    {
      title: 'First Login',
      icon: Check,
      earned: true
    },
    {
      title: 'Complete Profile',
      icon: Award,
      earned: true
    },
    {
      title: 'First Lesson',
      icon: Star,
      earned: true
    },
    {
      title: 'Complete a Course',
      icon: Trophy,
      earned: false
    }
  ];

  const handleUpgrade = () => {
    navigate('/payment');
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <AuroraBackground className="h-auto rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-lg mb-6">
        <motion.div 
          className="relative w-full z-10 backdrop-blur-md bg-white/30 dark:bg-zinc-900/70 rounded-xl overflow-hidden p-8 shadow-inner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {profile?.full_name || 'Trader'}!
              </h1>
              <p className="text-lg mb-4 opacity-90">
                Continue your trading journey with these basic resources
              </p>
              <div className="flex items-center gap-3 mt-4">
                <Button onClick={() => navigate('/library')} className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Go to Library
                </Button>
                <Button variant="outline" onClick={handleUpgrade} className="gap-2">
                  <Crown className="h-4 w-4" />
                  Upgrade to Premium
                </Button>
              </div>
            </div>
            <div className="min-w-[220px]">
              <Card className="bg-white/40 dark:bg-zinc-800/40 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-zinc-900 dark:text-zinc-100">Learning Path</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={learningPathProgress} className="h-2" />
                    <div className="flex justify-between items-center text-sm text-zinc-800 dark:text-zinc-200">
                      <div>Progress: {learningPathProgress}%</div>
                      <Badge variant="outline" className="font-normal bg-primary/10 text-primary border-primary/20">Basic</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </AuroraBackground>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Quick Start Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Start Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickStartGuides.map((guide, index) => {
                const Icon = guide.icon;
                return (
                  <Card key={index} className="hover:border-primary/50 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/20">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <CardTitle className="text-base">{guide.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <CardDescription>{guide.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <span className="text-xs flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {guide.duration}
                      </span>
                      {guide.completed ? (
                        <Badge className="bg-green-500/20 text-green-600 border-none">
                          <Check className="h-3 w-3 mr-1" />
                          Done
                        </Badge>
                      ) : (
                        <Button size="sm" variant="ghost" className="h-7 text-xs">
                          Start
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Upcoming Webinars */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Upcoming Free Webinars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingWebinars.map((webinar, index) => (
                <Card key={index} className="hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{webinar.title}</CardTitle>
                      <Badge variant="outline">Free</Badge>
                    </div>
                    <CardDescription>by {webinar.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{webinar.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{webinar.time}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-xs text-muted-foreground">{webinar.spots} spots left</span>
                    <Button size="sm">Register</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Premium Teaser */}
          <Card className="border-dashed border-yellow-500/50 bg-yellow-50/80 dark:bg-yellow-950/10 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                <CardTitle className="text-zinc-900 dark:text-zinc-100">Unlock Premium Features</CardTitle>
              </div>
              <CardDescription className="text-zinc-800 dark:text-zinc-300 font-medium">
                Get access to 1-on-1 mentoring, advanced courses, and live trading sessions
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Daily Trading Signals</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Expert Mentorship</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Advanced Strategies</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUpgrade} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Crown className="h-4 w-4 mr-2" />
                Upgrade Now
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Lessons Tab */}
        <TabsContent value="lessons" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
            <div className="space-y-4">
              {recentLessons.map((lesson, index) => (
                <Card key={index} className="hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">{lesson.title}</CardTitle>
                      <Badge variant="outline">{lesson.duration}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress: {lesson.progress}%</span>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <History className="h-3 w-3" />
                          {lesson.lastAccessed}
                        </span>
                      </div>
                      <Progress value={lesson.progress} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" className="w-full">Continue</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Recommended Next Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <GraduationCap className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle className="text-base">Complete Your Profile</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>Update your learning preferences and goals to get personalized recommendations</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline">Update Profile</Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle className="text-base">Basic Certification</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>Complete the basic trading course to earn your first certificate</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline">Start Course</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Essential Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {basicResources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <Card key={index} className="hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-primary/20">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <CardTitle className="text-base">{resource.title}</CardTitle>
                        </div>
                        <Badge>{resource.tag}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">{resource.type}</div>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm">Access Resource</Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Weekly Market Calendar</h2>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Economic Events - June 2025</CardTitle>
                <CardDescription>Important market events for basic traders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <div className="font-medium">Interest Rate Decision</div>
                      <div className="text-sm text-muted-foreground">Federal Reserve</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm">Jun 3, 2025</div>
                      <Badge className="bg-orange-500/20 text-orange-600 border-none">High Impact</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <div className="font-medium">Non-Farm Payrolls</div>
                      <div className="text-sm text-muted-foreground">United States</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm">Jun 7, 2025</div>
                      <Badge className="bg-orange-500/20 text-orange-600 border-none">High Impact</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium">GDP Release</div>
                      <div className="text-sm text-muted-foreground">European Union</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm">Jun 10, 2025</div>
                      <Badge className="bg-yellow-500/20 text-yellow-600 border-none">Medium Impact</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">View Full Calendar</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card key={index} className={`text-center ${achievement.earned ? '' : 'opacity-50'}`}>
                    <CardHeader>
                      <div className={`mx-auto p-3 rounded-full ${achievement.earned ? 'bg-green-500/20' : 'bg-muted/50'}`}>
                        <Icon className={`h-6 w-6 ${achievement.earned ? 'text-green-500' : 'text-muted-foreground'}`} />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="font-medium">{achievement.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {achievement.earned ? 'Earned' : 'Locked'}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
              <CourseProgress 
                completedLessons={8} 
                totalLessons={25} 
                level="beginner"
              />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Basic Plan Benefits</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Trading Fundamentals Courses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Basic Chart Analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Free Webinars</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Weekly Market Calendar</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Community Forum Access</span>
                    </div>
                    <div className="border-t my-4"></div>
                    <Button onClick={handleUpgrade} className="w-full gap-2">
                      <Crown className="h-4 w-4" />
                      Upgrade to Premium
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Missing import - add Calculator icon
import { Calculator } from 'lucide-react';
