import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  outDir: 'dist',
  external: ['react', 'react-dom', '@firecms/core', '@firecms/ui'],
  treeshake: true,
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
});

