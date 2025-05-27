
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="flex items-center gap-8">
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            location.pathname === item.path 
              ? "text-primary" 
              : "text-muted-foreground"
          )}
        >
          {item.label}
        </button>
      ))}
      
      <Button 
        className="ml-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
        onClick={() => navigate('/login')}
      >
        Login / Sign Up
      </Button>
    </nav>
  );
};
