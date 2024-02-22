import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr(), reactRefresh()],
	resolve: {
		alias: {
			components: path.resolve(__dirname, 'src/components'),
			interfaces: path.resolve(__dirname, 'src/interfaces'),
			assets: path.resolve(__dirname, 'src/assets'),
			pages: path.resolve(__dirname, 'src/pages'),
			styles: path.resolve(__dirname, 'src/styles'),
			data: path.resolve(__dirname, 'src/data'),
		},
	},
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:8000',
				changeOrigin: true,
			},
		},
	},
});
