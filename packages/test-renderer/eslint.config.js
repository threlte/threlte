import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import perfectionist from 'eslint-plugin-perfectionist'
import svelte from 'eslint-plugin-svelte'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import ts from 'typescript-eslint'

import svelteConfig from './svelte.config.js'

export default defineConfig(
  prettier,
  js.configs.recommended,
  perfectionist.configs['recommended-natural'],
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  ...svelte.configs.prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    name: 'ignores',
    ignores: [
      '.svelte-kit',
      'dist',
      '.DS_Store',
      'node_modules',
      'build',
      'package',
      '.env',
      '.env.*',
      'pnpm-lock.yaml',
    ],
  },
  {
    files: [
      '**/*.svelte',
      '**/*.svelte.js',
      '**/*.svelte.ts',
      '../*.svelte.config.ts',
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'], // Add support for additional file extensions, such as .svelte
        parser: ts.parser,
        // Specify a parser for each language, if needed:
        // parser: {
        //   ts: ts.parser,
        //   js: espree,    // Use espree for .js files (add: import espree from 'espree')
        //   typescript: ts.parser
        // },

        // We recommend importing and specifying svelte.config.js.
        // By doing so, some rules in eslint-plugin-svelte will automatically read the configuration and adjust their behavior accordingly.
        // While certain Svelte settings may be statically loaded from svelte.config.js even if you don’t specify it,
        // explicitly specifying it ensures better compatibility and functionality.
        svelteConfig,
      },
    },
  },
  {
    name: 'perfectionist',
    rules: {
      'perfectionist/sort-array-includes': 'off',
      'perfectionist/sort-classes': 'off',
      'perfectionist/sort-decorators': 'off',
      'perfectionist/sort-enums': 'off',
      'perfectionist/sort-export-attributes': 'off',
      'perfectionist/sort-exports': 'off',
      'perfectionist/sort-heritage-clauses': 'off',
      'perfectionist/sort-interfaces': 'off',
      'perfectionist/sort-intersection-types': 'off',
      'perfectionist/sort-jsx-props': 'off',
      'perfectionist/sort-maps': 'off',
      'perfectionist/sort-modules': 'off',
      'perfectionist/sort-named-exports': 'off',
      'perfectionist/sort-object-types': 'off',
      'perfectionist/sort-objects': 'off',
      'perfectionist/sort-sets': 'off',
      'perfectionist/sort-switch-case': 'off',
      'perfectionist/sort-union-types': 'off',
      'perfectionist/sort-variable-declarations': 'off',

      'perfectionist/sort-imports': [
        'error',
        {
          internalPattern: [String.raw`^\$`],
        },
      ],
    },
  }
)
