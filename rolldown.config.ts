import { defineConfig } from 'rolldown'

export default defineConfig({
  platform: 'node',
  input: 'src/index.ts',
  external: ['@swc/core'],
  output: {
    format: 'esm',
    dir: 'dist',
    minify: true,
  },
})
