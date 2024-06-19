#!/usr/bin/env node
import * as p from '@clack/prompts'
import { create as createSvelteKitApp } from 'create-svelte'
import { execa } from 'execa'
import { copy } from 'fs-extra'
import { Merger } from 'json-merger'
import { bold, cyan, grey, red } from 'kleur/colors'
import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { request } from 'undici'
import detectPackageManager from 'which-pm-runs'

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

  const pkgManager = detectPackageManager()?.name ?? 'npm'

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
            },
            {
              value: '@threlte/xr',
              label: '@threlte/xr',
              hint: 'Components and hooks to easily create WebXR apps with Threlte'
            },
            {
              value: '@threlte/flex',
              label: '@threlte/flex',
              hint: 'Components to integrate the flexbox layout engine Yoga in Threlte'
            },
            {
              value: 'model-pipeline',
              label: 'Model Pipeline',
              hint: 'A simple model pipeline that automatically transforms GLTF models into declarative and re-usable Threlte components using @threlte/gltf'
            }
          ]
        }),

      git: () =>
        p.confirm({
          message: 'Initialize a git repository?',
          initialValue: true
        }),

      install: () =>
        p.confirm({
          message: `Install dependencies using ${pkgManager}?`,
          initialValue: true
        })
    },
    { onCancel: () => process.exit(1) }
  )

  const resolvePackageVersion = async (packageName: string, range = 'latest') => {
    try {
      const response = await request(
        `https://cdn.jsdelivr.net/npm/${packageName}@${range}/package.json`
      )
      const packageJson = (await response.body.json()) as { version: string }
      return `^${packageJson.version}`
    } catch (error) {
      print(
        bold(red(`✘ Failed to resolve package version for ${packageName}, using ${range} instead`))
      )
      return range
    } finally {
    }
  }

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

  const spinner = p.spinner()
  spinner.start('Resolving package versions')

  const threltePackageJson = {
    devDependencies: {},
    dependencies: {
      three: await resolvePackageVersion('three', '^0.159.0'),
      '@threlte/core': await resolvePackageVersion('@threlte/core')
    },
    scripts: {}
  }

  // prettier-ignore
  {
		if (options.types === 'typescript') {
			threltePackageJson.devDependencies['@types/three'] = await resolvePackageVersion('@types/three', '^0.159.0')
		}
		if (options.threltePackages.includes('@threlte/extras') || options.threltePackages.includes('model-pipeline')) {
			threltePackageJson.dependencies['@threlte/extras'] = await resolvePackageVersion('@threlte/extras')
		}
		if (options.threltePackages.includes('@threlte/rapier')) {
			threltePackageJson.dependencies['@threlte/rapier'] = await resolvePackageVersion('@threlte/rapier')
			threltePackageJson.dependencies['@dimforge/rapier3d-compat'] = await resolvePackageVersion('@dimforge/rapier3d-compat', '^0.11.2')
		}
		if (options.threltePackages.includes('@threlte/theatre')) {
			threltePackageJson.dependencies['@threlte/theatre'] = await resolvePackageVersion('@threlte/theatre')
			threltePackageJson.dependencies['@theatre/core'] = await resolvePackageVersion('@theatre/core', '^0.7.0')
			threltePackageJson.devDependencies['@theatre/studio'] = await resolvePackageVersion('@theatre/studio', '^0.7.0')
		}
		if (options.threltePackages.includes('@threlte/xr')) {
			threltePackageJson.dependencies['@threlte/xr'] = await resolvePackageVersion('@threlte/xr')
			threltePackageJson.devDependencies['vite-plugin-mkcert'] = await resolvePackageVersion('vite-plugin-mkcert', '^1.17.1')
			threltePackageJson.scripts['dev'] = 'vite dev --host'
		}
		if (options.threltePackages.includes('@threlte/flex')) {
			threltePackageJson.dependencies['@threlte/flex'] = await resolvePackageVersion('@threlte/flex')
		}
		if (options.threltePackages.includes('model-pipeline')) {
			threltePackageJson.scripts['model-pipeline:run'] = 'node scripts/model-pipeline.js'
		}
	}

  const mergedPkg = merger.mergeObjects([svelteKitPkg, threltePackageJson])

  spinner.stop('Resolved package versions')

  fs.writeFileSync(path.join(cwd, 'package.json'), JSON.stringify(mergedPkg, null, 2))

  const templatesDir = path.join(dirname(fileURLToPath(import.meta.url)), 'templates')

  // Copy Templates
  if (options.types === 'typescript') {
    // handle typescript templates
    await copy(path.join(templatesDir, 'typescript'), cwd)
    if (options.threltePackages.includes('@threlte/extras')) {
      await copy(path.join(templatesDir, 'extras+typescript'), cwd, { overwrite: true })
    }
    if (options.threltePackages.includes('@threlte/xr')) {
      await copy(path.join(templatesDir, 'xr+typescript'), cwd, { overwrite: true })
      if (options.features.includes('vitest')) {
        await copy(path.join(templatesDir, 'xr+typescript+vitest'), cwd, { overwrite: true })
      }
    }
  } else {
    // handle javascript templates
    await copy(path.join(templatesDir, 'javascript'), cwd)
    if (options.threltePackages.includes('@threlte/extras')) {
      await copy(path.join(templatesDir, 'extras+javascript'), cwd, { overwrite: true })
    }
    if (options.threltePackages.includes('@threlte/xr')) {
      await copy(path.join(templatesDir, 'xr+javascript'), cwd, { overwrite: true })
      if (options.features.includes('vitest')) {
        await copy(path.join(templatesDir, 'xr+javascript+vitest'), cwd, { overwrite: true })
      }
    }
  }

  if (options.threltePackages.includes('model-pipeline')) {
    await copy(path.join(templatesDir, 'model-pipeline'), cwd, { overwrite: true })
    if (options.types === 'typescript') {
      await copy(path.join(templatesDir, 'model-pipeline+typescript'), cwd, { overwrite: true })
    } else {
      await copy(path.join(templatesDir, 'model-pipeline+javascript'), cwd, { overwrite: true })
    }
  }

  if (options.git) {
    // initialize git repository
    await execa('git', ['init'], { cwd, stdio: 'ignore' })
    await execa('git', ['add', '-A'], { cwd, stdio: 'ignore' })
    await execa(
      'git',
      [
        'commit',
        '-m',
        'Initial commit',
        '--author="threlte-bot <threlte-bot@users.noreply.github.com>"'
      ],
      { cwd, stdio: 'ignore' }
    )
  }

  if (options.install) {
    const spinner = p.spinner()
    try {
      // Install dependencies
      spinner.start(`Installing dependencies using ${pkgManager}`)
      await execa(pkgManager, ['install'], { cwd, stdio: 'ignore' })
      spinner.stop(`Installed dependencies using ${pkgManager}`)
    } catch (error) {
      spinner.stop(red('Failed to install dependencies'))
      p.note('You can install them manually.')
      // This will show install instructions later on
      options.install = false
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
    print(cyan('  https://threlte.xyz/docs/reference/extras/getting-started\n'))
  }
  if (options.threltePackages.includes('@threlte/rapier')) {
    print(bold('✔ @threlte/rapier'))
    print(cyan('  https://threlte.xyz/docs/reference/rapier/getting-started'))
    print(cyan('  https://rapier.rs/\n'))
  }
  if (options.threltePackages.includes('@threlte/theatre')) {
    print(bold('✔ @threlte/theatre'))
    print(cyan('  https://threlte.xyz/docs/reference/theatre/getting-started'))
    print(cyan('  https://www.theatrejs.com/\n'))
  }
  if (options.threltePackages.includes('@threlte/xr')) {
    print(bold('✔ @threlte/xr'))
    print(cyan('  https://threlte.xyz/docs/reference/xr/getting-started\n'))
  }
  if (options.threltePackages.includes('model-pipeline')) {
    print(bold('✔ Model Pipeline'))
    print(cyan(`  ${pkgManager} run model-pipeline:run`))
    print(cyan('  https://threlte.xyz/docs/reference/gltf/getting-started\n'))
  }
  if (options.git) {
    print(bold('✔ Git'))
    print(cyan('  Initialized a git repository.'))
  }

  print('\nNext steps:')
  let step = 1

  const relative = path.relative(process.cwd(), cwd)
  if (relative !== '') {
    print(`  ${step++}: ${bold(cyan(`cd ${relative}`))}`)
  }

  if (!options.install) {
    print(`  ${step++}: ${bold(cyan(`${pkgManager} install`))}`)
  }

  // prettier-ignore
  if (!options.git) print(`  ${step++}: ${bold(cyan('git init && git add -A && git commit -m "Initial commit"'))} (optional)`);

  print(`  ${step++}: ${bold(cyan(`${pkgManager} run dev -- --open`))}`)

  print(`\nTo close the dev server, hit ${bold(cyan('Ctrl-C'))}`)
  print(`\nStuck? Visit us at ${cyan('https://chat.threlte.xyz')}`)
}

create()
