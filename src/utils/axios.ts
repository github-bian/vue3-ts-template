import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const service = axios.create();

// Request interceptors
service.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// do something
		return config;
	},
	(error: any) => {
		return Promise.reject(error);
	}
);

// Response interceptors
service.interceptors.response.use(
	(response: AxiosResponse) => {
		const { code, msg } = response.data;
		if (code === '00000') {
			return response.data;
		}
		// 响应数据为二进制流处理(Excel导出)
		if (response.data instanceof ArrayBuffer) {
			return response;
		}
		return Promise.reject(new Error(msg || 'Error'));
	},
	(error: any) => {
		// do something
		return Promise.reject(error);
	}
);

export default service;
