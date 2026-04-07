import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/lib/vite.ts'],
  outDir: 'vite',
  splitting: false,
  sourcemap: true,
  clean: true,
  keepNames: true,
  dts: true,
  format: ['esm', 'cjs'],
  external: ['vite', 'typescript', 'vite-dev-rpc']
})
