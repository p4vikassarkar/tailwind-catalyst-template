'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login() {
  (await cookies()).set('auth_token', 'mock_token', { 
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })
  redirect('/dashboard')
}

export async function logout() {
  (await cookies()).delete('auth_token')
  redirect('/')
}
