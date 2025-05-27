
import React from 'react';
import { TrendingUp, Award, BookOpen, Users } from 'lucide-react';
import { CourseCard } from '../components/CourseCard';
import { HeroSection } from '../components/HeroSection';
import { mockCourses } from '../data/mockData';

export const Home: React.FC = () => {
  const featuredCourses = mockCourses.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
    </div>
  );
};
