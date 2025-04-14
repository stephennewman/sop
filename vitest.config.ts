import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Use jsdom environment for React components
    globals: true, // Make Vitest APIs available globally
    setupFiles: './vitest.setup.ts', // Optional setup file
    // include: ['src/**/*.test.{ts,tsx}'], // Default pattern
    alias: {
      '@': path.resolve(__dirname, './src'), // Match tsconfig alias
    },
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'json', 'html'],
    },
  },
}) 