import { readFileSync, statSync, readdirSync, writeFileSync, existsSync } from 'fs'
import { Node, Project, SourceFile, type Symbol, TypeAliasDeclaration } from 'ts-morph'
import { join, resolve, basename, dirname } from 'path'
import { fileURLToPath } from 'url'
import { ComponentParser } from 'sveld'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const PACKAGES_DIR = resolve(__dirname, '../../../packages')
const IGNORED_PACKAGES = ['extras', 'gltf', 'studio', 'theatre', 'xr', 'flex', 'rapier', 'sv']
const CANVAS_PATHS = [
  '/core/src/lib/context/createThrelteContext.svelte.ts',
  '/core/src/lib/context/fragments/renderer.svelte.ts',
  '/core/src/lib/context/fragments/scheduler.svelte.ts',
  '/core/src/lib/context/fragments/dom.ts'
]
const sveldParser = new ComponentParser()

interface PropInfo {
  name: string
  type?: string
  required?: boolean
  default?: string
  description?: string
}

interface EventInfo {
  name: string
  payload?: string
  description?: string
}

interface ExportInfo {
  name: string
  type?: string
  description?: string
}

interface ComponentData {
  name: string
  package: string
  props?: PropInfo[]
  events?: EventInfo[]
  exports?: ExportInfo[]
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

/**
 * Only looks for the `.svelte` exports within the top level `index.ts` file of a package
 */
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

  if (packageName === 'core') {
    return [resolve(__dirname, `../../../packages/core/src/lib/Canvas.svelte`)]
  }

  return filepaths
}

/**
 * looks for a `types.ts` file within the same directory as the given svelte component path
 */
function findTypesFile(componentPath: string) {
  const dir = dirname(componentPath)
  const typesPath = join(dir, 'types.ts')
  if (existsSync(typesPath)) {
    return typesPath
  }
  return undefined
}

function getDataFromSources(params: { name: string; path: string }) {
  const { name, path } = params

  const svelteFileData = dataFromSvelteFile({ name, path })
  let typesFileData = dataFromTypesFile({ name, path })

  // canvas is a special case
  if (name === 'Canvas') {
    return getCanvasData()
  }

  // console.log(svelteFileData)
  // console.log('-------------------------')
  // console.log(typesFileData)

  return mergeData(svelteFileData, typesFileData)
}

function updateTypeText(text: string) {
  const regex = /import\(.+?\)\./g
  let match
  while ((match = regex.exec(text)) !== null) {
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
        if (prop.getName() === 'colorManagementEnabled') {
          writeFileSync(
            resolve(__dirname, 'description.json'),
            JSON.stringify({ description }, null, 2)
          )
        }
        // easy edit to remove \n 's
        description = description?.replaceAll(/(\r\n)+/g, ' ')
        description = description?.replaceAll(/\n+/g, '. ')
        for (const tag of jsDoc.getTags()) {
          if (tag.getTagName() === 'default') {
            const comment = tag.getComment()
            defaultValue = typeof comment === 'string' ? comment.trim() : undefined
          }
        }
      }
    }
  }
  return { description, defaultValue }
}

function dataFromSvelteFile(params: { name: string; path: string }) {
  const { name, path } = params

  const src = readFileSync(path, 'utf-8')

  const parsedComponent = sveldParser.parseSvelteComponent(src, {
    filePath: path,
    moduleName: name
  })

  const exports: ExportInfo[] = parsedComponent.props
    .filter((value) => value.constant) // TODO-DefinitelyMaybe: check the assumption here
    .map((value) => {
      return {
        name: value.name,
        type: value.type,
        description: value.description
      } as ExportInfo
    })

  const ignoredProps = ['ref', 'is']
  const ignoredExports = exports.map((value) => value.name)

  const props: PropInfo[] = parsedComponent.props
    .filter((value) => {
      return (
        !ignoredProps.includes(value.name) &&
        !ignoredExports.includes(value.name) &&
        !value.name.startsWith('on')
      )
    })
    .map((value) => {
      let data: PropInfo = {
        name: value.name
      }
      if (value.type) {
        data.type = value.type
      }
      if (value.description) {
        data.description = value.description
      }
      if (value.value && value.value != 'undefined') {
        data.default = value.value
      }
      return data
    })

  const events: EventInfo[] = parsedComponent.props
    .filter((value) => {
      return value.name.startsWith('on')
    })
    .map((value) => {
      let data: EventInfo = {
        name: value.name.slice(2)
      }
      if (value.type) {
        data.payload = value.type
      }
      if (value.description) {
        data.description = value.description
      }
      return data
    })

  return {
    props,
    events,
    exports
  }
}

