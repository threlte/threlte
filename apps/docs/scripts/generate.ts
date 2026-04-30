import { readFileSync, statSync, readdirSync, writeFileSync, existsSync } from 'fs'
import {
  createProgram,
  ScriptTarget,
  ModuleKind,
  ModuleResolutionKind,
  getJSDocCommentsAndTags,
  forEachChild,
  isTypeAliasDeclaration,
  isInterfaceDeclaration,
  isTypeLiteralNode,
  isPropertySignature,
  isIntersectionTypeNode,
  isUnionTypeNode,
  isParenthesizedTypeNode,
  sys,
  parseJsonConfigFileContent,
  type Program,
  type TypeChecker,
  type Symbol,
  type CompilerOptions,
  type PropertySignature,
  type TypeNode,
  type TypeAliasDeclaration,
  type InterfaceDeclaration
} from 'typescript'
import { join, resolve, basename, dirname } from 'path'
import { fileURLToPath } from 'url'
import { ComponentParser } from 'sveld'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const PACKAGES_DIR = resolve(__dirname, '../../../packages')
const IGNORED_PACKAGES = ['gltf', 'sv']
const CANVAS_PATHS = [
  '/core/src/lib/context/createThrelteContext.svelte.ts',
  '/core/src/lib/context/fragments/renderer.svelte.ts',
  '/core/src/lib/context/fragments/scheduler.svelte.ts',
  '/core/src/lib/context/fragments/dom.ts'
]
const sveldParser = new ComponentParser()
let sharedTypeProgram: Program | undefined
let sharedTypeChecker: TypeChecker | undefined
let sharedTypeProgramFiles: string[] = []
const sharedAliasCache = new Map<string, TypeAliasDeclaration | InterfaceDeclaration | undefined>()

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

export interface ComponentData {
  name: string
  package: string
  props?: PropInfo[]
  events?: EventInfo[]
  exports?: ExportInfo[]
}

function main() {
  const packages = collectPackageNames(PACKAGES_DIR, IGNORED_PACKAGES)

  const packageComponents = packages.map((packageName) => {
    const components = collectComponents(packageName)
    return { packageName, components }
  })

  const allTypesPaths = packageComponents.flatMap(({ components }) =>
    components.map(findTypesFile).filter((path): path is string => Boolean(path))
  )

  if (allTypesPaths.length > 0) {
    initSharedTypeChecker(allTypesPaths)
  }

  const allComponents: Record<string, ComponentData> = {}

  for (const { packageName, components } of packageComponents) {
    console.log('Processing package:', packageName)

    for (const componentPath of components) {
      const name = basename(componentPath, '.svelte')

      const srcData = getDataFromSources({
        name,
        path: componentPath
      })

      // : ComponentData
      const data = {
        name,
        package: packageName
      }

      for (const key in srcData) {
        // @ts-ignore
        // data[key] = srcData[key]
        if (key == 'props') {
          data.props = {}
          for (let i = 0; i < srcData.props.length; i++) {
            const element = srcData.props[i]
            if (typeof element.type === 'object' && 'name' in element.type) {
              element.type = element.type.name
            }
            data.props[element.name] = element
          }
        } else if (key == 'events') {
          data.events = {}
          for (let i = 0; i < srcData.events.length; i++) {
            const element = srcData.events[i]
            data.events[element.name] = element
          }
        } else if (key == 'exports') {
          data.exports = {}
          for (let i = 0; i < srcData.exports.length; i++) {
            const element = srcData.exports[i]
            data.exports[element.name] = element
          }
        }
      }

      allComponents[data.name] = data
    }
  }

  writeFileSync(
    resolve(__dirname, 'component-signatures-generated.json'),
    JSON.stringify(allComponents, null, 2)
  )
  console.log('\nComponent data written to component-signatures-generated.json')
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

  // Core is a special case. We only want Canvas.
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
  const typesFileData = dataFromTypesFile({ name, path })

  if (svelteFileData.props.length < typesFileData.props.length) {
    // TODO-DefinitelyMaybe: check out these cases
    // Extras to check
    // AsciiRenderer, Gizmo, VirtualEnvironment, ImageMaterial, Instance, View, Text, InstancedSprite
  }

  // canvas is a special case
  if (name === 'Canvas') {
    return getCanvasData()
  }

  return mergeData(svelteFileData, typesFileData)
}

