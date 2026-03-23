import { input, select } from '@inquirer/prompts'
import { styleText } from 'node:util'
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { confirm } from '@inquirer/prompts'
import { execSync } from 'node:child_process'
import open from 'open'

const init = async () => {
  const directoryNames = {
    '@threlte/core': 'core',
    '@threlte/extras': 'extras',
    '@threlte/flex': 'flex',
    '@threlte/gltf': 'gltf',
    '@threlte/theatre': 'theatre',
    '@threlte/rapier': 'rapier',
    '@threlte/xr': 'xr',
    '@threlte/studio': 'studio',
    None: 'other'
  }

  const pkg = await select({
    message: 'What package is your example related to?',
    choices: [...Object.keys(directoryNames).map((name) => ({ value: name }))]
  })

  const name = await input({
    message: 'What is the name of your example? Only letters and dashes are allowed.',
    validate(value) {
      // only letters and dashes are allowed
      return /^[a-z\-]+$/.test(value)
    }
  })

  const directory = `./src/examples/${directoryNames[pkg]}/${name}`

  if (existsSync(directory)) {
    console.log(
      styleText(
        'red',
        `The directory "${directory}" already exists. Please choose another name or delete the existing example.`
      )
    )
    process.exit(1)
  }

  mkdirSync(directory, { recursive: true })

  const templateDirectory = './scripts/example-template'
  const files = readdirSync(templateDirectory)
  for (const file of files) {
    copyFileSync(`${templateDirectory}/${file}`, `${directory}/${file}`)
  }

  console.log(styleText('green', `> Example "${name}" created in "${directory}".`))

  const startDev = await confirm({
    message: 'Do you want to start the dev server and open the example in your browser?',
    default: true
  })

  if (!startDev) {
    console.log(styleText('green', `\nTo run your example, run the following command:`))
    console.log(styleText('blue', `pnpm run dev`))
    console.log(styleText('green', `Then open the following URL in your browser:`))
    console.log(
      styleText('blue', `http://localhost:4321/examples/${directoryNames[pkg]}/${name}\n`)
    )
  } else {
    console.log(styleText('green', `Starting dev server...\n`))
    open(`http://localhost:4321/examples/${directoryNames[pkg]}/${name}`)
    execSync('pnpm run dev', {
      stdio: 'inherit'
    })
  }
}

init()
