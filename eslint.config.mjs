// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      'linebreak-style': 'off', // 줄 끝 체크 안 함
      'import/no-unresolved': 'off', // 필요 시
      'prettier/prettier': 'error',
      'import/extensions': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      'indent': ['error', 2], // 들여쓰기 2칸
      'quotes': ['error', 'double'], // 작은따옴표
      'semi': ['error', 'always'], // 세미콜론 항상
      'comma-dangle': ['error', 'only-multiline'], // 마지막 쉼표
      'object-curly-spacing': ['error', 'always'], // 객체 중괄호 공백
      'array-bracket-spacing': ['error', 'never'], // 배열 대괄호 공백 없음
      'space-before-function-paren': ['error', 'never'],
    },
  },
);