function updateTypeText(text: string) {
  // other updates to type text can be made here if needed, this is just a quick fix to make the types more readable in the docs
  // this specific case is for the common pattern of optional props that have a default value of undefined, which is often represented in types as "type | undefined"
  text = text.replace(/ \| undefined/, '')
  let match = text.match(/Mesh\<.*?\>/g)
  if (match) {
    let substring = bracketMatchedSubstring(text)
    if (substring) {
      text = text.replace(substring, 'Mesh')
    }
  }
  text = text.replaceAll(/Object3D\<Object3DEventMap\>/g, 'Object3D')
  return text
}

function bracketMatchedSubstring(param: string) {
  const prefix = 'Mesh'
  const idx = param.indexOf(prefix)
  if (idx === -1) return null

  const afterPrefix = idx + prefix.length
  if (param[afterPrefix] !== '<') return null

  let depth = 0
  for (let i = afterPrefix; i < param.length; i++) {
    if (param[i] === '<') depth++
    else if (param[i] === '>') {
      depth--
      if (depth === 0) {
        return param.substring(idx, i + 1)
      }
    }
  }
  return null
}

function getDataFromJSDocsTS(prop: Symbol) {
  let description: string | undefined
  let defaultValue: string | undefined
  const declarations = prop.getDeclarations()
  if (declarations) {
    for (const declaration of declarations) {
      const jsDocs = getJSDocCommentsAndTags(declaration)
      for (const jsDoc of jsDocs) {
        if (jsDoc.comment) {
          description = jsDoc.comment.trim() || undefined
          // firstly replacing all \r\n occurances with " " as that's a common case for jsDocs
          description = description?.replaceAll(/(\r\n)+/g, ' ')
          // any remaining \n 's are assumed to be ends of sentences
          description = description?.replaceAll(/\n+/g, '. ')
        }
        for (const tag of jsDoc.tags || []) {
          if (tag.tagName.text === 'default') {
            const comment = tag.comment
            defaultValue = typeof comment === 'string' ? comment.trim() : undefined
          }
        }
      }
    }
  }
  return { description, defaultValue }
}

function getDataFromJSDocsPropertySignature(prop: PropertySignature) {
  let description: string | undefined
  let defaultValue: string | undefined
  const jsDocs = getJSDocCommentsAndTags(prop)
  for (const jsDoc of jsDocs) {
    if (jsDoc.comment) {
      description = jsDoc.comment.trim() || undefined
      description = description?.replaceAll(/(\r\n)+/g, ' ')
      description = description?.replaceAll(/\n+/g, '. ')
    }
    for (const tag of jsDoc.tags || []) {
      if (tag.tagName.text === 'default') {
        const comment = tag.comment
        defaultValue = typeof comment === 'string' ? comment.trim() : undefined
      }
    }
  }
  return { description, defaultValue }
}

function collectTypeLiteralProperties(typeNode: TypeNode | undefined): PropertySignature[] {
  const properties: PropertySignature[] = []

  const collect = (node: TypeNode | undefined) => {
    if (!node) return
    if (isTypeLiteralNode(node)) {
      for (const member of node.members) {
        if (isPropertySignature(member)) {
          properties.push(member)
        }
      }
      return
    }
    if (isIntersectionTypeNode(node) || isUnionTypeNode(node)) {
      for (const child of node.types) {
        collect(child)
      }
      return
    }
    if (isParenthesizedTypeNode(node)) {
      collect(node.type)
      return
    }
  }

  collect(typeNode)
  return properties
}

function collectInterfaceProperties(
  interfaceDeclaration: InterfaceDeclaration
): PropertySignature[] {
  const properties: PropertySignature[] = []
  for (const member of interfaceDeclaration.members) {
    if (isPropertySignature(member)) {
      properties.push(member)
    }
  }
  return properties
}

