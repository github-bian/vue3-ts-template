import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
export default defineConfig({
	resolve: {
		//设置别名
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	plugins: [
		vue(),
		eslintPlugin({
			include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
		}),
	],
	server: {
		port: 8080, //启动端口
		hmr: {
			host: 'localhost',
			port: 8080,
		},
		// 设置代理
		proxy: {
			'/api': {
				target: 'your https address',
				changeOrigin: true,
				rewrite: (path: string) => path.replace(/^\/api/, ''),
			},
		},
	},
});
