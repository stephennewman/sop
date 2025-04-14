'use client'

import Link from 'next/link'
import { useUserStore } from '@/stores/userStore'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const user = useUserStore((state) => state.user)
  const isLoading = useUserStore((state) => state.user === undefined)
  const supabase = createClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    // Zustand listener in layout will clear the user state
    router.refresh() // Refresh page to reflect signed out state
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to the App</h1>

      {isLoading ? (
        <p>Loading user...</p>
      ) : user ? (
        <div className="text-center">
          <p className="mb-4">You are logged in as {user.email}</p>
          <Link href="/dashboard"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
          >
            Go to Dashboard
          </Link>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <Link href="/auth"
           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Login / Sign Up
        </Link>
      )}
    </main>
  )
}
