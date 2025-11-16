import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern',
            },
        },
    },
    plugins: [
        tailwindcss(),
        sveltekit(),
        devtoolsJson()
    ],
    server: {
        port: 5137
    }
});
