import fs from 'fs'
import { extname, parse } from 'path'
import processor from 'svelte-preprocess'
import { preprocess } from 'svelte/compiler'
import * as ts from 'typescript'
import type { CompilerOptions } from 'typescript'

const { transpile, ScriptTarget, ModuleKind, JsxEmit, ModuleResolutionKind } = ts

const compilerOptions: CompilerOptions = {
	target: ScriptTarget.ES2020,
	module: ModuleKind.ES2020,
	strict: false,
	esModuleInterop: true,
	jsx: JsxEmit.Preserve,
	moduleResolution: ModuleResolutionKind.NodeJs
}

const moduleExtensions = ['.svelte', '.ts'] as const
type ModuleExtensions = typeof moduleExtensions[number]

const parsers: Record<ModuleExtensions, (content: string) => Promise<string>> = {
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

		// replacing lang attributes is purely cosmetic, still …
		return result.code
			.replaceAll('<script lang="ts">', '<script>') // catch regular script blocks
			.replaceAll('lang="ts"', '') // catch script module blocks
	},
	'.ts': async (content) => {
		return transpile(content, compilerOptions)
	}
}

const replModuleTypes: Record<ModuleExtensions, string> = {
	'.svelte': 'svelte',
	'.ts': 'js'
}

export async function get({ params }: { params: Record<string, string> }) {
	const { slug } = params

	const dir = `./src/examples/${slug}`

	const filePaths = fs.readdirSync(dir)

	const componentsPromises = filePaths.map(async (filePath) => {
		const extension = extname(filePath)

		// Unsupported module, throw!
		if (!moduleExtensions.includes(extension as ModuleExtensions)) {
			throw new Error(`Unsupported module extension: ${extension}`)
		}

		const moduleContent = fs.readFileSync(`./src/examples/${slug}/${filePath}`, {
			encoding: 'utf-8'
		})

		const parsed = await parsers[extension as ModuleExtensions](moduleContent)

		return {
			name: parse(filePath).name === 'Wrapper' ? 'App' : parse(filePath).name,
			type: replModuleTypes[extension as ModuleExtensions],
			source: parsed
		}
	})

	const components = await Promise.all(componentsPromises)

	components.sort((d) => {
		if (!d || d.name !== 'App') return 1
		return -1
	})

	return {
		status: 200,
		body: {
			components
		}
	}
}
