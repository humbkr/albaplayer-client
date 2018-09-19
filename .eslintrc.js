module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    ecmaFeatures: {
      'jsx': true,
    }
  },
  extends: [
    'airbnb',
  ],
  plugins: [
    'react',
  ],
  // Custom rules.
  rules: {
    'linebreak-style': [2, 'unix'],
    'semi': [2, 'never'],
    'import/newline-after-import': 'warn',
    'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],
    'import/no-duplicates': 'error',
    'no-debugger': 'warn',
    'no-multi-assign': ['error'],
    'no-negated-condition': 'off',
    'no-nested-ternary': 'warn',
    'no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],
    'no-useless-constructor': 'warn',
    'no-var': 'warn',
    'capitalized-comments': [
      'warn',
      'always',
      { ignoreConsecutiveComments: true },
    ],
    'no-inline-comments': 'warn',
    'prefer-destructuring': ['warn', {
      'array': true,
      'object': true
    }, {
      'enforceForRenamedProperties': false
    }],
    'no-confusing-arrow': ['warn', { 'allowParens': false }],
    'no-plusplus': ['off'],
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'ignore',
    }],
    'react/destructuring-assignment': [1, 'never', { 'ignoreClassFields': true }],
    'react/jsx-one-expression-per-line': [0, {'allow': 'single-child'}],
  },
};
