import request, { http } from '@/utils/request';

import type { LoginData, LoginRes, UserInfoRes, errInfoRes } from './types';

/**
 * 登录
 */
export function login(data: LoginData) {
	return http.post<LoginRes>('api/user/login', data);
}

/**
 * 获取登录用户信息
 */
export function getUserInfo() {
	return http.get<UserInfoRes>('api/user/info');
}

export function getError() {
	return http.get<errInfoRes>('api/error');
}
