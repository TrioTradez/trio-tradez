
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isPremium: boolean;
  joinDate: string;
  coursesCompleted: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  isPremium: boolean;
  instructor: string;
  rating: number;
  studentsCount: number;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'quiz';
  duration?: string;
  url?: string;
  isCompleted: boolean;
  isPremium: boolean;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  duration: string;
  thumbnail: string;
  description: string;
  transcript?: string;
}

export interface PDFDocument {
  id: string;
  title: string;
  url: string;
  pages: number;
  description: string;
  downloadUrl?: string;
}
