# Vite + Vue3 + Typescript + Pinia + Vueuse


# 1. 初始化项目

## 按步骤提示初始化：

1.  使用 `deppon-front-cli` 命令

```bash
# 1. 切换npm源为华为云
pnpm config set registry https://repo.huaweicloud.com/repository/npm/

# 2. 安装脚手架工具
pnpm install deppon-front-cli

# 3. 创建项目
deppon-front-cli create [项目名称]

# 4. 选择需要的框架
 >   vue     // 默认就是 vue3
     react   // react

# 5. 进入创建项目的根目录执行命令
cd [项目名称] && pnpm install && pnpm run dev
```
## 环境依赖版本

-   [node](https://github.com/nodejs/node)：v16.16.0
-   [vite](https://github.com/vitejs/vite)：^4.3.5
-   [vue](https://github.com/vuejs/vue)：^3.3.1
-   [typescript](https://github.com/microsoft/TypeScript)：^5.0.4
-   [pinia](https://github.com/vuejs/pinia)：^2.0.33
-   [vue-router](https://github.com/vuejs/router)：^4.2.0
-   [vueuse](https://github.com/vueuse/vueuse)：^8.2.0
-   [eslint](https://github.com/eslint/eslint)：^8.40.0
-   [prettier](https://github.com/prettier/prettier)：^2.8.8
-   [commitizen](https://github.com/commitizen/cz-cli)：^4.3.0
-   [husky](https://github.com/typicode/husky)：^8.0.3

## 环境准备

| 环境                 | 名称版本                                                     | 备注                                                         |
| -------------------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| **开发工具**         | VSCode                                                       | [下载地址](https://code.visualstudio.com/Download)           |
| **运行环境**         | Node 14+                                                     | [下载地址](http://nodejs.cn/download)                        |
| **VSCode插件(必装)** | 1. `Vue Language Features (Volar) ` <br/> 2. `TypeScript Vue Plugin (Volar) `  <br/>3. 禁用 Vetur | ![vscode-plugin](https://foruda.gitee.com/images/1687755823108948048/d0198b2d_716974.png) |

# 2. 代码质量风格的统一
 ### 1. ESLint
>JavaScript 语法规则和代码风格检查

  - ESLint `保存自动检测` VSCode 插件市场搜索 `ESLint` 插件并安装,打开 File → Preferences → Settings 搜索 Editor: Code Actions On Save 选择 Workspace标签设置工作区，点击 Edit in settings.json
```javascript
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true // 开启eslint自动检测
  }
}

```

- `eslintrc.cjs`
 ```javascript
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
  
 ```
 
  ### 2. Stylelint
  >CSS 统一规范和代码检测；一个强大的 CSS linter(检查器)，可帮助您避免错误并强制执行约定
  - VSCode 插件搜索 Stylelint 并安装,VSCode 的 settings.json 配置内容如下:
  ```javascript
    {
    "editor.codeActionsOnSave": {
        "source.fixAll.stylelint": true // 开启 Stylelint 保存自动检测
    },
    // Stylelint 校验文件
    "stylelint.validate": ["css", "scss", "vue", "html"]
    }

  ```
  - `.stylelintrc.cjs`
 ```javascript
module.exports = {
  // 继承推荐规范配置
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-scss",
    "stylelint-config-recommended-vue/scss",
    "stylelint-config-html/vue",
    "stylelint-config-recess-order",
  ],
  // 指定不同文件对应的解析器
  overrides: [
    {
      files: ["**/*.{vue,html}"],
      customSyntax: "postcss-html",
    },
    {
      files: ["**/*.{css,scss}"],
      customSyntax: "postcss-scss",
    },
  ],
  // 自定义规则
  rules: {
    // 允许 global 、export 、v-deep等伪类
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global", "export","v-deep", "deep"],
      },
    ],
  },
};


 ```

  ### 3. Prettier
  >全局代码格式化
  - 安装 Prettier 插件 VSCode 插件市场搜索 `Prettier - Code formatter` 插件安装,VSCode 的 settings.json 配置:
  ```javascript
  {
  "editor.formatOnSave": true, // 保存格式化文件
  "editor.defaultFormatter": "esbenp.prettier-vscode" // 指定 prettier 为所有文件默认格式化器
}
  ```
  - `prettierrc.cjs`
```javascript
module.exports = {
	// 一行最多多少个字符
	printWidth: 150,
	// 指定每个缩进级别的空格数
	tabWidth: 2,
	// 使用制表符而不是空格缩进行
	useTabs: true,
	// 在语句末尾是否需要分号
	semi: true,
	// 是否使用单引号
	singleQuote: true,
	// 更改引用对象属性的时间 可选值"<as-needed|consistent|preserve>"
	quoteProps: 'as-needed',
	// 在JSX中使用单引号而不是双引号
	jsxSingleQuote: false,
	// 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
	trailingComma: 'es5',
	// 在对象文字中的括号之间打印空格
	bracketSpacing: true,
	// jsx 标签的反尖括号需要换行
	jsxBracketSameLine: false,
	// 在单独的箭头函数参数周围包括括号 always：(x) => x \ avoid：x => x
	arrowParens: 'always',
	// 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
	rangeStart: 0,
	rangeEnd: Infinity,
	// 指定要使用的解析器，不需要写文件开头的 @prettier
	requirePragma: false,
	// 不需要自动在文件开头插入 @prettier
	insertPragma: false,
	// 使用默认的折行标准 always\never\preserve
	proseWrap: 'preserve',
	// 指定HTML文件的全局空格敏感度 css\strict\ignore
	htmlWhitespaceSensitivity: 'css',
	// Vue文件脚本和样式标签缩进
	vueIndentScriptAndStyle: false,
	//在 windows 操作系统中换行符通常是回车 (CR) 加换行分隔符 (LF)，也就是回车换行(CRLF)，
	//然而在 Linux 和 Unix 中只使用简单的换行分隔符 (LF)。
	//对应的控制字符为 "\n" (LF) 和 "\r\n"(CRLF)。auto意为保持现有的行尾
	// 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
	endOfLine: 'auto',
};

```

3. 修改 `.eslintrc.js` 配置

```javascript
module.exports = {
    ...

    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended'
    ],

    ...
};
```

4. 命令行式运行：修改 `package.json`

```json
{
    ...
    "scripts": {
        ...
        "prettier:comment": "自动格式化当前目录下的所有文件",
        "prettier": "prettier --write"
    }
    ...
}
```



# 3. 规范git提交
>为了使团队多人协作更加的规范，所以需要每次在 git 提交的时候，做一次硬性规范提交，规范 git 的提交信息
### 核心内容是配置 Husky 的 pre-commit 和 commit-msg 两个钩子:
   1. `pre-commit`：`Husky`+ `Lint-staged` 整合实现 Git 提交前代码规范检测/格式化 (前提：ESlint + Prettier + Stylelint 代码统一规范)；
   2. `commit-msg`: `Husky` + `Commitlint` + `Commitizen` + `cz-git` 整合实现生成规范化且高度自定义的 Git commit message

| 名称                 | 介绍               | 
-------------------- | :----------------------------------------------------------- | 
| **Husky**         | 是 Git 钩子工具，可以设置在 git 各个阶段（pre-commit、commit-msg 等）触发                                                       | 
| **Lint-staged**   | 是一个在 git add 到暂存区的文件运行 linters (ESLint/Prettier/StyleLint) 的工具，避免在 git commit 提交时在整个项目执行。                                                 |
| **Commitlint** | 检查您的提交消息是否符合 Conventional commit format | 
| **Commitizen** | 基于Node.js的 git commit 命令行工具，辅助生成标准化规范化的 commit message| 
| **cz-git** | 一款工程性更强，轻量级，高度自定义，标准输出格式的 commitizen 适配器|




