'use client'

import { Sidebar } from '@/app/(main)/_components/sidebar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navigation } from '@/app/(main)/_components/navigation'
import { useConvexAuth } from 'convex/react'
import { redirect } from 'next/navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center bg-white text-slate-700'>
        Laddar...
      </div>
    )
  }

  if (!isAuthenticated) {
    redirect('/')
  }

  return (
    <div className='flex bg-white min-h-screen'>
      <Sidebar/>
      <div className='w-full'>
        <Navigation/>
        {children}
      </div>
    </div>
  )
}

