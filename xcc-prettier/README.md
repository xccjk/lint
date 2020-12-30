# `xcc-standard-prettier`

## 功能

- 用来美化代码，空格，换行，风格等
- `https://prettier.io/docs/en/index.html`

## 用法

- 安装`npm install xcc-standard-prettier -D`
- 项目根目录添加文件`.prettierrc.js`与`.prettierignore`
- `rules`配置规则，可以覆盖默认规则
  - 老项目中有许多不符合规范的字段及代码风格，比如变量命名为`style_id`，就需要忽略掉


```
  // prettierrc.js
  const { getPrettier } = require('xcc-standard-prettier')

  module.exports = {
    ...getPrettier()
  }
```
