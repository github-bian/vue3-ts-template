module.exports = {
	env: {
	  browser: true,
	  es2021: true,
	  node: true,
	},
	parser: "vue-eslint-parser",
	extends: [
	  "plugin:vue/vue3-recommended",
	//   "./.eslintrc-auto-import.json",
	  "prettier",
	],
	parserOptions: {
	  ecmaVersion: "latest",
	  sourceType: "module",
	  parser: "@typescript-eslint/parser",
	},
	plugins: ["vue", "@typescript-eslint"],
	rules: {
	  "vue/multi-word-component-names": "off", // 关闭组件名必须多字
	  "@typescript-eslint/no-empty-function": "off", // 关闭空方法检查
	  "@typescript-eslint/no-explicit-any": "off", // 关闭any类型的警告
	  "vue/no-v-model-argument": "off",
	  "@typescript-eslint/no-non-null-assertion": "off",
	},
	globals: {
	  DialogOption: "readonly",
	  OptionType: "readonly",
	},
  };
  