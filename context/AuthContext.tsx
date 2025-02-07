"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClientComponentClient, type SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Check active sessions and sets the user
    console.log("Checking active sessions")
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session);
      setUser(session?.user ?? null)
      setLoading(false)
    })
    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signup = async (email: string, password: string) => {
    try {
      const { error: authError, data } = await supabase.auth.signUp({
        email,
        password,
      })
      if (authError) throw authError
      console.log(data)
      
      if (data.user) {
        const { error: dbError } = await supabase
          .from('users')
          .insert([
            {
              user_id: data.user.id,
              email,
              password_hash: password,
              auth_method: 'email',
              subscription_status: 'free',
              daily_check_limit: 10,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ])
        if (dbError) throw dbError
        
        const {data: signInData, error: signInError} = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        console.log(signInData)
        router.push('/') // Changed from '/verify-email' to '/'
      }
    } catch (error) {
      throw error
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      }
    )
      if (error){
        console.log(error)
        throw error
      }
      router.push('/')
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/')
    } catch (error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}