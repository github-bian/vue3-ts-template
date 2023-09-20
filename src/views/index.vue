<script setup lang="ts">
import UsePinia from '@/components/UsePinia.vue';
import { login, getUserInfo, getError } from '@/api/auth';

function request(num: number) {
	// 模拟接口请求
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(num * 2);
		}, num * 1000);
	});
}

async function getInfo() {
	const sendData = {
		username: 'bian',
		password: '123',
	};
	const p1 = await login(sendData);
	const p2 = await getUserInfo();
	const p3 = await getError();
	console.log('p1', p1, 'p2', p2, 'p3', p3);
}
</script>
<template>
	<div class="w-100 h-100 flex flex-col justify-around items-center rounded bg-blue-100 m-10 p-20">
		<p class="text-5xl">Vite+Vue3+Ts</p>
		<button class="btn" @click="getInfo">获取接口数据</button>
		<button class="btn bg-green-400 rounded-md transform hover:bg-red-500 hover:scale-120 hover:rounded-full duration-1000">按钮1</button>
		<div>
			<img class="w-20 h-20" alt="vite" src="@/assets/vite.png" />
		</div>
		<UsePinia />
		<div class="group flex justify-center p-20 space-x-3 text-2xl text-black-500 cursor-pointer">
			<router-link class="group-hover:text-blue-400" to="/login">login</router-link>
			<router-link class="group-hover:text-green-400" to="/vueUse">vueUse</router-link>
		</div>
	</div>
</template>
