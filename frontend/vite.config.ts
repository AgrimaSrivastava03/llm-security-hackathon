import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	server: {
		port: 5173,
		proxy: {
			'/report/out': {
				target: 'http://localhost:8081',
				changeOrigin: true,
				secure: false
			},
			'/evidence': {
				target: 'http://localhost:8081',
				changeOrigin: true,
				secure: false
			},
			'/query': {
				target: 'http://localhost:8081',
				changeOrigin: true,
				secure: false
			}
		}
	}
})
