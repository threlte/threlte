import fs from 'fs/promises'
import path from 'path'

const getSvelteVersion = async () => {
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json')
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'))
    return packageJson.dependencies?.svelte || packageJson.devDependencies?.svelte
  } catch (error) {
    console.error('Error reading package.json:', error)
    throw error
  }
}

const addNewlineToSvelteFile = async () => {
  try {
    const svelteVersion = await getSvelteVersion()

    const filePath = path.join(
      process.cwd(),
      // this may change if you use a different package manager like npm or yarn
      `node_modules/svelte/src/internal/client/index.js`
    )

    console.log('Adding a line to file path:', filePath)

    let content = await fs.readFile(filePath, 'utf8')
    const lineToAdd = "export {\n\tadd_snippet_symbol\n} from '../shared/validate.js';\n"

    if (!content.includes(lineToAdd)) {
      // append lineToAdd at the end of the content
      content += `\n${lineToAdd}`
      await fs.writeFile(filePath, content, 'utf8')
      console.log('Newline added successfully.')
    } else {
      console.log('a line already added.')
    }
  } catch (error) {
    console.error('Error in addNewlineToSvelteFile:', error)
  }
}

addNewlineToSvelteFile()
