import { readFileSync, statSync, readdirSync, writeFileSync, existsSync } from 'fs'
import { svelte2tsx } from 'svelte2tsx'
import { Project, SourceFile, TypeAliasDeclaration } from 'ts-morph'
import { join, resolve, basename, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const PACKAGES_DIR = resolve(__dirname, '../../../packages')
const IGNORED_PACKAGES = ['gltf', 'extras', 'studio', 'theatre', 'xr', 'flex', 'rapier']

interface PropInfo {
  name: string
  type: string
  default?: string
  description?: string
}

interface EventInfo {
  name: string
  type: string
  description?: string
}

interface BindingInfo {
  name: string
  type: string
  description?: string
}

interface SnippetInfo {
  name: string
  parameters?: { name: string; type: string }[]
  description?: string
}

interface ComponentData {
  name: string
  package: string
  props: PropInfo[]
  events: EventInfo[]
  bindings: BindingInfo[]
  snippets: SnippetInfo[]
}

interface OptionInfo {
  name: string
  type: string
  default?: string
}

async function main() {
  const packages = collectPackageNames(PACKAGES_DIR, IGNORED_PACKAGES)
  console.log('Collected Packages:', packages)

  const allComponents: ComponentData[] = []

  for (const packageName of packages) {
    console.log('\nProcessing package:', packageName)

    const project = createProject(packageName)
    const components = collectComponents(packageName)

    for (const componentPath of components) {
      console.log('Processing:', componentPath)
      const data = extractComponentData(packageName, componentPath, project)
      allComponents.push(data)
    }
  }

  writeFileSync(resolve(__dirname, 'component-data.json'), JSON.stringify(allComponents, null, 2))
  console.log('\nComponent data written to component-data.json')
}

function collectPackageNames(packagesDir: string, ignored: string[]): string[] {
  return readdirSync(packagesDir).filter((item) => {
    const folderPath = join(packagesDir, item)
    return statSync(folderPath).isDirectory() && !ignored.includes(item)
  })
}

function collectComponents(packageName: string): string[] {
  const srcIndex = resolve(PACKAGES_DIR, packageName, 'src', 'lib', 'index.ts')

  const content = readFileSync(srcIndex, 'utf-8')
  const regex = /export.*from\s+['"]([^'"]*\.svelte)['"]/g
  const filepaths = []

  let match
  while ((match = regex.exec(content)) !== null) {
    const relativePath = match[1]
    const fullPath = resolve(__dirname, `../../../packages/${packageName}/src/lib`, relativePath)
    filepaths.push(fullPath)
  }

  // core is weird too? lets add T for funzies
  if (packageName === 'core') {
    // hardcoded because we can
    const fullPath = resolve(__dirname, `../../../packages/core/src/lib/components/T/T.svelte`)
    filepaths.push(fullPath)
  }
  return filepaths
}

function createProject(packageName: string): Project {
  const project = new Project()
  const srcLibDir = resolve(PACKAGES_DIR, packageName, 'src', 'lib')

  for (const file of getAllTsFiles(srcLibDir)) {
    project.addSourceFileAtPath(file)
  }

  return project
}

function getAllTsFiles(dir: string): string[] {
  const filePaths: string[] = []

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)

    if (statSync(fullPath).isDirectory()) {
      filePaths.push(...getAllTsFiles(fullPath))
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.js')) {
      filePaths.push(fullPath)
    }
  }

  return filePaths
}

function extractComponentData(
  packageName: string,
  componentPath: string,
  project: Project
): ComponentData {
  const name = basename(componentPath, '.svelte')
  const typesPath = findTypesFile(componentPath)
  const svelteSource = readFileSync(componentPath, 'utf-8')

  // Convert to TSX for props
  const { code } = svelte2tsx(svelteSource, { filename: componentPath, mode: 'ts' })
  const tsxPath = join('./', `${name}.tsx`)
  const tsxSourceFile = project.createSourceFile(tsxPath, code, { overwrite: true })

  const props = extractPropsFromTsx(tsxSourceFile, svelteSource, project, typesPath, name)
  const events = extractEvents(project, typesPath, name)
  const bindings = extractBindings(svelteSource)
  const snippets = extractSnippets(project, typesPath, name)

  return {
    name,
    package: packageName,
    props,
    events,
    bindings,
    snippets
  }
}

