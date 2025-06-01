
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Users, Star, Play, FileText, Lock, ArrowLeft } from 'lucide-react';
import { mockCourses } from '../data/mockData';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile } = useAuthStore();
  
  const course = mockCourses.find(c => c.id === id);
  
  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <Button onClick={() => navigate('/library')}>
          Back to Library
        </Button>
      </div>
    );
  }

  const canAccess = !course.isPremium || profile?.is_premium;

  const handleModuleClick = (module: any) => {
    if (!canAccess) {
      navigate('/payment');
      return;
    }

    if (module.type === 'video') {
      navigate(`/video/${module.id}`);
    } else if (module.type === 'pdf') {
      navigate(`/pdf/${module.id}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate('/library')}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Library
      </Button>

      {/* Course Header */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="relative h-64 md:h-80">
          <img 
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  {course.rating}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5" />
                  {course.studentsCount.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Badge variant="outline">{course.level}</Badge>
              {course.isPremium && (
                <Badge className="trading-gradient text-white">
                  <Lock className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
            
            {!canAccess && (
              <Button 
                className="trading-gradient text-white"
                onClick={() => navigate('/payment')}
              >
                Upgrade to Access
              </Button>
            )}
          </div>

          <p className="text-lg text-muted-foreground mb-6">{course.description}</p>
          
          <div className="flex items-center gap-4">
            <div>
              <p className="font-semibold">Instructor</p>
              <p className="text-muted-foreground">{course.instructor}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Modules */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Course Content</h2>
        
        <div className="space-y-3">
          {course.modules.map((module, index) => {
            const Icon = module.type === 'video' ? Play : FileText;
            const isLocked = module.isPremium && !profile?.is_premium;
            
            return (
              <div
                key={module.id}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                  isLocked 
                    ? 'bg-muted/30 border-muted cursor-not-allowed' 
                    : 'bg-muted/50 border-muted hover:bg-muted/70 cursor-pointer'
                }`}
                onClick={() => handleModuleClick(module)}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20">
                  <span className="text-sm font-medium">{index + 1}</span>
                </div>
                
                <Icon className={`w-5 h-5 ${isLocked ? 'text-muted-foreground' : 'text-primary'}`} />
                
                <div className="flex-1">
                  <h4 className={`font-medium ${isLocked ? 'text-muted-foreground' : ''}`}>
                    {module.title}
                  </h4>
                  {module.duration && (
                    <p className="text-sm text-muted-foreground">{module.duration}</p>
                  )}
                </div>
                
                {isLocked && (
                  <Lock className="w-4 h-4 text-muted-foreground" />
                )}
                
                {module.isCompleted && (
                  <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/20">
                    Completed
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
