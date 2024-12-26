"use client"

import { SignupForm } from '@/components/auth/signup'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function SignupPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  return (
    <>
      <Head>
        <title>Sign Up - Context AI</title>
        <meta name="description" content="Create your Context AI account" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">AI-Powered Truth Detection</h1>
            <p className="text-blue-200">Join our community of truth-seekers</p>
          </div>

          {/* Sign Up Card */}
          <div className="bg-white text-gray-900 rounded-xl shadow-2xl p-8">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold">Create your account</h2>
              <p className="text-gray-500 mt-2">Start your journey to verified insights</p>
            </div>

            <SignupForm />
          </div>

          {/* Links */}
          <div className="text-center">
            <div className="text-gray-300">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-300 hover:text-blue-200 transition-colors">
                Sign in
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-6 mt-12">
            <div className="text-center p-4">
              <div className="bg-blue-800/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold">Secure Access</h3>
              <p className="text-blue-200 text-sm mt-1">Your data is encrypted and protected</p>
            </div>
            <div className="text-center p-4">
              <div className="bg-blue-800/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold">Instant Access</h3>
              <p className="text-blue-200 text-sm mt-1">Start analyzing right away</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}