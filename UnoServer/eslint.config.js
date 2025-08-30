const js = require('@eslint/js')
const globals = require('globals')
const tseslint = require('typescript-eslint')
const { globalIgnores } = require('eslint/config')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')

module.exports = tseslint.config([
  globalIgnores(['dist', 'coverage']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      eslintPluginPrettierRecommended,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,
    },
  },
])
