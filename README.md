# 代码规范

## 安装相关依赖

安装代码风格相关插件`eslint`、`prettier`、`stylelint`

`npm install xcc-standard-eslint xcc-standard-prettier xcc-standard-stylelint eslint-plugin-react eslint`

安装`commit`阶段插件

`npm install xcc-commitlint husky lint-staged`

安装`changelog`插件

`npm install conventional-changelog-cli`


## 配置文件

### `.eslintrc.js`

- `useTs`是否为typescript编写，默认false
- `ignorePatterns`需要排除的风格转换文件夹
- `rules`自定义配置规则，可以用来覆盖默认规则

#### 用法

```
  // ts配置
  const { getEslint } = require('xcc-standard-eslint')

  module.exports = {
    ...getEslint({
      ignorePatterns: ['.dll', 'build', '.temp'],
      useTs: true,
      rules: {
        'comma-dangle': 'off',
        'function-paren-newline': 'off',
        'global-require': 'off',
        'import/no-dynamic-require': 'off',
        'no-inner-declarations': 'off',
        // New rules
        'class-methods-use-this': 'off',
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        /**
        * 0: 禁止规则
        * 1: 警告
        * 2: 必须
        */
        // render不规范
        'react/display-name': 'off',
        // 变量名不正确，比如 style_id
        '@typescript-eslint/camelcase': 'off',
        // 允许any
        '@typescript-eslint/no-explicit-any': 'off',
        'react/prop-types': 'off',
        // 空函数
        '@typescript-eslint/no-empty-function': 0,
        // 函数先后顺序
        '@typescript-eslint/no-use-before-define': 'off',
        // return null
        '@typescript-eslint/ban-ts-ignore': 'off',

        'require-atomic-updates': 'off',
        '@typescript-eslint/triple-slash-reference': 'off',
        // 未使用变量
        '@typescript-eslint/no-unused-vars': 0,
        // 数组统一空格 [1, 2, 3, ...]
        'array-bracket-spacing': 2,
        // prettier 中默认函数名不加空格，类似 function add() {}，而eslint中默认为function add () {}
        'space-before-function-paren': 0
      }
    })
  }
```


### `.eslintignore`

> 排除不需要执行检查的文件

#### 用法

```
  dist
  build
  config
  scripts
  node_modules
  public
  .babelrc
  !.*.js
  publish.js
  server.js
  version.js
  tsconfig.json
  package.json
```


### `.prettierrc.js`

#### 用法

```
  const { getPrettier } = require('xcc-standard-prettier')

  module.exports = {
    ...getPrettier()
  }
```

### `.prettierignore`

> 排除要进行代码美化的文件

#### 用法

```
  .dll
  build/
  .temp
  node_modules
  .vscode
```

### `.stylelintrc.js`

> css文件的格式化及美化，less与scss中毒可以用

#### 用法

```
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

### `.commitlintrc.js`

#### 用法

> commit阶段效验

```
  const { getCommitLint } = require('xcc-commitlint')

  module.exports = {
    ...getCommitLint()
  }
```

## script

### 命令

> lint:style中文件需要根据使用的是less或者scss来换

- `npm run lint`: 检查语法等格式，规范不对的js文件
- `npm run lint-fix`: 检查规范不对的文件并相关
- `npm run lint:style`: 列出样式文件风格问题
- `npm run lint-fix:style`: 格式化样式文件
- `npm run changelog`: 列出每次提交的changelog记录
- `npm run changelog:create`: 生成changelog文件


```
  "script": {
    ...
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx --quiet",
    "lint-fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "lint:style": "stylelint 'src/**/*.less' --syntax less",
    "lint-fix:style": "npm run lint:style -- --fix",
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -w -r 0",
    "changelog:create": "npm run changelog -- -s -r 0"
  }
```

### commit配置

```
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ]
  },
```

### changelog

在安装了依赖包后，运行命令即可生成对应的changelog文件

- build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
- ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
- docs：文档更新
- feat：新增功能
- feature：新增功能
- fix：bug 修复
- bugfix：bug 修复
- perf：性能优化
- refactor：重构代码(既没有新增功能，也没有修复 bug)
- style：不影响程序逻辑的代码修改(修改空白字符，补全缺失的分号等)
- test：新增测试用例或是更新现有测试
- revert：回滚某个更早之前的提交
- chore：不属于以上类型的其他类型(日常事务)