function findTypesFile(componentPath: string): string | null {
  const dir = dirname(componentPath)
  const typesPath = join(dir, 'types.ts')
  if (existsSync(typesPath)) {
    return typesPath
  }
  // maybe in parent
  const parentDir = dirname(dir)
  const parentTypes = join(parentDir, 'types.ts')
  if (existsSync(parentTypes)) {
    return parentTypes
  }
  return null
}

function extractPropsFromTsx(
  tsxSourceFile: SourceFile,
  svelteSource: string,
  project: Project,
  typesPath: string | null,
  componentName: string
): PropInfo[] {
  let propsTypeAlias = tsxSourceFile.getTypeAlias('Props')
  let sourceFile = tsxSourceFile
  if (!propsTypeAlias && typesPath) {
    // fallback to types.ts
    const typesSourceFile = project.getSourceFile(typesPath)
    if (typesSourceFile) {
      const alias = findPropsTypeAlias(typesSourceFile, componentName)
      if (alias) {
        propsTypeAlias = alias
        sourceFile = typesSourceFile
      }
    }
  }
  if (!propsTypeAlias) return []

  const type = propsTypeAlias.getType()
  const properties = type.getApparentProperties()

  const props: PropInfo[] = []
  for (const prop of properties) {
    const name = prop.getName()
    if (name.startsWith('on') || name === 'children') continue // skip events and snippets

    const propType = prop.getTypeAtLocation(sourceFile)
    let typeText = propType.getText()

    let defaultValue: string | undefined
    let description: string | undefined

    // from JSDoc if in types
    if (sourceFile !== tsxSourceFile) {
      for (const declaration of prop.getDeclarations()) {
        if ('getJsDocs' in declaration) {
          const jsDocs = declaration.getJsDocs()
          for (const jsDoc of jsDocs) {
            description = jsDoc.getDescription().trim() || undefined
            for (const tag of jsDoc.getTags()) {
              if (tag.getTagName() === 'default') {
                const comment = tag.getComment()
                defaultValue = typeof comment === 'string' ? comment.trim() : undefined
              }
            }
          }
        }
      }
    }

    // check destructuring in svelteSource
    if (!defaultValue) {
      const destructRegex = new RegExp(`let\\s*\\{\\s*[^}]*${name}\\s*=\\s*([^,}]+)`, 'g')
      const match = destructRegex.exec(svelteSource)
      if (match) {
        defaultValue = match[1].trim()
      }
    }

    props.push({
      name,
      type: typeText,
      default: defaultValue,
      description
    })
  }

  // canvas is a weird one
  if (componentName === 'Canvas') {
    const options = extractThrelteOptions(project)
    props.push(
      ...options.map((o) => ({
        name: o.name,
        type: o.type,
        default: o.default,
        description: undefined
      }))
    )
  }

  // now update typeText as we need to repalce imports
  for (let i = 0; i < props.length; i++) {
    props[i].type = updateTypeText(props[i].type)
  }

  return props
}

function updateTypeText(text: string) {
  const regex = /import\(.+?\)\./g
  let match
  while ((match = regex.exec(text)) !== null) {
    console.log(match[0])
    if (match[0].includes('constants')) {
      text = text.replace(regex, 'THREE.')
    } else if (match[0].includes('packages')) {
      text = text.replace(regex, '')
    } else {
      text = text.replace(regex, '')
    }
  }
  return text
}

