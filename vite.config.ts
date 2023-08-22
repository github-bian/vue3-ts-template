import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
	base: './',
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				//生产环境时移除console和debugger
				drop_console: true,
				drop_debugger: true,
			},
		},
		rollupOptions: {
			output: {
				chunkFileNames: 'static/js/[name]-[hash].js',
				entryFileNames: 'static/js/[name]-[hash].js',
				assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
				manualChunks(id) {
					//静态资源分拆打包
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				},
			},
		},
	},
	resolve: {
		//设置别名
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	css: {
		postcss: {
			plugins: [require('tailwindcss'), require('autoprefixer')],
		},
	},
	plugins: [
		vue(),
		eslintPlugin({
			include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
		}),
		AutoImport({
			// 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
			imports: ['vue', '@vueuse/core', 'vue-router'],
			eslintrc: {
				enabled: false,
				filepath: './.eslintrc-auto-import.json',
				globalsPropValue: true,
			},
			resolvers: [
				// 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
				//   ElementPlusResolver(),
				//   IconsResolver({}),
			],
			vueTemplate: true,
			// 配置文件生成位置(false:关闭自动生成)
			dts: false,
			// dts: "src/auto-import.d.ts" // 生成 `auto-import.d.ts` 全局声明
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
