import fs from 'fs'
import { extname, parse } from 'path'
import { transformer } from 'svelte-preprocess/dist/transformers/typescript'

export async function get({ params }: { params: Record<string, string> }) {
	const { slug } = params

	const dir = `./src/examples/${slug}`

	const filePaths = fs.readdirSync(dir)

	const componentsPromises = filePaths.map(async (filePath) => {
		let componentContent = fs.readFileSync(`./src/examples/${slug}/${filePath}`, {
			encoding: 'utf-8'
		})

		const regex = /(?<=<script lang="ts">)(.*)(?=<\/script>)/gms

		const scriptContent = componentContent.match(regex)
		if (scriptContent && scriptContent.length) {
			const transformed = await transformer({
				content: scriptContent[0],
				filename: 'filepath',
				options: {
					compilerOptions: {
						sourceMap: false
					},
					stripIndent: false
				}
			})

			const transpiledCode = transformed.code
				.replaceAll(/(\r\n|\r|\n)/g, '\n  ')
				.replace(/^.*sourceMappingURL.*$/gm, '')
				.trim()

			componentContent = componentContent.replace(regex, '\n  ' + transpiledCode + '\n')
			componentContent = componentContent.replace('<script lang="ts">', '<script>')
		}

		return {
			name: parse(filePath).name === 'Wrapper' ? 'App' : parse(filePath).name,
			type: extname(filePath).substring(1),
			source: componentContent
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
