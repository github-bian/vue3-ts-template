import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const handleRequestHeader = (config: any) => {
	config['xxxx'] = 'xxx';
	return config;
};

const handleAuth = (config: any) => {
	// config.header['token'] = localStorage.getItem('token') || ''
	return config;
};

// 创建 axios 实例
const service = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API,
	timeout: 50000,
	headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

// 请求拦截器
service.interceptors.request.use(
	(config: InternalInternalAxiosRequestConfig) => {
		// console.log("请求拦截器", config)
		// 1.请求的调整 2.配置用户标识
		config = handleRequestHeader(config);
		config = handleAuth(config);
		return config;
	},
	(error: any) => {
		return Promise.reject(error);
	}
);

//响应拦截
service.interceptors.response.use(
	(response: AxiosResponse) => {
		console.log('响应拦截', response);
		if (response.status !== 200) return Promise.reject(response.data);
		handleAuthError(response.data.code);
		handleGeneralError(response.data.code, response.data.message);
		return response.data;
	},
	(err) => {
		handleNetworkError(err.response.status);
		Promise.reject(err.response);
	}
);

/* 导出封装的请求方法 */
export const http = {
	get<T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
		return service.get(url, config);
	},

	post<T = any>(url: string, data?: object, config?: InternalAxiosRequestConfig): Promise<T> {
		return service.post(url, data, config);
	},

	put<T = any>(url: string, data?: object, config?: InternalAxiosRequestConfig): Promise<T> {
		return service.put(url, data, config);
	},

	delete<T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
		return service.delete(url, config);
	},
};

/*响应拦截器
 *网络错误处理 handleNetworkError
 *授权错误处理 handleAuthError
 *普通错误处理 handleGeneralError
 */

//网络错误处理
const handleNetworkError = (errStatus: number) => {
	let errMessage = '未知错误';
	if (errStatus) {
		switch (errStatus) {
			case 400:
				errMessage = '错误的请求';
				break;
			case 401:
				errMessage = '未授权，请重新登录';
				break;
			case 403:
				errMessage = '拒绝访问';
				break;
			case 404:
				errMessage = '请求错误,未找到该资源';
				break;
			case 405:
				errMessage = '请求方法未允许';
				break;
			case 408:
				errMessage = '请求超时';
				break;
			case 500:
				errMessage = '服务器端出错';
				break;
			case 501:
				errMessage = '网络未实现';
				break;
			case 502:
				errMessage = '网络错误';
				break;
			case 503:
				errMessage = '服务不可用';
				break;
			case 504:
				errMessage = '网络超时';
				break;
			case 505:
				errMessage = 'http版本不支持该请求';
				break;
			default:
				errMessage = `其他连接错误 --${errStatus}`;
		}
	} else {
		errMessage = `无法连接到服务器！`;
	}
	alert(`错误1-${errMessage}`); // 这里建议更改为你所用UI框架的message *例如:message.error(errMessage)
};
//授权错误处理|错误list可根据业务所需自行扩展
const handleAuthError = (errno: string | number) => {
	const authErrMap: any = {
		'10031': '登录失效，需要重新登录', // token 失效
		'10032': '您太久没登录，请重新登录~', // token 过期
		'10033': '账户未绑定角色，请联系管理员绑定角色',
		'10034': '该用户未注册，请联系管理员注册用户',
		'10035': 'code 无法获取对应第三方平台用户',
		'10036': '该账户未关联员工，请联系管理员做关联',
		'10037': '账号已无效',
		'10038': '账号未找到',
	};

	if (authErrMap.hasOwnProperty(errno)) {
		alert(`错误2-${authErrMap[errno]}`); // 这里建议更改为你所用UI框架的message *例如:message.error(errMessage)
		// 授权错误，登出账户
		// logout()
		return false;
	}
	return true;
};
//普通错误处理
const handleGeneralError = (errno: string, errmsg: string) => {
	if (errno !== '0') {
		alert(`错误-3${errmsg}`); // 这里建议更改为你所用UI框架的message *例如:message.error(errMessage)
		return false;
	}
	return true;
};

// 导出 axios 实例
export default service;
