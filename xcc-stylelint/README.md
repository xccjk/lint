# `xcc-standard-stylelint`

## 功能

- 用来格式化css文件，在less与scss中都可以使用

## 用法

- 安装`npm install xcc-standard-prettier -D`
- 项目根目录添加文件`.stylelintrc.js`
- `rules`配置规则，可以覆盖默认规则


```
  // stylelintrc.js
  const { getStyleLint } = require('xcc-standard-stylelint')

  module.exports = {
    ...getStyleLint({
      rules: {
        // 字体文件相关
        'font-family-no-missing-generic-family-keyword': null,
        // 空的样式文件
        'no-empty-source': null,
        // 计算属性 calc()
        'function-calc-no-invalid': null
      }
    })
  }
```
