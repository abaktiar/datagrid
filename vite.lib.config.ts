import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/lib/**/*', 'src/components/DataGrid/**/*'],
      exclude: ['src/App.tsx', 'src/main.tsx', 'src/utils/**/*', 'src/components/DemoControls/**/*'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'AbaktiarDataGrid',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'esm.' : ''}js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@tanstack/react-table', '@tanstack/react-virtual', 'xlsx'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@tanstack/react-table': 'ReactTable',
          '@tanstack/react-virtual': 'ReactVirtual',
          xlsx: 'XLSX',
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    minify: false,
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});