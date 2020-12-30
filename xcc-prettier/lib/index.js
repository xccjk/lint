exports.getPrettier = (options = {}) => {
  return {
    semi: false,
    printWidth: 140,
    tabWidth: 2,
    singleQuote: true,
    bracketSpacing: true,
    jsxBracketSameLine: false,
    useTabs: false,
    arrowParens: 'avoid',
    jsxSingleQuote: true,
    trailingComma: 'none'
  }
}