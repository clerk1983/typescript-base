import js from '@eslint/js'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import jsdoc from 'eslint-plugin-jsdoc'
import prettier from 'eslint-plugin-prettier'
import promise from 'eslint-plugin-promise'
import globals from 'globals'

export default [
  jsdoc.configs['flat/recommended-typescript'],
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: typescriptParser,
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier, // Prettier プラグインを追加
      jsdoc,
      promise,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,
      'prettier/prettier': 'error', // Prettier のルールを適用
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'no-console': 'warn',
      'jsdoc/require-description': 'warn',
      'jsdoc/require-param': 'warn',
      'jsdoc/require-returns': 'warn',
      'promise/always-return': 'error',
      'promise/catch-or-return': 'error',
      'promise/no-return-wrap': 'warn',
      'promise/param-names': 'error',
      'jsdoc/require-description': 'warn',
    },
  },
]
