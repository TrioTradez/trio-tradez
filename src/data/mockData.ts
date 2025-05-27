
import { Course, Video, PDFDocument } from '../types';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Trading Fundamentals',
    description: 'Master the basics of trading with comprehensive lessons on market analysis, risk management, and trading psychology.',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
    duration: '4 hours',
    level: 'Beginner',
    isPremium: false,
    instructor: 'Marcus Johnson',
    rating: 4.8,
    studentsCount: 2847,
    modules: [
      { id: '1-1', title: 'Introduction to Trading', type: 'video', duration: '15 min', isCompleted: false, isPremium: false },
      { id: '1-2', title: 'Market Types & Structure', type: 'video', duration: '25 min', isCompleted: false, isPremium: false },
      { id: '1-3', title: 'Trading Basics Guide', type: 'pdf', isCompleted: false, isPremium: false }
    ]
  },
  {
    id: '2',
    title: 'Advanced Technical Analysis',
    description: 'Deep dive into advanced charting techniques, indicators, and pattern recognition for professional traders.',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop',
    duration: '8 hours',
    level: 'Advanced',
    isPremium: true,
    instructor: 'Sarah Chen',
    rating: 4.9,
    studentsCount: 1256,
    modules: [
      { id: '2-1', title: 'Candlestick Patterns', type: 'video', duration: '35 min', isCompleted: false, isPremium: true },
      { id: '2-2', title: 'Support & Resistance', type: 'video', duration: '42 min', isCompleted: false, isPremium: true },
      { id: '2-3', title: 'Advanced Indicators Guide', type: 'pdf', isCompleted: false, isPremium: true }
    ]
  },
  {
    id: '3',
    title: 'Risk Management Mastery',
    description: 'Learn professional risk management strategies to protect your capital and maximize long-term profits.',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop',
    duration: '6 hours',
    level: 'Intermediate',
    isPremium: true,
    instructor: 'David Rodriguez',
    rating: 4.7,
    studentsCount: 1834,
    modules: [
      { id: '3-1', title: 'Position Sizing', type: 'video', duration: '28 min', isCompleted: false, isPremium: true },
      { id: '3-2', title: 'Stop Loss Strategies', type: 'video', duration: '33 min', isCompleted: false, isPremium: true },
      { id: '3-3', title: 'Risk Management Workbook', type: 'pdf', isCompleted: false, isPremium: true }
    ]
  }
];

export const mockVideos: Video[] = [
  {
    id: '1-1',
    title: 'Introduction to Trading',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '15:32',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
    description: 'Learn the fundamental concepts of trading, including market participants, order types, and basic terminology.'
  },
  {
    id: '2-1',
    title: 'Candlestick Patterns',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '35:18',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop',
    description: 'Master the art of reading candlestick patterns and understanding market sentiment through price action.'
  }
];

export const mockPDFs: PDFDocument[] = [
  {
    id: '1-3',
    title: 'Trading Basics Guide',
    url: '/sample.pdf',
    pages: 45,
    description: 'A comprehensive guide covering all trading fundamentals, market types, and essential concepts for beginners.',
    downloadUrl: '/trading-basics.pdf'
  },
  {
    id: '2-3',
    title: 'Advanced Indicators Guide',
    url: '/advanced-indicators.pdf',
    pages: 78,
    description: 'Detailed explanations of advanced technical indicators, their calculations, and practical applications.',
    downloadUrl: '/advanced-indicators.pdf'
  }
];
