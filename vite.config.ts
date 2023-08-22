import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { UserConfig, ConfigEnv, loadEnv, defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
const pathSrc = path.resolve(__dirname, 'src');

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd()); //获取当前环境
	return {
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
				'@': pathSrc,
			},
		},
		css: {
			// CSS 预处理器
			preprocessorOptions: {
				//define global scss variable
				scss: {
					javascriptEnabled: true,
					additionalData: `
						@use "@/styles/variables.scss" as *;
					  `,
				},
			},
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
			host: '0.0.0.0',
			port: Number(env.VITE_APP_PORT), //端口号
			open: true, // 运行是否自动打开浏览器
			proxy: {
				// 反向代理解决跨域
				[env.VITE_APP_BASE_API]: {
					target: 'your https address', //接口地址
					changeOrigin: true,
					rewrite: (path: string) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''), // 替换 /dev-api 为 target 接口地址
				},
			},
		},
		// 预加载项目必需的组件
		optimizeDeps: {
			include: ['vue', 'vue-router', 'pinia', 'axios', 'path-to-regexp'],
		},
	};
});
