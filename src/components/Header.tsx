
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const Header: React.FC = () => {
  const { user, profile } = useAuthStore();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search courses..." className="pl-10 bg-background/50 w-64" />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback>
                {(profile?.full_name || user?.email || 'U').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">
                {profile?.full_name || user?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-muted-foreground">
                {profile?.is_premium ? 'Premium Member' : 'Basic Member'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
