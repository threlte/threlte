import fs from 'fs'
import { extname, parse } from 'path'
import processor from 'svelte-preprocess'
import { preprocess } from 'svelte/compiler'

export async function get({ params }: { params: Record<string, string> }) {
	const { slug } = params

	const dir = `./src/examples/${slug}`

	const filePaths = fs.readdirSync(dir)

	const componentsPromises = filePaths.map(async (filePath) => {
		const componentContent = fs.readFileSync(`./src/examples/${slug}/${filePath}`, {
			encoding: 'utf-8'
		})

		const result = await preprocess(
			componentContent,
			[
				processor({
					typescript: {
						compilerOptions: {
							target: 'es2020',
							module: 'es2020',
							strict: false,
							esModuleInterop: true,
							jsx: 'preserve',
							moduleResolution: 'node'
						}
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
				filename: filePath
			}
		)

		return {
			name: parse(filePath).name === 'Wrapper' ? 'App' : parse(filePath).name,
			type: extname(filePath).substring(1),
			source: result.code
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
