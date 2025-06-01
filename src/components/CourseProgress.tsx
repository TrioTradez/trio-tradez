import React from 'react';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface CourseProgressProps {
  completedLessons: number;
  totalLessons: number;
  level?: 'beginner' | 'intermediate' | 'advanced';
}

export const CourseProgress: React.FC<CourseProgressProps> = ({
  completedLessons,
  totalLessons,
  level = 'beginner'
}) => {
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
  
  const getLevelColor = () => {
    switch(level) {
      case 'beginner': return 'bg-green-500/20 text-green-500';
      case 'intermediate': return 'bg-blue-500/20 text-blue-500';
      case 'advanced': return 'bg-purple-500/20 text-purple-500';
      default: return 'bg-green-500/20 text-green-500';
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Course Progress</span>
          <Badge variant="outline" className={getLevelColor()}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </Badge>
        </div>
        <span className="text-sm text-muted-foreground">
          {completedLessons} of {totalLessons} lessons
        </span>
      </div>
      
      <Progress value={progressPercentage} className="h-2" />
      
      <div className="text-xs text-muted-foreground">
        {progressPercentage}% complete
      </div>
    </div>
  );
};