function dataFromTypesFile(params: { name: string; path: string }) {
  const { name, path } = params

  const typesPath = findTypesFile(path)
  if (!typesPath) return { props: [], events: [] }

  const project = new Project()
  const sourceFile = project.addSourceFileAtPath(typesPath)

  const alias = findAlias(sourceFile, name)
  if (!alias) return { props: [], events: [] }

  const data = alias
    .getType()
    .getApparentProperties()
    .filter((prop) => prop.getDeclarations().some((d) => d.getSourceFile() === sourceFile))
    .map((prop) => {
      const typeText = updateTypeText(prop.getTypeAtLocation(alias).getText())
      const { description, defaultValue } = getDataFromJSDocs(prop)
      let temp: PropInfo = {
        name: prop.getName(),
        type: typeText
      }
      if (description) {
        temp.description = description
      }
      if (defaultValue) {
        temp.default = defaultValue
      }
      if (!prop.isOptional()) {
        temp.required = true
      }
      return temp
    })

  const props: PropInfo[] = []
  const events: EventInfo[] = []

  // sort props into their categories
  for (const prop of data) {
    const { name } = prop
    if (name.startsWith('on')) {
      events.push({
        ...prop,
        name: name.slice(2)
      } as EventInfo)
    } else {
      props.push(prop as PropInfo)
    }
  }
  return { props, events }
}

function mergeData(
  svelteDataSource: { props: PropInfo[]; events: EventInfo[]; exports: ExportInfo[] },
  typesDataSource: { props: PropInfo[]; events: EventInfo[] }
) {
  const finalProps: PropInfo[] = []
  const finalEvents: EventInfo[] = []
  const finalExports: ExportInfo[] =
    svelteDataSource.exports.length > 0 ? svelteDataSource.exports : []

  for (const prop of svelteDataSource.props) {
    const { name } = prop

    const typeV = typesDataSource.props.find((value) => value.name == name)
    if (typeV) {
      finalProps.push({ ...prop, ...typeV })
    } else {
      finalProps.push(prop)
    }
  }
  for (const prop of svelteDataSource.events) {
    const { name } = prop

    const typeV = typesDataSource.events.find((value) => value.name == name)
    if (typeV) {
      finalEvents.push({ ...prop, ...typeV })
    } else {
      finalEvents.push(prop)
    }
  }

  let merged: {
    props?: PropInfo[]
    events?: EventInfo[]
    exports?: ExportInfo[]
  } = {}

  if (finalProps.length > 0) {
    merged.props = finalProps
  }
  if (finalEvents.length > 0) {
    merged.events = finalEvents
  }
  if (finalExports.length > 0) {
    merged.exports = finalExports
  }
  return merged
}

function getCanvasData() {
  const project = new Project()
  for (const path of CANVAS_PATHS) {
    project.addSourceFileAtPath(join(PACKAGES_DIR, path))
  }

  const typeAliases = project.getSourceFiles().flatMap((file) => file.getTypeAliases())
  const contextAlias = typeAliases.find((t) => t.getName() === 'CreateThrelteContextOptions')

  if (!contextAlias) {
    throw 'No CreateThrelteContextOptions type alias found'
  }

  const data = contextAlias
    .getType()
    .getApparentProperties()
    .filter((prop) => !['canvas', 'dom'].includes(prop.getName()))
    .map((prop) => {
      const typeText = prop.getTypeAtLocation(contextAlias).getText()
      const { description, defaultValue } = getDataFromJSDocs(prop)
      let temp: PropInfo = {
        name: prop.getName(),
        type: updateTypeText(typeText)
      }
      if (description) {
        temp.description = description
      }
      if (defaultValue) {
        temp.default = defaultValue
      }
      // hardcoded solution to make it easy on ourselves
      if (prop.getName() === 'createRenderer') {
        temp.type = '(canvas: HTMLCanvasElement) => THREE.Renderer'
      }
      return temp
    })

  return { props: data }
}

main().catch((e) => {
  console.error('Failure in generate script:', e)
  process.exit(1)
})
