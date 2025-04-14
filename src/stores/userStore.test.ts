import { describe, it, expect, beforeEach } from 'vitest'
import { useUserStore } from './userStore'
import { act } from '@testing-library/react'
import { type User } from '@supabase/supabase-js'

// Mock Supabase User object
const mockUser: User = {
  id: '12345',
  app_metadata: { provider: 'email' },
  user_metadata: { name: 'Test User' },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
};

describe('useUserStore', () => {
  // Reset store before each test
  beforeEach(() => {
    act(() => {
      useUserStore.setState({ user: null });
    });
  });

  it('should initially have user as null', () => {
    const user = useUserStore.getState().user;
    expect(user).toBeNull();
  });

  it('should set the user correctly', () => {
    act(() => {
      useUserStore.getState().setUser(mockUser);
    });
    const user = useUserStore.getState().user;
    expect(user).toEqual(mockUser);
    expect(user?.id).toBe('12345');
  });

  it('should set user to null', () => {
    // Set user first
    act(() => {
      useUserStore.getState().setUser(mockUser);
    });
    // Then set to null
    act(() => {
      useUserStore.getState().setUser(null);
    });
    const user = useUserStore.getState().user;
    expect(user).toBeNull();
  });
}); 