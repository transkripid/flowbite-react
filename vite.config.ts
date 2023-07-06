import react from '@vitejs/plugin-react';
import { rm } from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import pkg from './package.json';

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
    tsconfigPaths({
      projects: [resolve(__dirname, 'tsconfig.lib.json')],
    }),
    dts({
      include: ['./src/'],
    }),
    cleanImagesDir()
  ],
  build: {
    sourcemap: true,
    outDir: 'lib',
    minify: true,
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
      external: [
        ...Object.keys(pkg.dependencies),
        ...Object.keys(pkg.peerDependencies),
        'react/jsx-runtime',
        /react-icons/
      ],
      output: {
        preserveModules: true,
      },
    },
  },
});
