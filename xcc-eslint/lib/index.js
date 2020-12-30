exports.getEslint = (options = {}) => {
  const useTs = options.useTs || false
  const ignorePatterns = options.ignorePatterns || [] // vscode-eslint 还不支持
  const rules = options.rules || {}
  const _extends = useTs ? [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint'
  ] : []
  const _plugins = useTs ? ['react', '@typescript-eslint', 'prettier'] : ['react', 'prettier']
  return {
    extends: [
      'eslint:recommended',
      'plugin:prettier/recommended',
      'plugin:react/recommended',
    ].concat(_extends),
    parser: useTs ? '@typescript-eslint/parser' : 'babel-eslint',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: { legacyDecorators: true, jsx: true },
    },
    rules: {
      'no-const-assign': 'error',
      'react/prop-types': 0,
      ...rules,
    },
    env: {
      browser: true,
      node: true,
      es6: true,
      jest: true
    },
    plugins: _plugins,
    settings: {
      react: {
        version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          paths: ['./src'],
        },
      },
    },
    ignorePatterns: ['node_modules', ...ignorePatterns],
  }
}