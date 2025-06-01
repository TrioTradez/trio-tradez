
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
    if (!session?.user) return;

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
        return;
      }

      console.log('Profile fetched:', profile);
      set({ 
        profile, 
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

      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error };

      // After successful sign in, fetch the profile immediately
      if (data.session?.user) {
        console.log('Sign in successful, fetching profile...');
        setTimeout(() => {
          get().fetchProfile();
        }, 100);
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
        isAuthenticated: false 
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
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        set({ session, user: session?.user ?? null });

        if (session?.user) {
          // Fetch user profile with a small delay to ensure the session is fully established
          setTimeout(() => {
            get().fetchProfile();
          }, 200);
        } else {
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
      console.log('Initial session:', session?.user?.email);
      set({ session, user: session?.user ?? null });
      
      if (session?.user) {
        get().fetchProfile();
      } else {
        set({ isLoading: false });
      }
    });

    return subscription;
  },
}));