function findPropsTypeAlias(
  sourceFile: SourceFile,
  componentName: string
): TypeAliasDeclaration | null {
  // try componentName + 'Props'
  let alias = sourceFile.getTypeAlias(componentName + 'Props')
  if (alias) return alias
  // try 'Props'
  alias = sourceFile.getTypeAlias('Props')
  if (alias) return alias
  // try other with 'Props'
  const aliases = sourceFile.getTypeAliases()
  for (const a of aliases) {
    if (a.getName().includes('Props')) return a
  }
  return null
}

function extractThrelteOptions(project: Project): OptionInfo[] {
  const typeAliases = project.getSourceFiles().flatMap((file) => file.getTypeAliases())
  const contextAlias = typeAliases.find((t) => t.getName() === 'CreateThrelteContextOptions')

  if (!contextAlias) {
    throw 'No CreateThrelteContextOptions type alias found'
  }

  const defaultMap = collectDefaults(project, typeAliases)
  collectRuntimeDefaults(defaultMap)

  const options = contextAlias
    .getType()
    .getApparentProperties()
    .filter((prop) => !['canvas', 'dom'].includes(prop.getName()))
    .map((prop) => {
      const typeText = prop.getTypeAtLocation(contextAlias).getText()
      return {
        name: prop.getName(),
        type: typeText,
        default: defaultMap.get(prop.getName())
      }
    })

  return options
}

function collectDefaults(
  project: Project,
  typeAliases: Array<ReturnType<SourceFile['getTypeAliases']>[number]>
): Map<string, string> {
  const aliases = [
    'CreateRendererContextOptions',
    'CreateSchedulerContextOptions',
    'CreateDOMContextOptions'
  ]
  const defaultMap = new Map<string, string>()

  for (const name of aliases) {
    const alias = typeAliases.find((t) => t.getName() === name)
    if (!alias) continue

    for (const prop of alias.getType().getProperties()) {
      for (const declaration of prop.getDeclarations()) {
        for (const jsDoc of declaration.getJsDocs()) {
          for (const tag of jsDoc.getTags()) {
            if (tag.getTagName() === 'default') {
              const comment = tag.getComment()
              if (typeof comment === 'string' && comment.trim()) {
                defaultMap.set(prop.getName(), comment.trim())
              }
            }
          }
        }
      }
    }
  }

  return defaultMap
}

function collectRuntimeDefaults(defaultMap: Map<string, string>): void {
  const schedulerFile = resolve(
    PACKAGES_DIR,
    'core',
    'src',
    'lib',
    'context',
    'fragments',
    'scheduler.svelte.ts'
  )
  const rendererFile = resolve(
    PACKAGES_DIR,
    'core',
    'src',
    'lib',
    'context',
    'fragments',
    'renderer.svelte.ts'
  )

  const schedulerText = readFileSync(schedulerFile, 'utf-8')
  const rendererText = readFileSync(rendererFile, 'utf-8')

  addDefaultFromRegex(
    defaultMap,
    schedulerText,
    /autoRender\s*:\s*currentWritable\(options\.autoRender\s*\?\?\s*([^\)]+)\)/,
    'autoRender'
  )
  addDefaultFromRegex(
    defaultMap,
    schedulerText,
    /renderMode\s*:\s*currentWritable\(options\.renderMode\s*\?\?\s*([^\)]+)\)/,
    'renderMode'
  )
  addDefaultFromRegex(
    defaultMap,
    rendererText,
    /colorManagementEnabled\s*:\s*currentWritable\(options\.colorManagementEnabled\s*\?\?\s*([^\)]+)\)/,
    'colorManagementEnabled'
  )
  addDefaultFromRegex(
    defaultMap,
    rendererText,
    /colorSpace\s*:\s*currentWritable\(options\.colorSpace\s*\?\?\s*([^\)]+)\)/,
    'colorSpace'
  )
  addDefaultFromRegex(
    defaultMap,
    rendererText,
    /toneMapping\s*:\s*currentWritable\(options\.toneMapping\s*\?\?\s*([^\)]+)\)/,
    'toneMapping'
  )
  addDefaultFromRegex(
    defaultMap,
    rendererText,
    /shadows\s*:\s*currentWritable\(options\.shadows\s*\?\?\s*([^\)]+)\)/,
    'shadows'
  )
  addDefaultFromRegex(
    defaultMap,
    rendererText,
    /dpr\s*:\s*currentWritable\(options\.dpr\s*\?\?\s*([^\)]+)\)/,
    'dpr'
  )
}

