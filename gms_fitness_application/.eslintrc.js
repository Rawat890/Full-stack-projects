module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['module:@react-native/babel-preset'],
    },
  },
  extends: [
    '@react-native',
    'plugin:import/recommended',
    'plugin:import/warnings',
  ],
  plugins: ['import'],
  rules: {
    'import/no-unresolved': 'off',

    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json'],
      },
    },
    'import/ignore': ['react-native'],
  },
};
