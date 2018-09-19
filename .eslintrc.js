module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  plugins: [
    'react',
    'prettier',
  ],
  // Custom rules.
  rules: {
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
    'prettier/prettier': 'warn',
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
  },
};
