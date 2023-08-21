// check-version.mjs文件内容
import semver from 'semver';
import fs from 'fs';

const packageJson = fs.readFileSync('./package.json', 'utf8');
const packageObj = JSON.parse(packageJson);
const version = packageObj.engines.node;

console.log('项目规定 node 版本：' + version);
console.log('当前本地 node 版本：' + process.version);

if (!semver.satisfies(process.version, version)) {
	console.log(`node 版本校验不通过，所需的 node 版本 ${version} 不匹配当前版本 ${process.version}.`);
	process.exit(1);
} else {
	console.log('node 版本校验通过');
}
