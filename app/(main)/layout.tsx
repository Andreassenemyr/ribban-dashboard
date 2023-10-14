'use client'

import { Sidebar } from '@/components/sidebar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navigation } from '@/components/navigation'
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
      <div className='flex h-full items-center justify-center bg-white text-slate-700'>
        Laddar...
      </div>
    )
  }

  if (!isAuthenticated) {
    redirect('/')
  }

  return (
    <div className='flex bg-white w-screen h-screen'>
      <Sidebar/>
      <div className='w-full'>
        <Navigation/>
        {children}
      </div>
    </div>
  )
}

