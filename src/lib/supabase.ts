import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth types
export interface AuthUser {
  id: string
  email: string
  phone?: string
  full_name?: string
  birthday?: string
  gender?: string
  interested_in?: string[]
  looking_for?: string
  interests?: string[]
  photos?: string[]
  created_at: string
  updated_at: string
}

export interface SignUpData {
  email: string
  password: string
  phone?: string
  full_name?: string
  birthday?: string
  gender?: string
  interested_in?: string[]
  looking_for?: string
  interests?: string[]
  photos?: string[]
}

export interface SignInData {
  email: string
  password: string
}
