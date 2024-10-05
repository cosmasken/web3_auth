// import { fileURLToPath, URL } from 'url';
// import react from '@vitejs/plugin-react';
// import { defineConfig } from 'vite';
// import environment from 'vite-plugin-environment';
// import dotenv from 'dotenv';

// dotenv.config({ path: '../../.env' });

// export default defineConfig({
//   build: {
//     emptyOutDir: true,
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       define: {
//         global: "globalThis",
//       },
//     },
//   },
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://127.0.0.1:4943",
//         changeOrigin: true,
//       },
//     },
//   },
//   plugins: [
//     react(),
//     environment("all", { prefix: "CANISTER_" }),
//     environment("all", { prefix: "DFX_" }),
//   ],
//   resolve: {
//     alias: [
//       {
//         find: "declarations",
//         replacement: fileURLToPath(
//           new URL("../declarations", import.meta.url)
//         ),
//       },
//     ],
//   },
// });

import path from "path";
import { fileURLToPath, URL } from 'url';
import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";
import environment from 'vite-plugin-environment';
import react from '@vitejs/plugin-react';
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
   root:'.',
  build: {
    outDir: path.resolve(
      __dirname,
      "dist"
    ),
    emptyOutDir: true,
  },
  define: {
    global: "window",
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  // resolve: {
  //   alias: [
  //     {
  //       find: "declarations",
  //       replacement: fileURLToPath(
  //         new URL("../declarations", import.meta.url)
  //       ),
  //     },
  //   ],
  // },
  plugins: [
    react(),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
  ],
  // plugins: [
  //   EnvironmentPlugin("all", { prefix: "CANISTER_" }),
  //   EnvironmentPlugin("all", { prefix: "DFX_" }),
  //   EnvironmentPlugin({ BACKEND_CANISTER_ID: "" }),
  // ],
});

