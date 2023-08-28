// mock/user.ts
import { MockMethod } from 'vite-plugin-mock';
const mock: Array<MockMethod> = [
	// 用户登录
	{
		url: '/api/user/login',
		method: 'post',
		response: (res) => {
			return {
				code: '0',
				message: 'success',
				data: {
					accessToken: 'Token',
					expires: new Date(),
				},
			};
		},
	},
	// 获取用户信息
	{
		url: '/api/user/info',
		method: 'get',
		response: (res) => {
			return {
				code: '0',
				message: 'success',
				data: {
					id: '2467751560226270',
					username: '边角料',
					avatar: 'https://avatars.githubusercontent.com/u/30947370?v=4',
					description: '前端开发',
				},
			};
		},
	},

	// 一个失败的请求
	{
		url: '/api/error',
		method: 'get',
		response: (res) => {
			return {
				code: '1',
				message: '密码错误',
				data: null,
			};
		},
	},
];
export default mock;
