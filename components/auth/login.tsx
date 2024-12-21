"use client"

import { useAuth } from '@/context/AuthContext'
import { AuthForm } from './Authform'

export function LoginForm() {
  const { login } = useAuth()

  return (
    <AuthForm
      onSubmit={login}
      buttonText="Sign In"
      loadingText="Signing in..."
    />
  )
}