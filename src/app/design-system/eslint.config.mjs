import { defineConfig, globalIgnores } from 'eslint/config';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import unusedImports from 'eslint-plugin-unused-imports';
import _import from 'eslint-plugin-import';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['**/__mocks__', '**/dist', '**/coverage', '**/reports', '**/*.jest.ts']),
  {
    extends: compat.extends('plugin:storybook/recommended'),

    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
  {
    files: ['**/*.ts'],

    extends: fixupConfigRules(
      compat.extends(
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:import/recommended',
        'prettier',
      ),
    ),

    plugins: {
      'unused-imports': unusedImports,
      import: fixupPluginRules(_import),
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true,
      },
    },

    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: ['ds', 'spr'],
          style: 'camelCase',
        },
      ],

      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: ['ds', 'spr'],
          style: 'kebab-case',
        },
      ],

      'lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: true,
        },
      ],

      'import/no-extraneous-dependencies': 'off',
      '@angular-eslint/component-class-suffix': 'off',
      '@typescript-eslint/explicit-function-return-type': ['error'],
      'unused-imports/no-unused-imports': 'error',
      'import/newline-after-import': 'error',
      '@typescript-eslint/prefer-readonly': ['error'],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'classProperty',
          leadingUnderscore: 'forbid',
          format: null,
        },
      ],

      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'decorated-get',
            'decorated-set',
            'public-decorated-field',
            'protected-decorated-field',
            'private-decorated-field',
            'field',
            'public-static-field',
            'protected-static-field',
            'private-static-field',
            'constructor',
            'public-get',
            'protected-get',
            'private-get',
            'public-set',
            'protected-set',
            'private-set',
            'public-method',
            'protected-method',
            'private-method',
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: fixupConfigRules(compat.extends('plugin:@angular-eslint/template/recommended')),
    rules: {},
  },
]);
