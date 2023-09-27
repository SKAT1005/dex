import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import NodeModulesPolyfillPlugin from '@esbuild-plugins/node-modules-polyfill';
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { nodeResolve } from '@rollup/plugin-node-resolve';


export default defineConfig({
 server: {
    https: true,
    host: 'tegro.finance',
    port: 443
  },
  plugins: [react()],
  resolve: {
    alias: {
      util: 'web-encoding',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  build: {
    target: ['ESNext'],
    rollupOptions: {
      plugins: [
        nodePolyfills(),
        NodeModulesPolyfillPlugin(),
        nodeResolve({ browser: true }),
      ],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
