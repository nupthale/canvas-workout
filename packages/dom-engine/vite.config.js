// vite.config.js
import { defineConfig } from 'vite'
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, ''),
        },
    },
    esbuild: {
        jsxFactory: 'createElement',
        jsxFragment: 'Fragment',
        jsxInject: `
            import { createElement } from '@/engine/utils/util'
        `
    },
})
