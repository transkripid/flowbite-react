import react from '@vitejs/plugin-react';
import { rm } from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

function cleanImagesDir() {
  return {
    name: 'clean-images-dir',
    resolveId(source: string) {
      return source === 'virtual-module' ? source : null
    },
    renderStart (outputOptions: { dir: string | undefined }) {
      const outDir = outputOptions.dir
      if (outDir) {
        const imagesDir = resolve(outDir, 'images')
        rm(imagesDir, { recursive: true }, () => console.log(`Deleted ${imagesDir}`))
      }
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      include: ['./src/'],
    }),
    cleanImagesDir()
  ],
  build: {
    sourcemap: true,
    outDir: 'lib',
    minify: false,
    lib: {
      formats: ['es', 'cjs'],
      entry: resolve(__dirname, 'src/index.ts'),
      fileName(format, entryName) {
        const isSource = entryName.includes('src/')
        const ext = format === 'es' ? '.mjs' : '.js'
        return (isSource ? entryName.replace('src/', '') : entryName) + ext;
      },
    },
    rollupOptions: {
      external: /node_modules/,
      output: {
        preserveModules: true,
      },
    },
  },
});
