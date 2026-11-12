import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'astro-src/**', 'public/**', 'migration/**', 'next-env.d.ts'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // The JSON-LD payload is escaped in jsonLd(); the theme and SW-teardown
      // scripts must run before paint and cannot be React components.
      'react/no-danger': 'off',
    },
  },
];

export default config;
