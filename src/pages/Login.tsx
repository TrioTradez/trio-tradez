import React, { useState } from 'react';
import { TrendingUp, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { motion } from 'framer-motion';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isSignUp) {
        // Handle sign up logic
        console.log('Sign up with:', { name, email, password });
      } else {
        await login(email, password);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Authentication failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      // Implement Google authentication
      console.log('Google authentication');
    } catch (error) {
      console.error('Google auth failed:', error);
    }
  };

  const demoLogin = (type: 'free' | 'premium') => {
    setIsSignUp(true);
    if (type === 'premium') {
      setEmail('premium@demo.com');
    } else {
      setEmail('demo@example.com');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-background to-background/80">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:75px_75px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[50rem] h-[50rem] rotate-45">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        <div className="glass-card rounded-xl p-8 backdrop-blur-xl">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold gradient-text">TrioTradez Academy</h1>
            </div>
            <p className="text-muted-foreground">
              {isSignUp ? 'Create your trading account' : 'Access your trading education platform'}
            </p>
          </motion.div>

          {!isSignUp && (
            <>
              {/* Account Type Selection */}
              <div className="space-y-3 mb-6">
                <Button
                  onClick={() => demoLogin('free')}
                  variant="outline"
                  className="w-full group relative overflow-hidden"
                >
                  <span className="relative z-10">Basic Account</span>
                  <div className="absolute inset-0 bg-primary/10 transform translate-x-full group-hover:translate-x-0 transition-transform duration-200" />
                </Button>
                <Button
                  onClick={() => demoLogin('premium')}
                  className="w-full trading-gradient text-white group relative overflow-hidden"
                >
                  <span className="relative z-10">Premium Account</span>
                  <div className="absolute inset-0 bg-white/10 transform translate-x-full group-hover:translate-x-0 transition-transform duration-200" />
                </Button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
            </>
          )}

          {/* Google Auth Button */}
          <Button
            onClick={handleGoogleAuth}
            variant="outline"
            className="w-full mb-6 relative group"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-4 h-4 absolute left-4"
            />
            <span>{isSignUp ? 'Sign up with Google' : 'Sign in with Google'}</span>
            <ArrowRight className="w-4 h-4 absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {isSignUp && (
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}
            
            <Button
              type="submit"
              className="w-full trading-gradient hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Sign in here
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Sign up here
                </button>
              </>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Back to website
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};