# `xcc-commitlint`

## 功能

- 用来在commit时确认是否规范
- 通过gitlab等钩子在提交代码是效验代码格式

## 用法

- 安装`npm install xcc-commitlint -D`
- 项目根目录添加文件`.commitlintrc.js`
- `rules`配置规则，可以覆盖默认规则


```
  // .commitlintrc.js
  const { getCommitLint } = require('xcc-commitlint')

  module.exports = {
    ...getCommitLint()
  }
```
