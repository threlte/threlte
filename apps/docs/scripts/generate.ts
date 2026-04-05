import { readFileSync, statSync, readdirSync, writeFileSync, existsSync } from 'fs'
import { svelte2tsx } from 'svelte2tsx'
import { Node, Project, SourceFile, type Symbol, TypeAliasDeclaration } from 'ts-morph'
import { join, resolve, basename, dirname } from 'path'
import { fileURLToPath } from 'url'
import { ComponentParser } from 'sveld'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const PACKAGES_DIR = resolve(__dirname, '../../../packages')
const IGNORED_PACKAGES = ['core', 'gltf', 'studio', 'theatre', 'xr', 'flex', 'rapier', 'sv']
const parser = new ComponentParser()

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
  isbinding?: boolean
}

interface SnippetInfo {
  name: string
  parameters?: { name: string; type: string }[]
  description?: string
}

interface ComponentData {
  name: string
  package: string
  props?: PropInfo[]
  events?: EventInfo[]
  bindings?: BindingInfo[]
  snippets?: SnippetInfo[]
}

async function main() {
  const packages = collectPackageNames(PACKAGES_DIR, IGNORED_PACKAGES)
  console.log('Collected Packages:', packages)

  const allComponents: ComponentData[] = []

  for (const packageName of packages) {
    console.log('\nProcessing package:', packageName)

    const components = collectComponents(packageName)

    for (const componentPath of components) {
      console.log('Processing:', componentPath)
      const name = basename(componentPath, '.svelte')

      const srcData = getDataFromSources({
        name,
        path: componentPath
      })

      const data = {
        name,
        package: packageName
      }

      for (const key in srcData) {
        const element = srcData[key]
        data[key] = element
      }

      allComponents.push(data)
      break
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

function findTypesFile(componentPath: string) {
  const dir = dirname(componentPath)
  const typesPath = join(dir, 'types.ts')
  if (existsSync(typesPath)) {
    return typesPath
  }
  return undefined
}

/**
 *
 * we use both the .svelte file convertered into tsx and we look into the surrounding types.ts files
 */
function getDataFromSources(params: { name: string; path: string }) {
  const { name, path } = params

  const src = readFileSync(path, 'utf-8')

  const props: PropInfo[] = []
  const events: EventInfo[] = []
  const snippets: SnippetInfo[] = []
  const bindings: BindingInfo[] = extractBindings(src)
  const exports = [] // TODO-DefinitelyMaybe

  const svelteFileData = dataFromSvelteFile({ name, src, path })
  const typesFileData = dataFromTypesFile({ name, path })

  // canvas is a special one
  // if (name === 'Canvas') {
  //   const data = extractCanvasData(project)
  //   svelteFileData.push(data)
  // }

  // TODO-DefinitelyMaybe: merge
  let mergedData = typesFileData

  // sort props into their categories
  for (const prop of mergedData) {
    const { name } = prop
    if (name.startsWith('on')) {
      events.push({
        ...prop,
        name: name.slice(2)
      })
    } else if (name === 'children') {
      snippets.push(prop as SnippetInfo)
    } else {
      // we attached a boolean to check here
      const check = (prop as BindingInfo).isbinding ? true : false
      if (check) {
        let temp = {
          name: prop.name,
          type: prop.type
        }
        if ((prop as BindingInfo).description) {
          temp.description = (prop as BindingInfo).description
        }
        bindings.push(temp)
      } else {
        props.push(prop as PropInfo)
      }
    }
  }

  let output: {
    props?: PropInfo[]
    events?: EventInfo[]
    snippets?: SnippetInfo[]
    bindings?: BindingInfo[]
  } = {}

  if (props.length > 0) {
    output.props = props
  }
  if (events.length > 0) {
    output.events = events
  }
  if (snippets.length > 0) {
    output.snippets = snippets
  }
  if (bindings.length > 0) {
    output.bindings = bindings
  }

  return output
}

function updateTypeText(text: string) {
  const regex = /import\(.+?\)\./g
  let match
  while ((match = regex.exec(text)) !== null) {
    // console.log(match[0])
    if (match[0].includes('constants')) {
      text = text.replace(regex, 'THREE.')
    } else if (match[0].includes('packages')) {
      text = text.replace(regex, '')
    } else {
      text = text.replace(regex, '')
    }
  }
  // easy edit for quirky quotes "'
  text = text.replaceAll(/"/g, "'")
  return text
}

function findAlias(sourceFile: SourceFile, componentName: string): TypeAliasDeclaration | null {
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

function getDataFromJSDocs(prop: Symbol) {
  let description: string | undefined
  let defaultValue: string | undefined
  for (const declaration of prop.getDeclarations()) {
    if (Node.isJSDocable(declaration)) {
      const jsDocs = declaration.getJsDocs()
      for (const jsDoc of jsDocs) {
        description = jsDoc.getDescription().trim() || undefined
        // easy edit to remove \n 's
        description = description?.replaceAll(/\n+/g, '. ')
        for (const tag of jsDoc.getTags()) {
          if (tag.getTagName() === 'default') {
            const comment = tag.getComment()
            defaultValue = typeof comment === 'string' ? comment.trim() : undefined
          }
        }
        // if (tag.getTagName() === 'default') {
        //       const comment = tag.getComment()
        //       if (typeof comment === 'string' && comment.trim()) {
        //         defaultMap.set(prop.getName(), comment.trim())
        //       }
        //     }
      }
    }
  }
  return { description, defaultValue }
}

function extractCanvasData(project: Project): PropInfo[] {
  const typeAliases = project.getSourceFiles().flatMap((file) => file.getTypeAliases())
  const contextAlias = typeAliases.find((t) => t.getName() === 'CreateThrelteContextOptions')

  if (!contextAlias) {
    throw 'No CreateThrelteContextOptions type alias found'
  }

  const defaultMap = collectDefaults(typeAliases)

  const data = contextAlias
    .getType()
    .getApparentProperties()
    .filter((prop) => !['canvas', 'dom'].includes(prop.getName()))
    .map((prop) => {
      const typeText = prop.getTypeAtLocation(contextAlias).getText()
      return {
        name: prop.getName(),
        type: typeText,
        default: defaultMap[prop.getName()]
      }
    })

  // propsData.push(
  //   ...options.map((o) => ({
  //     name: o.name,
  //     type: o.type,
  //     default: o.default,
  //     description: undefined
  //   }))
  // )

  return data
}

function collectDefaults(typeAliases: Array<ReturnType<SourceFile['getTypeAliases']>[number]>) {
  const aliases = [
    'CreateRendererContextOptions',
    'CreateSchedulerContextOptions',
    'CreateDOMContextOptions'
  ]
  const defaultMap: Record<string, string> = {}

  for (const name of aliases) {
    const alias = typeAliases.find((t) => t.getName() === name)
    if (!alias) continue

    for (const prop of alias.getType().getProperties()) {
      let { description } = getDataFromJSDocs(prop)
      if (description) {
        defaultMap[prop.getName()] = description
      }
    }
  }

  return defaultMap
}

function extractBindings(svelteSource: string) {
  const bindings = []
  const bindableRegex = /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*\$bindable\(\)/g
  let match
  while ((match = bindableRegex.exec(svelteSource)) !== null) {
    const varName = match[1]
    if (varName == 'ref') continue // TODO-DefinitelyMaybe: check is this what we always want to do?
    bindings.push({
      name: varName,
      type: 'unknown', // TODO: infer from types
      description: undefined,
      isbinding: true
    })
  }
  return bindings
}

function dataFromSvelteFile(params: { name: string; src: string; path: string }) {
  const { name, path, src } = params

  const parsedComponent = parser.parseSvelteComponent(src, {
    filePath: path,
    moduleName: name
  })

  // TODO-DefinitelyMaybe: transform the parsedComponentdata into what we use for our docs

  return []
}

function dataFromTypesFile(params: { name: string; path: string }) {
  const { name, path } = params

  const typesPath = findTypesFile(path)
  if (!typesPath) return []

  const project = new Project()
  const sourceFile = project.addSourceFileAtPath(typesPath)

  const alias = findAlias(sourceFile, name)
  if (!alias) return []

  const data = alias
    .getType()
    .getApparentProperties()
    .filter((prop) => prop.getDeclarations().some((d) => d.getSourceFile() === sourceFile))
    .map((prop) => {
      const typeText = updateTypeText(prop.getTypeAtLocation(alias).getText())
      const { description, defaultValue } = getDataFromJSDocs(prop)
      return {
        name: prop.getName(),
        type: typeText,
        description,
        default: defaultValue
      }
    })

  return data
}

main().catch((e) => {
  console.error('Failure in generate script:', e)
  process.exit(1)
})
