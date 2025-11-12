import { input, select, confirm } from '@inquirer/prompts'
import { styleText } from 'node:util'
import launch from 'launch-editor'
import { mkdirSync, readdirSync, writeFileSync, copyFileSync, existsSync } from 'node:fs'
import Slugger from 'github-slugger'
import open from 'open'
import { execSync } from 'node:child_process'

const slugger = new Slugger()

const init = async () => {
  // collect existing categories by directory names
  const categories = readdirSync('./src/content/examples').filter((f) => {
    // ignore files
    return !f.includes('.')
  })

  let category = await select({
    message: 'In what category would you like to create a new example page?',
    choices: [
      ...categories.map((name) => ({ value: name })),
      {
        value: 'New category'
      }
    ]
  })

  if (category === 'New category') {
    category = await input({
      message: 'Please enter a name for the new category.'
    })
  }

  const title = await input({
    message: 'Please enter the title of your example.'
  })

  const templateDirectory = './scripts/example-template'

  // we're using the same slugging lib that astro uses in order to ensure that
  // the slug is the same format as the one that astro generates.
  const exampleCategorySlug = slugger.slug(category)
  const exampleTitleSlug = slugger.slug(title)

  const exampleDirectory = `./src/examples/${exampleCategorySlug}/${exampleTitleSlug}`

  mkdirSync(exampleDirectory, { recursive: true })

  const files = readdirSync(templateDirectory)
  for (const file of files) {
    const targetFilePath = `${exampleDirectory}/${file}`
    if (existsSync(targetFilePath)) {
      console.log(styleText('red', `> File already exists: ${targetFilePath}, exiting ...`))
      process.exit(1)
    }
    copyFileSync(`${templateDirectory}/${file}`, targetFilePath)
  }

  const examplePageDirectory = `./src/content/examples/${category}`

  mkdirSync(examplePageDirectory, { recursive: true })

  const examplePageTargetFilePath = `${examplePageDirectory}/${title}.mdx`
  if (existsSync(examplePageTargetFilePath)) {
    console.log(
      styleText('red', `> File already exists: ${examplePageTargetFilePath}, exiting ...`)
    )
    process.exit(1)
  }

  writeFileSync(
    examplePageTargetFilePath,
    `<Example path="${exampleCategorySlug}/${exampleTitleSlug}" iframe />`
  )

  // try to launch the editor with the new file
  try {
    launch(`${examplePageDirectory}/${title}.mdx`, undefined, (_: any, errorMessage: string) => {
      if (errorMessage) {
        throw new Error()
      }
    })
  } catch (error) {
    console.log(
      styleText(
        'red',
        `> Editor could not be launched. Open the file manually: ${examplePageDirectory}/${title}.mdx`
      )
    )
  }

  const startDev = await confirm({
    message: 'Do you want to start the dev server and open the example page in your browser?',
    default: true
  })

  const examplePageDevUrl = `http://localhost:4321/docs/examples/${exampleCategorySlug}/${exampleTitleSlug}`

  if (!startDev) {
    console.log(styleText('green', `\nTo visit the example page, run the following command:`))
    console.log(styleText('blue', `pnpm run dev`))
    console.log(styleText('green', `Then open the following URL in your browser:`))
    console.log(styleText('blue', `${examplePageDevUrl}\n`))
  } else {
    console.log(styleText('green', `Starting dev server...\n`))
    open(examplePageDevUrl)
    execSync('pnpm run dev', {
      stdio: 'inherit'
    })
  }
}

init()
