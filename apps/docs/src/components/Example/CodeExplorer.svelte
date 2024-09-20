<script lang="ts">
	import { setContext } from 'svelte'
	import { createEventDispatcher } from 'svelte'
	import type { Writable } from 'svelte/store'
	import DirectoryComponent from './Directory.svelte'
	import type { Directory, File } from './types'

	export let filePaths: string[]
	export let currentlySelectedFile: Writable<File>

	const tree: Directory['files'] = []

	filePaths.forEach((path) => {
		const parts = path.split('/')

		if (parts.length === 1) {
			// this is a file in the root dir
			if (!parts[0]) {
				return
			}
			tree.push({
				name: parts[0],
				type: 'file',
				path: path
			})
		} else {
			// this is a file in a subdirectory
			const directories = parts.slice(0, -1)
			let currentDir = tree
			directories.forEach((directory) => {
				const existingDir = currentDir.find((item) => item.name === directory)
				if (existingDir && existingDir.type === 'directory') {
					currentDir = existingDir.files
				} else {
					const newDir: Directory = {
						name: directory,
						type: 'directory',
						files: []
					}
					currentDir.push(newDir)
					currentDir = newDir.files
				}
			})
			const fileName = parts[parts.length - 1]
			if (!fileName) {
				return
			}
			// insert file in directory
			currentDir.push({
				name: fileName,
				type: 'file',
				path: path
			})
		}
	})

	const dispatch = createEventDispatcher<{
		fileSelected: File
	}>()

	const selectFile = (file: File) => {
		dispatch('fileSelected', file)
	}

	setContext('selectFile', selectFile)
</script>

<div
	class="scrollbar-hide overflow-y-auto border-b border-white/20 px-4 py-3 max-md:flex-shrink-0 md:border-b-0 md:border-r text-sm"
>
	<DirectoryComponent
		{currentlySelectedFile}
		showDirectoryName={false}
		directory={{
			name: 'src',
			type: 'directory',
			files: tree
		}}
	/>
</div>
