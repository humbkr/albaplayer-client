module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      'jsx': true,
    },
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
  ],
  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  settings: {
    react: {
      version: '16.13.1',
    },
    'import/resolver': {
      'node': {
        'paths': ['src'],
      }
    }
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never',
      }
    ],

    'linebreak-style': [2, 'unix'],
    'semi': [2, 'never'],
    'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 1 }],
    'global-require': 'off',
    'import/export': 'error',
    'import/first': ['error', 'absolute-first'],
    'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': true}],
    'eqeqeq': ['error', 'always', { null: 'ignore' }],
    'no-debugger': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-multi-assign': ['error'],
    'no-negated-condition': 'off',
    'no-nested-ternary': 'error',
    'no-param-reassign': ['off'],
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],
    'no-useless-constructor': 'error',
    'no-var': 'error',
    'no-empty': 'error',
    'object-curly-newline': ['warn'],
    'prefer-destructuring': [
      'warn',
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'capitalized-comments': [
      'warn',
      'always',
      { ignoreConsecutiveComments: true },
    ],
    'no-inline-comments': 'warn',
    'no-confusing-arrow': ['warn', { 'allowParens': true }],
    'max-len': ['warn', { code: 120 }],
    'arrow-parens': ['warn', 'always'],
    'no-plusplus': ['off'],
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'ignore',
    }],
    'no-empty-pattern': ['error'],
    'no-use-before-define': ['error', { 'functions': true, 'classes': true, 'variables': false }],
    'react/destructuring-assignment': [0, 'never', { 'ignoreClassFields': true }],
    'react/jsx-one-expression-per-line': [0, { 'allow': 'single-child' }],
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/prefer-stateless-function': ['error'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
}
