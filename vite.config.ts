import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/models/*.{glb,fbx}',
          dest: 'assets/models',
        },
        {
          src: 'src/assets/preview/*.{png,jpg}',
          dest: 'assets/preview',
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      // Основные пути
      '@': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      
      // Flow директории
      '@flow': path.resolve(__dirname, './src/flow'),
      '@utils': path.resolve(__dirname, './src/flow/utils'),
      '@constants': path.resolve(__dirname, './src/flow/constants'),
      '@schemes': path.resolve(__dirname, './src/flow/schemes'),
      '@types': path.resolve(__dirname, './src/flow/types'),
      '@store': path.resolve(__dirname, './src/flow/store'),
      
      // Оптимизация для tabler icons
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
  build: {
    outDir: 'public',
    assetsDir: './',
    emptyOutDir: true,
  },
  assetsInclude: ['**/*.glb', '**/*.fbx'],
  publicDir: 'public',
});