/// <reference types="vitest" />
import { writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import { peerDependencies } from './package.json' with { type: 'json' }

const rootDir = import.meta.dirname

export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: false, // disable inline declarations
      insertTypesEntry: true, // add "types" entry to package.json
      outDir: 'dist', // output declarations in dist
      entryRoot: 'src'
    }), // Output .d.ts files
    {
      name: 'emit-font-dts',
      closeBundle() {
        writeFileSync(
          resolve(rootDir, 'dist', 'font.d.ts'),
          "declare module '*.css'\n"
        )
      }
    }
  ],
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: resolve(rootDir, join('src', 'index.ts')),
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // Exclude peer dependencies from the bundle to reduce bundle size
      external: ['react/jsx-runtime', ...Object.keys(peerDependencies)]
    }
  }
})
