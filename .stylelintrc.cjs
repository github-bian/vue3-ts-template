module.exports = {
    // 继承推荐规范配置
    extends: [
      "stylelint-config-standard",
      "stylelint-config-recommended-scss",
      "stylelint-config-recommended-vue/scss",
      "stylelint-config-html/vue",
      "stylelint-config-recess-order",
      'stylelint-config-prettier', // 配置stylelint和prettier兼容
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
      "import-notation": "string", // 指定导入CSS文件的方式("string"|"url")
      "selector-class-pattern": null, // 选择器类名命名规则
      "custom-property-pattern": null, // 自定义属性命名规则
      "keyframes-name-pattern": null, // 动画帧节点样式命名规则
      "no-descending-specificity": null, // 允许无降序特异性
      'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
      'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
      'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
      'no-empty-source': null, // 关闭禁止空源码
      'selector-class-pattern': null, // 关闭强制选择器类名的格式
      'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
      'block-opening-brace-space-before': 'always', //大括号之前必须有一个空格或不能有空白符
      'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
      'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
      // 允许 global 、export 、deep伪类
      "selector-pseudo-class-no-unknown": [
        true,
        {
          ignorePseudoClasses: ["global", "export", "deep",'v-deep'],
        },
      ],
      // 允许未知属性
      "property-no-unknown": [
        true,
        {
          ignoreProperties: ["menuBg", "menuText", "menuActiveText"],
        },
      ],
    },
  };
  