import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'

export default {
    root: 'src/',
    publicDir: '../public/',
    base: './',
    plugins:
    [
        // React support
        react(),

        // PostCSS plugin for autoprefixer
        {
            name: 'postcss',
            async transform(css, id) {
                if (!id.endsWith('.css')) return

                const result = await postcss([autoprefixer]).process(css, {
                    from: undefined,
                });

                return {
                    code: result.css,
                    map: result.map,
                }
            },
        },
    ],

    server:
    {
        host: true, // Open to local network and display URL
        // open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },

    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: false // Add sourcemap
    },
}
