import { readFileSync, stat } from 'fs'
import { svelte2tsx } from 'svelte2tsx'
import { Project } from 'ts-morph'
import { readdirSync, statSync } from 'fs'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const output: Record<string, any> = {}

const packagesDir = resolve(__dirname, '../../../packages')
const folders = readdirSync(packagesDir).filter((item) => {
  const stats = statSync(join(packagesDir, item))
  // filter folders here
  return stats.isDirectory() && item !== 'gltf'
})

console.log(folders)
for (let i = 0; i < folders.length; i++) {
  output[folders[i]] = {}
}
console.log(output)

for (let i = 0; i < folders.length; i++) {
  const packageName = folders[i]
  const project = createProject(packageName)
  if (packageName === 'core') {
  } else {
  }
}

function createProject(name: string) {
  const project = new Project()

  // Add all .ts and .js files from a directory
  const getAllTsFiles = (dir: string): string[] => {
    const files: string[] = []
    const items = readdirSync(dir)
    for (const item of items) {
      const fullPath = join(dir, item)
      if (statSync(fullPath).isDirectory()) {
        files.push(...getAllTsFiles(fullPath))
      } else if (item.endsWith('.ts') || item.endsWith('.js')) {
        files.push(fullPath)
      }
    }
    return files
  }

  const srcLibDir = resolve(__dirname, `../../../packages/${name}/src/lib`)
  const tsFiles = getAllTsFiles(srcLibDir)

  // Add them to the project
  for (const file of tsFiles) {
    project.addSourceFileAtPath(file)
  }

  return project
}

function collectSveltePathsFromIndex(name: string) {
  // we only care about the files ending in .svelte not .svelte.ts or otherwise
  const filepaths = []
  const srcIndex = resolve(__dirname, `../../../packages/${name}/src/lib/index.ts`)
}

