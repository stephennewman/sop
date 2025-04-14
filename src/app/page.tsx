'use client'

import Link from 'next/link'
import { useUserStore } from '@/stores/userStore'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Hello World - Test Page</h1>
      <p>If you see this, the basic page rendering is working.</p>
    </main>
  )
}
