
import React from 'react';
import { Home, Book, User, LibraryIcon } from 'lucide-react'; // Added LibraryIcon for clarity if needed, Home can be reused
import { useAuthStore } from '../store/authStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAuthStore();

  const isPremiumUser = profile?.is_premium === true;

  const menuItems = [
    {
      icon: Home, // Using Home icon for both
      label: isPremiumUser ? 'Dashboard' : 'My Library',
      path: isPremiumUser ? '/dashboard' : '/library',
    },
    { icon: Book, label: 'Browse All Courses', path: '/library' }, // Renamed for clarity if 'My Library' is used
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  // Filter out the 'Browse All Courses' link for basic users if 'My Library' already points to /library
  // to avoid redundancy, or adjust labels for distinct purposes.
  // For now, let's keep both but adjust the 'Library' label to be more generic for browsing.
  // If 'My Library' and 'Browse All Courses' both go to /library for basic users, one might be redundant.
  // Let's refine this: if basic, 'My Library' is the main link. If premium, 'Dashboard' is main, 'Library' is for browsing.

  const getMenuItems = () => {
    if (isPremiumUser) {
      return [
        { icon: Home, label: 'Dashboard', path: '/dashboard' },
        { icon: Book, label: 'Library', path: '/library' },
        { icon: User, label: 'Profile', path: '/profile' },
      ];
    } else {
      // Basic users
      return [
        { icon: Home, label: 'Dashboard', path: '/dashboard' }, // This will render BasicDashboard via Dashboard.tsx
        { icon: Book, label: 'Browse Courses', path: '/library' }, // Separate link to browse all courses
        { icon: User, label: 'Profile', path: '/profile' },
      ];
    }
  };

  const currentMenuItems = getMenuItems();

  return (
    <div className="w-64 bg-card border-r border-border">
      <div className="p-6">
        <h1 className="text-2xl font-bold gradient-text">TrioTradez Academy </h1>
        <p className="text-sm text-muted-foreground mt-1">Education Platform</p>
      </div>
      
      <nav className="px-4 space-y-2">
        {currentMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
