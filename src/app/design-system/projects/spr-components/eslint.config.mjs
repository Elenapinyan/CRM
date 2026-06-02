import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/*.{ts,html}'],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['tsconfig.lib.json'],
        createDefaultProgram: true,
      },
    },
    ignores: [],
  },
];
