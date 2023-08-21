module.exports = {
	'*.{ts,js,vue}': [
		'prettier --write', // 对暂存区文件进行格式化
		'eslint --fix', // 检测
	],
};
