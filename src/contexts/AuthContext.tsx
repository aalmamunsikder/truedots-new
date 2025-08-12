import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, AuthUser, SignUpData, SignInData } from '@/lib/supabase'
import { toast } from '@/components/ui/use-toast'

interface AuthContextType {
  user: User | null
  profile: AuthUser | null
  loading: boolean
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string }>
  signIn: (data: SignInData) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<AuthUser>) => Promise<{ success: boolean; error?: string }>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch user profile from profiles table
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    }
  }

  // Create or update user profile
  const upsertProfile = async (userId: string, profileData: Partial<AuthUser>) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        console.error('Error upserting profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error upserting profile:', error)
      return null
    }
  }

  // Sign up function
  const signUp = async (data: SignUpData): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)
      
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.full_name,
            phone: data.phone
          }
        }
      })

      if (error) {
        return { success: false, error: error.message }
      }

      if (authData.user) {
        // Wait a moment for the trigger to create the profile
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Update the profile with additional data
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            phone: data.phone,
            full_name: data.full_name,
            birthday: data.birthday,
            gender: data.gender,
            interested_in: data.interested_in,
            looking_for: data.looking_for,
            interests: data.interests,
            photos: data.photos,
            profile_completed: true
          })
          .eq('id', authData.user.id)

        if (updateError) {
          console.error('Error updating profile:', updateError)
          // Don't fail signup if profile update fails
        }

        // Fetch the updated profile
        const profileData = await fetchProfile(authData.user.id)
        if (profileData) {
          setProfile(profileData)
        }
      }

      return { success: true }
    } catch (error) {
      console.error('Sign up error:', error)
      return { success: false, error: 'An unexpected error occurred' }
    } finally {
      setLoading(false)
    }
  }

  // Sign in function
  const signIn = async (data: SignInData): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)
      
      // Check if there's already a session and clear it first
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log('AuthContext: Existing session found, clearing before sign in');
        await supabase.auth.signOut();
      }
      
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      })

      if (error) {
        return { success: false, error: error.message }
      }

      if (authData.user) {
        // Fetch user profile
        const profileData = await fetchProfile(authData.user.id)
        if (profileData) {
          setProfile(profileData)
        }
      }

      return { success: true }
    } catch (error) {
      console.error('Sign in error:', error)
      return { success: false, error: 'An unexpected error occurred' }
    } finally {
      setLoading(false)
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      console.log('AuthContext: Starting signOut...');
      // Set a flag to prevent loading state changes during logout
      setLoading(false); // Ensure loading is false before logout
      console.log('AuthContext: Calling supabase.auth.signOut()...');
      
      // Try to sign out with a longer timeout (10 seconds)
      const signOutPromise = supabase.auth.signOut();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('SignOut timeout - taking longer than expected')), 10000)
      );
      
      await Promise.race([signOutPromise, timeoutPromise]);
      console.log('AuthContext: Supabase signOut successful');
      
      // Immediately clear state
      console.log('AuthContext: Immediately clearing state');
      setUser(null);
      setProfile(null);
      setLoading(false);
      
      // Force clear any remaining session data
      try {
        await supabase.auth.refreshSession();
        console.log('AuthContext: Forced session refresh to clear any remaining tokens');
      } catch (refreshError) {
        console.log('AuthContext: Session refresh failed (this is expected after logout)');
      }
      
      // Comprehensive session clearing
      console.log('AuthContext: Clearing all browser storage');
      try {
        // Clear localStorage
        localStorage.removeItem('supabase.auth.token');
        localStorage.removeItem('supabase.auth.refreshToken');
        
        // Clear sessionStorage
        sessionStorage.removeItem('supabase.auth.token');
        sessionStorage.removeItem('supabase.auth.refreshToken');
        
        // Clear any other potential storage keys
        Object.keys(localStorage).forEach(key => {
          if (key.includes('supabase') || key.includes('auth')) {
            localStorage.removeItem(key);
            console.log('AuthContext: Removed localStorage key:', key);
          }
        });
        
        Object.keys(sessionStorage).forEach(key => {
          if (key.includes('supabase') || key.includes('auth')) {
            sessionStorage.removeItem(key);
            console.log('AuthContext: Removed sessionStorage key:', key);
          }
        });
        
        console.log('AuthContext: All browser storage cleared');
      } catch (storageError) {
        console.error('AuthContext: Error clearing storage:', storageError);
      }
      
      // Clear Supabase internal state
      console.log('AuthContext: Clearing Supabase internal state...');
      try {
        // Force clear any remaining Supabase session
        await supabase.auth.setSession(null);
        console.log('AuthContext: Supabase session cleared');
      } catch (sessionError) {
        console.log('AuthContext: Error clearing Supabase session (expected):', sessionError);
      }
      
    } catch (error) {
      console.error('AuthContext: Sign out error:', error);
      
      // If it's a timeout, that's okay - we can still clear the state
      if (error instanceof Error && error.message.includes('timeout')) {
        console.log('AuthContext: SignOut timed out, but this is normal. Clearing state anyway.');
      }
      
      // Even if there's an error, clear the state
      console.log('AuthContext: Error occurred, but clearing state anyway');
      setUser(null);
      setProfile(null);
      setLoading(false);
      
      // Force clear any remaining session data even on error
      try {
        await supabase.auth.refreshSession();
        console.log('AuthContext: Forced session refresh to clear any remaining tokens');
      } catch (refreshError) {
        console.log('AuthContext: Session refresh failed (this is expected after logout)');
      }
      
      // Clear storage even on error
      try {
        localStorage.removeItem('supabase.auth.token');
        localStorage.removeItem('supabase.auth.refreshToken');
        sessionStorage.removeItem('supabase.auth.token');
        sessionStorage.removeItem('supabase.auth.refreshToken');
        console.log('AuthContext: Storage cleared after error');
      } catch (storageError) {
        console.error('AuthContext: Error clearing storage after error:', storageError);
      }
      
      // Clear Supabase session even on error
      try {
        await supabase.auth.setSession(null);
        console.log('AuthContext: Supabase session cleared after error');
      } catch (sessionError) {
        console.log('AuthContext: Error clearing Supabase session after error (expected):', sessionError);
      }
      
      // Don't throw timeout errors - they're not critical
      if (!(error instanceof Error && error.message.includes('timeout'))) {
        throw error;
      }
    }
  }

  // Update profile function
  const updateProfile = async (data: Partial<AuthUser>): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: 'No user logged in' }
    }

    try {
      const profileData = await upsertProfile(user.id, data)
      if (profileData) {
        setProfile(profileData)
        return { success: true }
      }
      return { success: false, error: 'Failed to update profile' }
    } catch (error) {
      console.error('Update profile error:', error)
      return { success: false, error: 'Failed to update profile' }
    }
  }

  // Refresh profile function
  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id)
      if (profileData) {
        setProfile(profileData)
      }
    }
  }

  // Listen for auth state changes
  useEffect(() => {
    let mounted = true;
    
    // Set a timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      if (mounted) {
        console.log('AuthContext: Loading timeout reached, setting loading to false');
        setLoading(false);
      }
    }, 5000); // 5 second timeout

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('AuthContext: Auth state change event:', event, 'session:', session);
        
        // Handle signOut event immediately without setting loading
        if (event === 'SIGNED_OUT') {
          console.log('AuthContext: User signed out, clearing state immediately');
          setUser(null);
          setProfile(null);
          setLoading(false);
          
          // Force clear any remaining session data
          try {
            await supabase.auth.refreshSession();
            console.log('AuthContext: Forced session refresh after SIGNED_OUT event');
          } catch (refreshError) {
            console.log('AuthContext: Session refresh failed after SIGNED_OUT (expected)');
          }
          return;
        }
        
        // Handle token refresh and other events
        if (event === 'TOKEN_REFRESHED') {
          console.log('AuthContext: Token refreshed, updating user');
          setUser(session?.user ?? null);
          setLoading(false);
          return;
        }
        
        // For SIGNED_IN events, set loading to true while fetching profile
        if (event === 'SIGNED_IN') {
          setLoading(true);
        }
        
        try {
          setUser(session?.user ?? null);
          
          if (session?.user) {
            console.log('AuthContext: User session found, fetching profile...');
            const profileData = await fetchProfile(session.user.id);
            if (mounted) {
              setProfile(profileData);
            }
          } else {
            console.log('AuthContext: No user session, clearing profile');
            if (mounted) {
              setProfile(null);
            }
          }
        } catch (error) {
          console.error('AuthContext: Error in auth state change:', error);
        } finally {
          if (mounted) {
            console.log('AuthContext: Setting loading to false');
            setLoading(false);
          }
        }
      }
    );

    // Also try to get the current session immediately
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted && session?.user) {
          console.log('AuthContext: Initial session found, validating...');
          
          // Validate the session by checking if the user still exists
          try {
            const { data: userData, error: userError } = await supabase.auth.getUser();
            if (userError || !userData.user) {
              console.log('AuthContext: Session validation failed, clearing invalid session');
              await supabase.auth.signOut();
              setUser(null);
              setProfile(null);
              setLoading(false);
              return;
            }
            
            console.log('AuthContext: Session validated, setting user');
            setUser(session.user);
            const profileData = await fetchProfile(session.user.id);
            if (mounted) {
              setProfile(profileData);
            }
          } catch (validationError) {
            console.log('AuthContext: Session validation error, clearing session:', validationError);
            await supabase.auth.signOut();
            setUser(null);
            setProfile(null);
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error('AuthContext: Error getting initial session:', error);
      } finally {
        if (mounted) {
          console.log('AuthContext: Initial session check complete, setting loading to false');
          setLoading(false);
        }
      }
    };

    getInitialSession();

    return () => {
      mounted = false;
      clearTimeout(loadingTimeout);
      subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
