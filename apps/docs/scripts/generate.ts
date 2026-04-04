import { readFileSync, statSync, readdirSync, writeFileSync, existsSync } from 'fs'
import { svelte2tsx } from 'svelte2tsx'
import { Node, Project, SourceFile, type Symbol, TypeAliasDeclaration } from 'ts-morph'
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

    const project = createProject(packageName)
    const components = collectComponents(packageName)

    for (const componentPath of components) {
      console.log('Processing:', componentPath)
      const name = basename(componentPath, '.svelte')

      const propsData = getPropsFromSources({
        name,
        path: componentPath,
        project
      })

			const data = {
        name,
        package: packageName
				...propsData
      }
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

/**
 *
 * we use both the .svelte file convertered into tsx and we look into the surrounding types.ts files
 */
function getPropsFromSources(params: { name: string; path: string; project: Project }) {
  const { name, path, project } = params

  const src = readFileSync(path, 'utf-8')

  const props: PropInfo[] = []
  const events: EventInfo[] = []
  const snippets: SnippetInfo[] = []
  const bindings = extractBindings(src)

  const propsSvelteFile = dataFromSvelteFile({name, src, path, project})
	const propsTypesFile = dataFromTypesFile({name, path, project})

  // canvas is a special one
  if (name === 'Canvas') {
    const data = extractCanvasData(project)
		propsSvelteFile.push(data)
  }

  // Process the props
  // const type = propsAlias.getType()
  // const properties = type.getApparentProperties()
  // const typeName = prop.getName()
  // let typeText = prop.getTypeAtLocation(sourceFile).getText()
  // typeText = updateTypeText(typeText)

	// TODO-DefinitelyMaybe: camera props "manual" and "makeDefault" make it to the T component data

	// sort props into their categories
  for (const prop of propsData) {
    const { name } = prop

    if (name.startsWith('on')) {
			events.push(prop as EventInfo)
    } else if (name === 'children') {
      snippets.push(prop as SnippetInfo)
    } else {
			// we attached a boolean to check here
			const check = prop.isbinding ? true: false
			if (check) {
				bindings.push({
					name: prop.name,
					type: prop.type,
					description: prop.description
				})
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

function collectDefaults(
  typeAliases: Array<ReturnType<SourceFile['getTypeAliases']>[number]>
) {
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
			let {description} = getDataFromJSDocs(prop)
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
    bindings.push({
      name: varName,
      type: 'unknown', // TODO: infer from types
      description: undefined,
			isbinding:true
    })
  }
  return bindings
}

function dataFromSvelteFile(params:{name:string, src:string, path:string, project:Project}) {
	const {name, src, path, project} = params
	// use the svelte file first
  const { code } = svelte2tsx(src, { filename: path, mode: 'ts' })
  const tsxPath = join('./', `${name}.tsx`)
  const tsxSourceFile = project.createSourceFile(tsxPath, code, { overwrite: true })

  let propsAlias = tsxSourceFile.getTypeAlias('Props')

  let type = propsAlias?.getType()
  let properties = type?.getApparentProperties()

	const data = []

  if (properties) {
    for (const prop of properties) {
      const name = prop.getName()
			data.push({
				name,
				type:'todo'
			})
    }
  }

	return data
}

function dataFromTypesFile(params:{name:string, path:string, project:Project}) {
	const {name, path, project} = params
	const typesPath = findTypesFile(path)

	let propsAlias

  if (typesPath) {
    const typesSourceFile = project.getSourceFile(typesPath)
    if (typesSourceFile) {
      propsAlias = findAlias(typesSourceFile, name) ?? undefined
    }
  }

	let type = propsAlias?.getType()
  let properties = type?.getApparentProperties()

	let data = []
  if (properties) {
   for (const prop of properties) {
      const name = prop.getName()
			data.push({
				name,
				type:'todo'
			})
    }
  }
	return data
}

main().catch((e) => {
  console.error('Failure in generate script:', e)
  process.exit(1)
})

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
      const alias = findAlias(typesSourceFile, componentName)
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

    if (name.startsWith('on')) {
      // events
      continue
    } else if (name === 'children') {
      // snippets
      continue
    }

    const propType = prop.getTypeAtLocation(sourceFile)
    let typeText = propType.getText()

    let defaultValue: string | undefined
    let description: string | undefined

    // from JSDoc if in types
    if (sourceFile !== tsxSourceFile) {
      let { description: desc, defaultValue: dvalue } = getDataFromJSDocs(prop)
      description = desc
      defaultValue = dvalue
    }

    // check destructuring in svelteSource
    if (!defaultValue) {
      const destructRegex = /let\s*\{\s*[^}]*${name}\s*=\s*([^,}]+)/g
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

  return props
}

function extractEvents(
  project: Project,
  typesPath: string | null,
  componentName: string
): EventInfo[] {
  if (!typesPath) return []

  const sourceFile = project.getSourceFile(typesPath)
  if (!sourceFile) return []

  const propsAlias = findAlias(sourceFile, componentName)
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

    let { description } = getDataFromJSDocs(prop)

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

function extractSnippets(
  project: Project,
  typesPath: string | null,
  componentName: string
): SnippetInfo[] {
  if (!typesPath) return []

  const sourceFile = project.getSourceFile(typesPath)
  if (!sourceFile) return []

  const propsAlias = findAlias(sourceFile, componentName)
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
        let paramsStr = paramMatch[1]
        paramsStr = updateTypeText(paramsStr).slice(1, -1)
        parameters = paramsStr.split(',').map((p) => {
          const parts = p.split(':').map((s) => s.trim())
          return { name: parts[0], type: parts[1] || 'unknown' }
        })
      }

      let { description } = getDataFromJSDocs(prop)

      snippets.push({
        name,
        parameters,
        description
      })
    }
  }

  return snippets
}
