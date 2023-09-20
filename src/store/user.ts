import { defineStore } from 'pinia';
interface NameType {
	name: string;
	count: number;
}
export const useUserStore = defineStore({
	id: 'user', // id必填，且需要唯一
	state: (): NameType => {
		return {
			name: 'deppon',
			count: 27,
		};
	},
	// getters
	getters: {
		doubleCount: (state) => {
			return state.count * 2;
		},
	},
	// actions
	actions: {
		// actions 同样支持异步写法
		countAdd() {
			// 可以通过 this 访问 state 中的内容
			this.count++;
		},
		countReduce() {
			this.count--;
		},
		updateName(name: string) {
			this.name = name;
		},
	},
});
