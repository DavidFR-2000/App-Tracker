import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import preact from '@preact/preset-vite';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/main.jsx',
            refresh: true,
        }),
        preact(),
    ],
    resolve: {
        alias: {
            'react': 'preact/compat',
            'react-dom': 'preact/compat',
            'react/jsx-runtime': 'preact/jsx-runtime',
            'react/jsx-dev-runtime': 'preact/jsx-dev-runtime'
        },
        extensions: ['.js', '.jsx'] // Asegúrate de que Vite reconoce las extensiones .jsx
    }
});