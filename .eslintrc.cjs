module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	parser: 'vue-eslint-parser',
	extends: [
		'eslint-config-prettier',
		'eslint:recommended', // 使用推荐的eslint
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended', // 使用插件支持vue3
		'plugin:vue/vue3-essential',
		//1.继承.prettierrc.js文件规则  2.开启rules的 "prettier/prettier": "error"  3.eslint fix的同时执行prettier格式化
		'plugin:prettier/recommended',
	],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		parser: '@typescript-eslint/parser',
	},
	plugins: ['vue', '@typescript-eslint', 'prettier'],
	rules: {




		'vue/multi-word-component-names': 'off', // 关闭组件名必须多字
		'@typescript-eslint/no-empty-function': 'off', // 关闭空方法检查
		'@typescript-eslint/no-explicit-any': 'off', // 关闭any类型的警告
		'vue/no-v-model-argument': 'off',



		
		'@typescript-eslint/no-non-null-assertion': 'off',
	},
	globals: {
		DialogOption: 'readonly',
		OptionType: 'readonly',
		defineProps: 'readonly',
		defineEmits: 'readonly',
		defineExpose: 'readonly',
		withDefaults: 'readonly',
	},
};
