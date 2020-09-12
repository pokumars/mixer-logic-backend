module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 12
  },
  'rules': {
    'indent': [
      'warn',
      2
    ],
    'linebreak-style': [
      'warn',
      'windows'
    ],
    'quotes': [
      'warn',
      'single'
    ],
    'semi': [
      'warn',
      'always'
    ],
    eqeqeq: [
      'error',
      'always'
    ],
    'no-trailing-spaces': 'error',
    'no-console': 0,
    'object-curly-spacing': ['error', 'always']
  }
};
//https://eslint.org/docs/rules/no-trailing-spaces
//https://eslint.org/docs/rules/object-curly-spacing