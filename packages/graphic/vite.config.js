// vite.config.js
import { defineConfig } from 'vite'
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            '@engine': path.resolve(__dirname, '../dom-engine/engine'),
        },
    },
    esbuild: {
        jsxFactory: 'createElement',
        jsxFragment: 'Fragment',
        jsxInject: `
            import { createElement } from '@engine/utils/util'
        `
    },
})
