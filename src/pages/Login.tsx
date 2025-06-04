import React, { useState, useEffect } from 'react';
import { TrendingUp, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { motion } from 'framer-motion';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { signIn, signUp, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated && !window.location.pathname.includes('/select-subscription')) {
  //     // This was causing a premature redirect for new users before they hit /select-subscription.
  //     // Navigation is handled by handleSubmit or by protected routes.
  //     // navigate('/dashboard'); 
  //   }
  // }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }

        if (password.length < 6) {
          setError('Password must be at least 6 characters long');
          setIsLoading(false);
          return;
        }

        const { error: signUpError } = await signUp(email, password, fullName);
        
        if (signUpError) {
          if (signUpError.message.includes('already registered')) {
            setError('An account with this email already exists. Please sign in instead.');
          } else {
            setError(signUpError.message);
          }
          setIsLoading(false);
        } else {
          // After successful signup, automatically sign in
          const { error: signInError } = await signIn(email, password);
          
          if (signInError) {
            setError('Account created but could not sign in automatically. Please sign in manually.');
            setIsLoading(false);
          } else {
            // Navigate to subscription selection page after successful sign-up & sign-in
            console.log('Sign up and sign in successful, navigating to subscription selection');
            navigate('/select-subscription');
          }
        }
      } else {
        // Handle normal sign in
        const { error } = await signIn(email, password);
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setError('Invalid email or password. Please check your credentials and try again.');
          } else if (error.message.includes('Email not confirmed')) {
            setError('Please check your email and click the confirmation link before signing in.');
          } else {
            setError(error.message);
          }
          setIsLoading(false);
        } else {
          // Navigate to dashboard, which will check subscription status
          console.log('Sign in successful, navigating to dashboard');
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
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

          {/* Error/Success Messages */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}


          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
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
                  onClick={() => {
                    setIsSignUp(false);
                    setError(null);
                    setSuccess(null);
                  }}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Sign in here
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    setIsSignUp(true);
                    setError(null);
                    setSuccess(null);
                  }}
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
