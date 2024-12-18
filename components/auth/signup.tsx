"use client"

import { useAuth } from '@/context/AuthContext'
import { AuthForm } from './Authform'

export function SignupForm() {
  const { signup } = useAuth()

  return (
    <AuthForm
      onSubmit={signup}
      buttonText="Create Account"
      loadingText="Creating account..."
    />
  )
}