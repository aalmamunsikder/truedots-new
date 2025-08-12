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
      setLoading(true);
      console.log('AuthContext: Calling supabase.auth.signOut()...');
      await supabase.auth.signOut();
      console.log('AuthContext: Supabase signOut successful, clearing state...');
      setUser(null);
      setProfile(null);
      console.log('AuthContext: State cleared, signOut complete');
    } catch (error) {
      console.error('AuthContext: Sign out error:', error);
      throw error; // Re-throw to let the calling function handle it
    } finally {
      setLoading(false);
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
        
        console.log('AuthContext: Auth state change event:', event);
        
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
          console.log('AuthContext: Initial session found, setting user');
          setUser(session.user);
          const profileData = await fetchProfile(session.user.id);
          if (mounted) {
            setProfile(profileData);
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
