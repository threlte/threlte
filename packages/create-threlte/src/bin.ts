#!/usr/bin/env node
import { create as createSvelteKitApp } from 'create-svelte'
import { copy } from 'fs-extra'
import { Merger } from 'json-merger'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import * as p from '@clack/prompts'
import { bold, cyan, grey } from 'kleur/colors'
import fs from 'node:fs'
import path from 'node:path'

const print = console.log

const { version } = JSON.parse(
  fs.readFileSync(new URL('../package.json', import.meta.url), 'utf-8')
)

print(grey(`\ncreate-threlte version ${version}\n`))

let cwd = process.argv[2] || '.'

const create = async () => {
  p.intro('Welcome to Threlte!')

  if (cwd === '.') {
    const dir = await p.text({
      message: 'Where should we create your project?',
      placeholder: '  (hit Enter to use current directory)'
    })

    if (p.isCancel(dir)) process.exit(1)

    if (dir) {
      cwd = /** @type {string} */ dir
    }
  }

  if (fs.existsSync(cwd)) {
    if (fs.readdirSync(cwd).length > 0) {
      const force = await p.confirm({
        message: 'Directory not empty. Continue?',
        initialValue: false
      })

      // bail if `force` is `false` or the user cancelled with Ctrl-C
      if (force !== true) {
        process.exit(1)
      }
    }
  }

  const options = await p.group(
    {
      types: () =>
        p.select({
          message: 'Add type checking with TypeScript?',
          initialValue: /** @type {'checkjs' | 'typescript' | null} */ 'checkjs',
          options: [
            {
              label: 'Yes, using JavaScript with JSDoc comments',
              value: 'checkjs'
            },
            {
              label: 'Yes, using TypeScript syntax',
              value: 'typescript'
            },
            { label: 'No', value: 'null' }
          ]
        }),

      features: () =>
        p.multiselect({
          message: 'Select additional options (use arrow keys/space bar)',
          required: false,
          options: [
            {
              value: 'eslint',
              label: 'Add ESLint for code linting'
            },
            {
              value: 'prettier',
              label: 'Add Prettier for code formatting'
            },
            {
              value: 'playwright',
              label: 'Add Playwright for browser testing'
            },
            {
              value: 'vitest',
              label: 'Add Vitest for unit testing'
            }
          ]
        }),
      threltePackages: () =>
        p.multiselect({
          message: 'Select Threlte packages (use arrow keys/space bar)',
          required: false,
          options: [
            {
              value: '@threlte/extras',
              label: '@threlte/extras',
              hint: 'Components, helpers, hooks and more that extend the core functionality'
            },
            {
              value: '@threlte/rapier',
              label: '@threlte/rapier',
              hint: 'Components and hooks to use the Rapier physics engine in Threlte'
            },
            {
              value: '@threlte/theatre',
              label: '@threlte/theatre',
              hint: 'Components and hooks to use the animation library Theatre.js in Threlte'
            }
          ]
        })
    },
    { onCancel: () => process.exit(1) }
  )

  const types = (options.types === 'null' ? null : options.types) as Parameters<
    typeof createSvelteKitApp
  >[1]['types']

  await createSvelteKitApp(cwd, {
    name: path.basename(path.resolve(cwd)),
    template: 'skeleton',
    types: types,
    prettier: options.features.includes('prettier'),
    eslint: options.features.includes('eslint'),
    playwright: options.features.includes('playwright'),
    vitest: options.features.includes('vitest')
  })

  // at this point, a new SvelteKit App is initialized in the `cwd` directory

  const merger = new Merger({})

  const svelteKitPkg = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf-8'))

  const threltePackageJson = {
    devDependencies: {
      '@threlte/core': 'next'
    }
  }

  if (options.threltePackages.includes('@threlte/extras')) {
    threltePackageJson.devDependencies['@threlte/extras'] = 'next'
  }
  if (options.threltePackages.includes('@threlte/rapier')) {
    threltePackageJson.devDependencies['@threlte/rapier'] = 'next'
    threltePackageJson.devDependencies['@dimforge/rapier3d-compat'] = 'latest'
  }
  if (options.threltePackages.includes('@threlte/theatre')) {
    threltePackageJson.devDependencies['@threlte/theatre'] = 'next'
    threltePackageJson.devDependencies['@theatre/core'] = 'latest'
    threltePackageJson.devDependencies['@theatre/studio'] = 'latest'
  }

  const mergedPkg = merger.mergeObjects([svelteKitPkg, threltePackageJson])

  fs.writeFileSync(path.join(cwd, 'package.json'), JSON.stringify(mergedPkg, null, 2))

  const templatesDir = path.join(dirname(fileURLToPath(import.meta.url)), 'templates')

  if (options.types === 'typescript') {
    // handle typescript templates
    await copy(path.join(templatesDir, 'typescript'), cwd)
    if (options.threltePackages.includes('@threlte/extras')) {
      await copy(path.join(templatesDir, 'extras+typescript'), cwd, { overwrite: true })
    }
  } else {
    // handle javascript templates
    await copy(path.join(templatesDir, 'javascript'), cwd)
    if (options.threltePackages.includes('@threlte/extras')) {
      await copy(path.join(templatesDir, 'extras+javascript'), cwd, { overwrite: true })
    }
  }

  p.outro('Your project is ready!')

  if (options.types === 'typescript') {
    print(bold('✔ Typescript'))
    print('  Inside Svelte components, use <script lang="ts">\n')
  } else if (options.types === 'checkjs') {
    print(bold('✔ Type-checked JavaScript'))
    print(cyan('  https://www.typescriptlang.org/tsconfig#checkJs\n'))
  }

  if (options.features.includes('eslint')) {
    print(bold('✔ ESLint'))
    print(cyan('  https://github.com/sveltejs/eslint-plugin-svelte\n'))
  }

  if (options.features.includes('prettier')) {
    print(bold('✔ Prettier'))
    print(cyan('  https://prettier.io/docs/en/options.html'))
    print(cyan('  https://github.com/sveltejs/prettier-plugin-svelte#options\n'))
  }

  if (options.features.includes('playwright')) {
    print(bold('✔ Playwright'))
    print(cyan('  https://playwright.dev\n'))
  }

  if (options.features.includes('vitest')) {
    print(bold('✔ Vitest'))
    print(cyan('  https://vitest.dev\n'))
  }

  if (options.threltePackages.includes('@threlte/extras')) {
    print(bold('✔ @threlte/extras'))
    print(cyan('  https://next.threlte.xyz/docs/reference/extras/getting-started\n'))
  }
  if (options.threltePackages.includes('@threlte/rapier')) {
    print(bold('✔ @threlte/rapier'))
    print(cyan('  https://next.threlte.xyz/docs/reference/rapier/getting-started'))
    print(cyan('  https://rapier.rs/\n'))
  }
  if (options.threltePackages.includes('@threlte/theatre')) {
    print(bold('✔ @threlte/theatre'))
    print(cyan('  https://next.threlte.xyz/docs/reference/theatre/getting-started'))
    print(cyan('  https://www.theatrejs.com/\n'))
  }

  print('\nNext steps:')
  let step = 1

  const relative = path.relative(process.cwd(), cwd)
  if (relative !== '') {
    print(`  ${step++}: ${bold(cyan(`cd ${relative}`))}`)
  }

  print(`  ${step++}: ${bold(cyan('npm install'))} (or pnpm install, etc)`)
  // prettier-ignore
  print(`  ${step++}: ${bold(cyan('git init && git add -A && git commit -m "Initial commit"'))} (optional)`);
  print(`  ${step++}: ${bold(cyan('npm run dev -- --open'))}`)

  print(`\nTo close the dev server, hit ${bold(cyan('Ctrl-C'))}`)
  print(`\nStuck? Visit us at ${cyan('https://chat.threlte.xyz')}`)
}

create()