function addDefaultFromRegex(
  map: Map<string, string>,
  fileText: string,
  regex: RegExp,
  key: string
) {
  const match = fileText.match(regex)
  if (match) {
    map.set(key, match[1].trim())
  }
}

function extractEvents(
  project: Project,
  typesPath: string | null,
  componentName: string
): EventInfo[] {
  if (!typesPath) return []

  const sourceFile = project.getSourceFile(typesPath)
  if (!sourceFile) return []

  const propsAlias = findPropsTypeAlias(sourceFile, componentName)
  if (!propsAlias) return []

  const type = propsAlias.getType()
  const properties = type.getApparentProperties()

  const events: EventInfo[] = []
  for (const prop of properties) {
    const name = prop.getName()
    if (!name.startsWith('on')) continue

    const eventName = name.slice(2)
    const propType = prop.getTypeAtLocation(sourceFile)
    const typeText = propType.getText()

    let description: string | undefined
    for (const declaration of prop.getDeclarations()) {
      const jsDocs = declaration.getJsDocs()
      for (const jsDoc of jsDocs) {
        description = jsDoc.getDescription().trim() || undefined
      }
    }

    events.push({
      name: eventName,
      type: typeText,
      description
    })
  }

  // now update typeText as we need to repalce imports
  for (let i = 0; i < events.length; i++) {
    events[i].type = updateTypeText(events[i].type)
  }

  return events
}

function extractBindings(svelteSource: string): BindingInfo[] {
  const bindings: BindingInfo[] = []
  const bindableRegex = /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*\$bindable\(\)/g
  let match
  while ((match = bindableRegex.exec(svelteSource)) !== null) {
    const varName = match[1]
    bindings.push({
      name: varName,
      type: 'unknown', // TODO: infer from types
      description: undefined
    })
  }
  return bindings
}

function extractSnippets(
  project: Project,
  typesPath: string | null,
  componentName: string
): SnippetInfo[] {
  if (!typesPath) return []

  const sourceFile = project.getSourceFile(typesPath)
  if (!sourceFile) return []

  const propsAlias = findPropsTypeAlias(sourceFile, componentName)
  if (!propsAlias) return []

  const type = propsAlias.getType()
  const properties = type.getApparentProperties()

  const snippets: SnippetInfo[] = []
  for (const prop of properties) {
    const name = prop.getName()
    if (name !== 'children') continue // only children for now

    const propType = prop.getTypeAtLocation(sourceFile)
    const typeText = propType.getText()

    if (typeText.includes('Snippet<')) {
      const paramMatch = typeText.match(/Snippet<\[([^\]]+)\]>/)
      let parameters: { name: string; type: string }[] | undefined
      if (paramMatch) {
        const paramsStr = paramMatch[1]
        parameters = paramsStr.split(',').map((p) => {
          const parts = p.split(':').map((s) => s.trim())
          return { name: parts[0], type: parts[1] || 'unknown' }
        })
      }

      let description: string | undefined
      for (const declaration of prop.getDeclarations()) {
        const jsDocs = declaration.getJsDocs()
        for (const jsDoc of jsDocs) {
          description = jsDoc.getDescription().trim() || undefined
        }
      }

      snippets.push({
        name,
        parameters,
        description
      })
    }
  }

  return snippets
}

main().catch((e) => {
  console.error('Failure in generate script:', e)
  process.exit(1)
})
