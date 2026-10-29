import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

const applicationFiles = ['src/**/*.{js,jsx,ts,tsx}', 'public/scripts/**/*.js'];
const typescriptFiles = ['src/**/*.{ts,tsx}'];

export default [
  {
    ignores: ['dist/**', 'public/scripts/vendor/**', 'public/about-old/**', '**/*.min.js', '**/__*', '**/__*/**'],
  },
  {
    files: [...applicationFiles, '*.config.js'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    rules: js.configs.recommended.rules,
  },
  { files: applicationFiles, languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended.map(config => ({ ...config, files: typescriptFiles })),
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    settings: { react: { version: 'detect' } },
    plugins: { react, 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
    },
  },
  {
    files: typescriptFiles,
    rules: { 'no-undef': 'off', 'react/prop-types': 'off' },
  },
  { files: ['*.config.js'], languageOptions: { globals: globals.node } },
  { files: ['public/scripts/highlights.js'], languageOptions: { sourceType: 'script', globals: { Vue: 'readonly' } } },
];