function processPackage() {
  const project = createProject('core')

  // we only care about the files ending in .svelte not .svelte.ts or otherwise
  const filepath = '../../../packages/core/src/lib/Canvas.svelte'

  const source = readFileSync(filepath, 'utf-8')

  const { code } = svelte2tsx(source, {
    filename: 'Canvas.svelte',
    mode: 'ts'
  })

  const sourceFile = project.createSourceFile('./canvas-temp.tsx', code)

  // Now, extract props
  const propsTypeAlias = sourceFile.getTypeAlias('Props')
  if (propsTypeAlias) {
    const type = propsTypeAlias.getType()
    const properties = type.getApparentProperties()
    console.log('Props:')
    for (const prop of properties) {
      const name = prop.getName()
      const propType = prop.getTypeAtLocation(sourceFile)
      const typeText = propType.getText()
      console.log({ name, type: typeText })
    }
  } else {
    console.log('Props type alias not found')
  }
  // Try to get from the type alias in project
  const typeAliases = project.getSourceFiles().flatMap((f) => f.getTypeAliases())
  const createThrelteOptionsAlias = typeAliases.find(
    (t) => t.getName() === 'CreateThrelteContextOptions'
  )
  if (createThrelteOptionsAlias) {
    const typeNode = createThrelteOptionsAlias.getTypeNode()
    if (typeNode) {
      const type = project.getTypeChecker().getTypeAtLocation(typeNode)
      const properties = type.getApparentProperties()
      console.log('CreateThrelteContextOptions properties:')
      for (const prop of properties) {
        const name = prop.getName()
        const propType = prop.getTypeAtLocation(typeNode)
        const typeText = propType
          .getText()
          .replace(/import\(.+@types\/three\/src\/constants"\)\./, 'THREE.')
        console.log({ name, type: typeText })
      }
    }
  }

  const defaultMap = new Map<string, string>()
  const collectDefaults = (aliasName: string) => {
    const alias = typeAliases.find((t) => t.getName() === aliasName)
    if (!alias) return

    const type = alias.getType()
    for (const symbol of type.getProperties()) {
      const declarations = symbol.getDeclarations()
      if (!declarations || declarations.length === 0) continue

      for (const declaration of declarations) {
        const jsDocs = declaration.getJsDocs()
        for (const jsDoc of jsDocs) {
          for (const tag of jsDoc.getTags()) {
            if (tag.getTagName() === 'default') {
              const comment = tag.getComment().trim() || ''
              if (comment) {
                defaultMap.set(symbol.getName(), comment)
              }
            }
          }
        }
      }
    }
  }

  collectDefaults('CreateRendererContextOptions')
  collectDefaults('CreateSchedulerContextOptions')
  collectDefaults('CreateDOMContextOptions')

  // Grab runtime fallback defaults from implementation code
  const collectRuntimeDefaults = () => {
    const schedulerFilePath = resolve(
      __dirname,
      '../../../packages/core/src/lib/context/fragments/scheduler.svelte.ts'
    )
    const rendererFilePath = resolve(
      __dirname,
      '../../../packages/core/src/lib/context/fragments/renderer.svelte.ts'
    )

    const schedulerText = readFileSync(schedulerFilePath, 'utf-8')
    const regexAutoRender =
      /autoRender\s*:\s*currentWritable\(options\.autoRender\s*\?\?\s*([^\)]+)\)/
    const regexRenderMode =
      /renderMode\s*:\s*currentWritable\(options\.renderMode\s*\?\?\s*([^\)]+)\)/

    const autoRenderMatch = schedulerText.match(regexAutoRender)
    if (autoRenderMatch) {
      defaultMap.set('autoRender', autoRenderMatch[1].trim())
    }

    const renderModeMatch = schedulerText.match(regexRenderMode)
    if (renderModeMatch) {
      defaultMap.set('renderMode', renderModeMatch[1].trim())
    }

    const rendererText = readFileSync(rendererFilePath, 'utf-8')
    const regexColorManagement =
      /colorManagementEnabled\s*:\s*currentWritable\(options\.colorManagementEnabled\s*\?\?\s*([^\)]+)\)/
    const regexColorSpace =
      /colorSpace\s*:\s*currentWritable\(options\.colorSpace\s*\?\?\s*([^\)]+)\)/
    const regexToneMapping =
      /toneMapping\s*:\s*currentWritable\(options\.toneMapping\s*\?\?\s*([^\)]+)\)/
    const regexShadows = /shadows\s*:\s*currentWritable\(options\.shadows\s*\?\?\s*([^\)]+)\)/
    const regexDpr = /dpr\s*:\s*currentWritable\(options\.dpr\s*\?\?\s*([^\)]+)\)/

    const mCm = rendererText.match(regexColorManagement)
    if (mCm) defaultMap.set('colorManagementEnabled', mCm[1].trim())
    const mCs = rendererText.match(regexColorSpace)
    if (mCs) defaultMap.set('colorSpace', mCs[1].trim())
    const mTm = rendererText.match(regexToneMapping)
    if (mTm) defaultMap.set('toneMapping', mTm[1].trim())
    const mSh = rendererText.match(regexShadows)
    if (mSh) defaultMap.set('shadows', mSh[1].trim())
    const mDpr = rendererText.match(regexDpr)
    if (mDpr) defaultMap.set('dpr', mDpr[1].trim())
  }

  collectRuntimeDefaults()

  if (createThrelteOptionsAlias) {
    const type = createThrelteOptionsAlias.getType()
    const properties = type.getApparentProperties()

    const resultProps = properties
      .filter((p) => !['canvas', 'dom'].includes(p.getName()))
      .map((p) => {
        const name = p.getName()
        const propType = p.getTypeAtLocation(sourceFile)
        const typeText = propType
          .getText()
          .replace(/import\(.+@types\/three\/src\/constants"\)\./, 'THREE.')

        const defaultValue = defaultMap.get(name)

        return {
          name,
          type: typeText,
          default: defaultValue
        }
      })

    resultProps.push({
      name: 'children',
      type: 'import("svelte").Snippet<[]>',
      default: undefined
    })

    console.log('Final props with defaults:')
    console.log(JSON.stringify(resultProps, null, 2))
  } else {
    console.log('CreateThrelteContextOptions not found for defaults extraction')
  }
}
