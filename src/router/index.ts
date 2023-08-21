import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'LoginPage',
		meta: {
			title: '登录',
			keepAlive: true,
			requireAuth: false,
		},
		component: () => import('@/views/login.vue'),
	},
	{
		path: '/',
		name: 'IndexPage',
		meta: {
			title: '首页',
			keepAlive: true,
			requireAuth: true,
		},
		component: () => import('@/views/index.vue'),
	},
	{
		path: '/vueUse',
		name: 'VueUse',
		meta: {
			title: 'vueUse demo',
			keepAlive: true,
			requireAuth: true,
		},
		component: () => import('@/views/vueUse.vue'),
	},
	{
		path: '/request',
		name: 'RequestPage',
		meta: {
			title: 'request demo',
			keepAlive: true,
			requireAuth: true,
		},
		component: () => import('@/views/request.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});
export default router;
