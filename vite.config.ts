/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ['phaser'],
        },
      },
    },
  },
  esbuild: {
    legalComments: 'none',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    reporters: ['default', 'junit'],
    outputFile: {
      junit: 'dist/test-reports/junit.xml',
    },
    coverage: {
      reporter: ['clover', 'text'],
      reportsDirectory: 'dist/test-reports',
      include: ['src/**.{ts}', 'src/**/**.{ts}'],
      exclude: ['node_modules/'],
      cleanOnRerun: true,
      clean: true,
      all: true,
      provider: 'v8',
    },
  },
})
