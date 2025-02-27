import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import {defineConfig, loadEnv} from "vite";
import * as fs from "fs";
import * as path from "node:path";
import mkcert from 'vite-plugin-mkcert'

export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        base: "/documents_frontend",
        server: {
            host: true,
            proxy: {
                "/api1": {
                    target: process.env.VITE_API1_URL,
                    rewrite: path => path.replace(/^\/api1/, '/api')
                },
                "/api2": {
                    target: process.env.VITE_API2_URL,
                    rewrite: path => path.replace(/^\/api2/, '/api')
                }
            },
            https:{
                key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
                cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
            },
        },
        plugins: [
            react(),
            mkcert(),
            tsconfigPaths()
        ]
    });
}