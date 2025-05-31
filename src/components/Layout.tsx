import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
interface LayoutProps {
  children: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const {
    isAuthenticated
  } = useAuthStore();
  if (!isAuthenticated) {
    return <div className="min-h-screen flex flex-col">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold gradient-text">TrioTradez Academy</h1>
            </div>
            <Navbar />
          </div>
        </header>
        <main className="flex-1 container mx-auto px-4 sm:px-6 py-8">{children}</main>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>
      </div>
    </div>;
};