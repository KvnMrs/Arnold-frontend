module.exports = {
  env: {
    commonjs: true,
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Use our .prettierrc file as source
    'no-console': 1,
  },

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2021,
  },
};
