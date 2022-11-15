import fs from 'fs'
import { extname, parse, basename } from 'path'
import processor from 'svelte-preprocess'
import { preprocess } from 'svelte/compiler'
import ts from 'typescript'
import type { CompilerOptions } from 'typescript'
import { preprocessThrelte } from '@threlte/preprocess'

const { transpile, ScriptTarget, ModuleKind, JsxEmit, ModuleResolutionKind } = ts

const compilerOptions: CompilerOptions = {
	target: ScriptTarget.ES2020,
	module: ModuleKind.ES2020,
	strict: false,
	esModuleInterop: true,
	jsx: JsxEmit.Preserve,
	moduleResolution: ModuleResolutionKind.NodeJs,
	sourceMap: false
}

const moduleExtensions = ['.svelte', '.ts'] as const
type ModuleExtension = typeof moduleExtensions[number]

const parsers: Record<ModuleExtension, (content: string) => Promise<string>> = {
	'.svelte': async (content) => {
		const result = await preprocess(
			content,
			[
				processor({
					typescript: {
						compilerOptions: compilerOptions
					}
				}),
				{
					script: ({ content }) => {
						const c = '\n    ' + content.replaceAll('\n', '\n    ').trim() + '\n'
						return {
							code: c
						}
					}
				}
			],
			{
				filename: 'File.svelte' // This needs to be set to _something_ for the preprocessors to work
			}
		)

		const threltePreprocessed = await preprocess(
			result.code,
			preprocessThrelte({
				extensions: {
					'three/examples/jsm/controls/OrbitControls': ['OrbitControls'],
					'three/examples/jsm/controls/TransformControls': ['TransformControls']
				}
			})
		)

		// replacing lang attributes is purely cosmetic, still …
		return threltePreprocessed.code
			.replaceAll('<script lang="ts">', '<script>') // catch regular script blocks
			.replaceAll('lang="ts"', '') // catch script module blocks
	},
	'.ts': async (content) => {
		return transpile(content, compilerOptions)
	}
}

const replModuleTypes: Record<ModuleExtension, string> = {
	'.svelte': 'svelte',
	'.ts': 'js'
}

const replModuleImportExtensions: Record<ModuleExtension, string> = {
	'.svelte': '.svelte',
	'.ts': ''
}

type ModuleImport = {
	path: string
}

/**
 * Fully qualify an import path
 * @param relativePath
 * @param dir
 * @returns
 */
const parseImportPath = (relativePath: string, dir: string) => {
	const extension = moduleExtensions.find((ext) => relativePath.endsWith(ext))
	if (extension) return `${dir}/${relativePath}`
	return `${dir}/${relativePath}.ts`
}

/**
 * Find all relative imports in a module
 * @param module
 * @param moduleDir
 * @returns
 */
const findRelativeModuleImports = (module: string, moduleDir: string): ModuleImport[] => {
	const regex = /import\s+(.*)\s+from\s+['"](\.{1,2}\/.*)['"]/g
	// skip type imports
	const matches = Array.from(module.matchAll(regex)).filter((m) => !m[1].startsWith('type'))
	return matches
		.map((m) => m[2])
		.map((path) => {
			return {
				path: parseImportPath(path, moduleDir)
			}
		})
}

/**
 * Rewrite relative imports to top level relative imports and replace extension
 * @param module
 * @returns
 */
const rewriteRelativeImports = (module: string) => {
	const regex = /(import\s+.*\s+from\s+['"])(\.{1,2}\/.*)(['"])/g
	const matches = Array.from(module.matchAll(regex))
	matches.forEach((m) => {
		const moduleName =
			parse(m[2]).name + replModuleImportExtensions[(parse(m[2]).ext || '.ts') as ModuleExtension]
		module = module.replace(m[0], `${m[1]}./${moduleName}${m[3]}`)
	})
	return module
}

type RelativeModule = {
	module: string
	path: string
	extension: ModuleExtension
}

/**
 * Collect and read all relative modules in a module
 * @param moduleImports
 * @param collectedModules
 * @returns
 */
const collectRelativeModules = (
	moduleImports: ModuleImport[],
	collectedModules: RelativeModule[]
) => {
	for (const moduleImport of moduleImports) {
		const { path } = moduleImport
		const module = fs.readFileSync(`${path}`, 'utf-8')
		const relativeModuleImports = findRelativeModuleImports(module, parse(path).dir)
		const filterDuplicateImports = relativeModuleImports.filter((moduleImport) => {
			const importBasename = basename(moduleImport.path)
			const collectedModulesBasenames = collectedModules.map((m) => basename(m.path))
			return !collectedModulesBasenames.includes(importBasename)
		})

		collectedModules.push({
			module: rewriteRelativeImports(module),
			path,
			extension: extname(path) as ModuleExtension
		})

		collectRelativeModules(filterDuplicateImports, collectedModules)
	}

	return collectedModules
}

export async function get({ params }: { params: Record<string, string> }) {
	const { slug } = params

	const dir = `./src/examples/${slug}`

	const entryModule: ModuleImport = {
		path: `${dir}/App.svelte`
	}

	const collectedModules: RelativeModule[] = []

	const modules = collectRelativeModules([entryModule], collectedModules)

	const parsedModulePromises = modules.map(async (module) => {
		const parsed = await parsers[module.extension as ModuleExtension](module.module)

		return {
			name: parse(module.path).name,
			type: replModuleTypes[module.extension as ModuleExtension],
			source: parsed
		}
	})

	const parsedModules = await Promise.all(parsedModulePromises)

	parsedModules.sort((d) => {
		if (!d || d.name !== 'App') return 1
		return -1
	})

	return {
		status: 200,
		body: {
			components: parsedModules
		}
	}
}