function dataFromSvelteFile(params: { name: string; path: string }) {
  const { name, path } = params

  const src = readFileSync(path, 'utf-8')

  const parsedComponent = sveldParser.parseSvelteComponent(src, {
    filePath: path,
    moduleName: name
  })

  const exports: ExportInfo[] = parsedComponent.props
    .filter((value) => value.constant)
    .map((value) => {
      let x = {
        name: value.name,
        type: value.type,
        description: value.description
      } as ExportInfo
      if (x.type === '(...args: any[]) => any') {
        x.type = '() => void'
      }
      return x
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
      if (value.value && value.value != 'undefined' && value.value != "''") {
        data.default = value.value
      }
      // TODO-DefinitelyMaybe: how much to we worry about bindables in the component signatures?
      // currently nada
      // if (value.reactive) {
      //   console.log(value)
      //   data.bindable = true
      // }
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
  if (!typesPath || !sharedTypeChecker || !sharedTypeProgram) return { props: [], events: [] }

  const checker = sharedTypeChecker
  const sourceFile = sharedTypeProgram.getSourceFile(typesPath)
  if (!sourceFile) return { props: [], events: [] }

  const cacheKey = `${typesPath}::${name}`
  let alias = sharedAliasCache.get(cacheKey)
  if (alias === undefined) {
    alias = undefined
    forEachChild(sourceFile, (node) => {
      if (isTypeAliasDeclaration(node) || isInterfaceDeclaration(node)) {
        const aliasName = node.name.text
        if (aliasName === name + 'Props' || aliasName === 'Props' || aliasName.includes('Props')) {
          alias = node
        }
      }
    })
    sharedAliasCache.set(cacheKey, alias)
  }

  if (!alias) return { props: [], events: [] }

  const propertySignatures = isTypeAliasDeclaration(alias)
    ? collectTypeLiteralProperties(alias.type)
    : collectInterfaceProperties(alias)

  const data = propertySignatures.map((property) => {
    const propName = property.name.getText(sourceFile)
    const propType = property.type ? checker.getTypeFromTypeNode(property.type) : undefined
    const typeText = propType ? updateTypeText(checker.typeToString(propType)) : undefined
    const { description, defaultValue } = getDataFromJSDocsPropertySignature(property, sourceFile)
    const isOptional = !!property.questionToken
    let temp: PropInfo = {
      name: propName,
      type: typeText
    }
    if (description) {
      temp.description = description
    }
    if (defaultValue) {
      temp.default = defaultValue
    }
    if (!isOptional) {
      temp.required = true
    }
    // TODO-DefinitelyMaybe: adjusting quirks of particular entries. This is a bit sad but the types generated for MeshoptDecoder are pretty unwieldy for the docs, so we hardcode it to be more readable. If we find ourselves doing more of these kinds of adjustments we may want to consider a more robust solution.
    if (temp.name == 'meshoptDecoder') {
      temp.type = 'MeshoptDecoder'
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

/** On merge we prefer the typescript data however sveld usually has component export type/description information */
function mergeData(
  svelteDataSource: { props: PropInfo[]; events: EventInfo[]; exports: ExportInfo[] },
  typesDataSource: { props: PropInfo[]; events: EventInfo[] }
) {
  const finalProps: PropInfo[] = []
  const finalEvents: EventInfo[] = []
  const finalExports: ExportInfo[] =
    svelteDataSource.exports.length > 0 ? svelteDataSource.exports : []

  const sveldPropKeys = svelteDataSource.props.map((value) => value.name)
  const tsPropKeys = typesDataSource.props.map((value) => value.name)
  const allPropKeys = new Set([...sveldPropKeys, ...tsPropKeys])

  for (const propKey of allPropKeys) {
    const tsPropVersion = typesDataSource.props.find((value) => value.name == propKey)
    if (tsPropVersion) {
      finalProps.push({ ...tsPropVersion })
    } else {
      const prop = svelteDataSource.props.find((value) => value.name == propKey)!
      finalProps.push(prop)
    }
  }

  const sveldEventPropKeys = svelteDataSource.events.map((value) => value.name)
  const tsEventPropKeys = typesDataSource.events.map((value) => value.name)
  const allEventPropKeys = new Set([...sveldEventPropKeys, ...tsEventPropKeys])

  for (const eventPropKey of allEventPropKeys) {
    const tsEventPropVersion = typesDataSource.events.find((value) => value.name == eventPropKey)
    if (tsEventPropVersion) {
      finalEvents.push({ ...tsEventPropVersion })
    } else {
      const event = svelteDataSource.events.find((value) => value.name == eventPropKey)!
      finalEvents.push(event)
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
  const rootFiles = CANVAS_PATHS.map((path) => join(PACKAGES_DIR, path))
  const program = createProgram(rootFiles, getCompilerOptions(rootFiles[0]))

  const checker = program.getTypeChecker()
  const sourceFiles = program.getSourceFiles()

  let contextAlias: TypeAliasDeclaration | undefined
  for (const sourceFile of sourceFiles) {
    forEachChild(sourceFile, (node) => {
      if (isTypeAliasDeclaration(node) && node.name.text === 'CreateThrelteContextOptions') {
        contextAlias = node
      }
    })
    if (contextAlias) break
  }

  if (!contextAlias) {
    throw 'No CreateThrelteContextOptions type alias found'
  }

  if (!contextAlias.type) {
    throw 'No CreateThrelteContextOptions type alias found'
  }

  const type = checker.getTypeFromTypeNode(contextAlias.type)
  const properties = type.getProperties()

  const data = properties
    .filter((prop) => !['canvas', 'dom'].includes(prop.getName()))
    .map((prop) => {
      const propType = checker.getTypeOfSymbolAtLocation(prop, contextAlias)
      const typeText = checker.typeToString(propType)
      const { description, defaultValue } = getDataFromJSDocsTS(prop, checker)
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
        temp.description =
          'To set up a custom renderer, pass a function that returns a new renderer instance.'
      }
      return temp
    })

  return { props: data }
}

function normalizePaths(paths: string[]) {
  return [...new Set(paths)].sort()
}

function getCompilerOptions(componentPath?: string): CompilerOptions {
  const defaultOptions: CompilerOptions = {
    noEmit: true,
    skipLibCheck: true,
    strict: false,
    target: ScriptTarget.ESNext,
    module: ModuleKind.ESNext,
    moduleResolution: ModuleResolutionKind.NodeNext,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    baseUrl: resolve(__dirname, '../../..'),
    paths: {
      '@threlte/*': ['packages/*/src/lib/index.ts']
    }
  }

  if (!componentPath) return defaultOptions

  // Extract package directory from path
  const packageMatch = componentPath.match(/packages\/([^/]+)/)
  if (!packageMatch) return defaultOptions

  const packageDir = resolve(PACKAGES_DIR, packageMatch[1])
  const tsconfigPath = join(packageDir, 'tsconfig.json')

  if (!existsSync(tsconfigPath)) return defaultOptions

  try {
    const tsconfigContent = readFileSync(tsconfigPath, 'utf-8')
    const tsconfig = JSON.parse(tsconfigContent)
    const parsed = parseJsonConfigFileContent(tsconfig, sys, packageDir)

    // Merge tsconfig options with defaults
    return {
      ...defaultOptions,
      ...parsed.options
    }
  } catch (error) {
    return defaultOptions
  }
}

function initSharedTypeChecker(typeFiles: string[]) {
  const normalizedFiles = normalizePaths(typeFiles)
  if (
    sharedTypeProgram &&
    sharedTypeChecker &&
    sharedTypeProgramFiles.length === normalizedFiles.length &&
    sharedTypeProgramFiles.every((value, index) => value === normalizedFiles[index])
  ) {
    return
  }

  sharedTypeProgramFiles = normalizedFiles
  sharedAliasCache.clear()
  sharedTypeProgram = createProgram(normalizedFiles, getCompilerOptions(normalizedFiles[0]))
  sharedTypeChecker = sharedTypeProgram.getTypeChecker()
}

main()
