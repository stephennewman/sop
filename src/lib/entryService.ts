import { createClient } from '@/lib/supabase/server' // Use server client for server-side operations

// Define the type for your entry (adjust as needed)
export interface Entry {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

// Example function to get entries for the current user
// Assumes you have an 'entries' table with RLS enabled for 'user_id = auth.uid()'
export async function getUserEntries(): Promise<Entry[]> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    console.error('User not authenticated')
    return []
  }

  const { data, error } = await supabase
    .from('entries')
    .select('*')
    // .eq('user_id', user.id) // RLS handles this, but explicit check can be added
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching entries:', error)
    throw error // Or handle more gracefully
  }

  return data || []
}

// Example function to add an entry for the current user
export async function addEntry(content: string): Promise<Entry | null> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    console.error('User not authenticated')
    throw new Error('Authentication required')
  }

  const { data, error } = await supabase
    .from('entries')
    .insert([{ content, user_id: user.id }]) // Ensure user_id is set
    .select()
    .single() // Assumes you want the newly created entry back

  if (error) {
    console.error('Error adding entry:', error)
    throw error
  }

  return data
}

// Add other CRUD operations (update, delete) as needed, ensuring
// they respect RLS by either relying on implicit user_id checks
// or explicitly filtering/checking against the authenticated user's ID. 