
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { CourseCard } from '../components/CourseCard';
import { mockCourses } from '../data/mockData';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export const Library: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = !selectedLevel || course.level === selectedLevel;
    const matchesPremium = !showPremiumOnly || course.isPremium;
    
    return matchesSearch && matchesLevel && matchesPremium;
  });

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6">Course Library</h1>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={showPremiumOnly ? "default" : "outline"}
              onClick={() => setShowPremiumOnly(!showPremiumOnly)}
              className="shrink-0"
            >
              <Filter className="w-4 h-4 mr-2" />
              Premium Only
            </Button>
          </div>
        </div>

        {/* Level Filters */}
        <div className="flex gap-2 mb-6">
          <Badge
            variant={selectedLevel === '' ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setSelectedLevel('')}
          >
            All Levels
          </Badge>
          {levels.map(level => (
            <Badge
              key={level}
              variant={selectedLevel === level ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setSelectedLevel(level)}
            >
              {level}
            </Badge>
          ))}
        </div>
      </div>

      {/* Results */}
      <div>
        <p className="text-muted-foreground mb-4">
          Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      {filteredCourses.length === 0 && (
        <div className="glass-card rounded-xl p-12 text-center">
          <h3 className="text-xl font-semibold mb-2">No courses found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
};
