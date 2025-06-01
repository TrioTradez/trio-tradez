
import React from 'react';
import { Star, Clock, Users, Lock } from 'lucide-react';
import { Course } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const canAccess = !course.isPremium || user?.isPremium;

  const handleClick = () => {
    if (canAccess) {
      navigate(`/course/${course.id}`);
    } else {
      navigate('/payment');
    }
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer" onClick={handleClick}>
      <div className="relative">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        {course.isPremium && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-accent text-accent-foreground">
              <Lock className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          </div>
        )}
        <Badge className="absolute bottom-3 left-3 bg-black/70 text-white">
          {course.level}
        </Badge>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {course.rating}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {course.studentsCount.toLocaleString()}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{course.instructor}</p>
            <p className="text-xs text-muted-foreground">Instructor</p>
          </div>
          
          <Button 
            className={canAccess ? "trading-gradient text-white" : ""}
            disabled={!canAccess}
          >
            {canAccess ? 'Start Learning' : 'Upgrade to Access'}
          </Button>
        </div>
      </div>
    </div>
  );
};
