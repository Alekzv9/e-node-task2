module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['google'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'linebreak-style': 0,
    'quote-props': 0,
    'new-cap': 0,
    'object-curly-spacing': 0,
    indent: 0,
    semi: 0,
    'comma-dangle': 0
  }
};
