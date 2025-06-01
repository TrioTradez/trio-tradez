import { create } from 'zustand';
import { supabase } from '../integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  upgradeToPremium: () => Promise<void>;
  initialize: () => any;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,

  fetchProfile: async () => {
    const { session } = get();
    if (!session?.user) {
      console.log('No session or user found for profile fetch');
      set({ isLoading: false });
      return;
    }

    try {
      console.log('Fetching profile for user:', session.user.id);
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        if (error.code === 'PGRST116') {
          console.log('Profile not found, user might need to complete setup');
        }
        set({ isLoading: false });
        return;
      }

      // Force is_premium to be a strict boolean value
      // This is critical for handling premium status correctly
      let isPremium = false;
      
      // Check if email is premium@demo.com to override profile status
      // This is a temporary workaround to ensure premium users get premium access
      if (session.user.email === 'premium@demo.com') {
        isPremium = true;
        console.log('Premium email detected, forcing premium status to TRUE');
      } else {
        // Normal check for premium status in profile
        isPremium = profile.is_premium === true;
      }
      
      console.log('Raw is_premium value:', profile.is_premium, 'type:', typeof profile.is_premium);
      console.log('Final premium status:', isPremium, 'type:', typeof isPremium);
      
      const normalizedProfile = {
        ...profile,
        is_premium: isPremium
      };

      console.log('Profile fetched successfully:', normalizedProfile);
      console.log('Is premium?', normalizedProfile.is_premium);
      
      set({ 
        profile: normalizedProfile, 
        isAuthenticated: true,
        isLoading: false 
      });
    } catch (error) {
      console.error('Profile fetch error:', error);
      set({ isLoading: false });
    }
  },

  signUp: async (email: string, password: string, fullName?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            full_name: fullName || '',
          }
        }
      });

      if (error) return { error };

      // Set premium status based on email - EXPLICITLY use true/false values
      // This is critical for database storage
      const isPremium = email === 'premium@demo.com' ? true : false;
      console.log('Setting up account with premium status:', isPremium);
      
      // First check if profile already exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user?.id)
        .single();
      
      let profileError = null;
      
      if (existingProfile) {
        // Profile exists, update it
        console.log('Profile already exists, updating premium status to:', isPremium);
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            full_name: fullName || existingProfile.full_name,
            is_premium: isPremium === true
          })
          .eq('id', data.user?.id);
        
        profileError = updateError;
      } else {
        // Create new profile
        console.log('Creating new profile with premium status:', isPremium);
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user?.id,
              full_name: fullName || '',
              is_premium: isPremium === true,
              avatar_url: null,
            }
          ]);
        
        profileError = insertError;
      }

      if (profileError) {
        console.error('Error managing profile:', profileError);
        return { error: profileError };
      }

      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      console.log('Attempting sign in for:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        return { error };
      }

      console.log('Sign in successful, session:', data.session?.user?.email);
      
      // Set session immediately
      set({ 
        session: data.session, 
        user: data.session?.user ?? null,
        isLoading: true 
      });

      // Fetch profile immediately after successful sign in
      if (data.session?.user) {
        console.log('Fetching profile after sign in...');
        await get().fetchProfile();
      }

      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error };
    }
  },

  signOut: async () => {
    try {
      await supabase.auth.signOut();
      set({ 
        user: null, 
        session: null, 
        profile: null, 
        isAuthenticated: false,
        isLoading: false
      });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  },

  upgradeToPremium: async () => {
    const { user } = get();
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_premium: true })
        .eq('id', user.id);

      if (error) throw error;

      // Update local state
      set((state) => ({
        profile: state.profile ? { ...state.profile, is_premium: true } : null
      }));
    } catch (error) {
      console.error('Upgrade to premium error:', error);
    }
  },

  initialize: () => {
    console.log('Initializing auth store...');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        set({ session, user: session?.user ?? null });

        if (session?.user && event === 'SIGNED_IN') {
          console.log('User signed in, fetching profile...');
          set({ isLoading: true });
          // Small delay to ensure session is fully established
          setTimeout(() => {
            get().fetchProfile();
          }, 100);
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          set({ 
            profile: null, 
            isAuthenticated: false,
            isLoading: false 
          });
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email);
      set({ session, user: session?.user ?? null });
      
      if (session?.user) {
        console.log('Found existing session, fetching profile...');
        get().fetchProfile();
      } else {
        console.log('No existing session found');
        set({ isLoading: false });
      }
    });

    return subscription;
  },
}));
