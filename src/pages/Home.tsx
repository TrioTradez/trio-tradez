
import React from 'react';
import { TrendingUp, Award, BookOpen, Users } from 'lucide-react';
import { CourseCard } from '../components/CourseCard';
import { mockCourses } from '../data/mockData';
import { useAuthStore } from '../store/authStore';

export const Home: React.FC = () => {
  const { user } = useAuthStore();
  const featuredCourses = mockCourses.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="glass-card rounded-xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-muted-foreground text-lg">
              Continue your trading education journey
            </p>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop"
              alt="Trading charts"
              className="rounded-lg opacity-80"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 text-center">
          <TrendingUp className="w-8 h-8 mx-auto mb-3 text-primary" />
          <h3 className="text-2xl font-bold">{user?.coursesCompleted || 0}</h3>
          <p className="text-muted-foreground">Courses Completed</p>
        </div>
        <div className="glass-card p-6 text-center">
          <BookOpen className="w-8 h-8 mx-auto mb-3 text-accent" />
          <h3 className="text-2xl font-bold">24</h3>
          <p className="text-muted-foreground">Hours Watched</p>
        </div>
        <div className="glass-card p-6 text-center">
          <Award className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
          <h3 className="text-2xl font-bold">3</h3>
          <p className="text-muted-foreground">Certificates Earned</p>
        </div>
        <div className="glass-card p-6 text-center">
          <Users className="w-8 h-8 mx-auto mb-3 text-green-400" />
          <h3 className="text-2xl font-bold">89%</h3>
          <p className="text-muted-foreground">Success Rate</p>
        </div>
      </div>

      {/* Featured Courses */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Courses</h2>
          <button className="text-primary hover:text-primary/80 font-medium">
            View All →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      {/* Learning Path */}
      <div className="glass-card rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4">Your Learning Path</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-muted rounded-full h-2">
            <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full w-3/4"></div>
          </div>
          <span className="text-sm font-medium">75% Complete</span>
        </div>
        <p className="text-muted-foreground mt-2">
          Keep up the great work! You're well on your way to becoming a skilled trader.
        </p>
      </div>
    </div>
  );
};
