<script lang="ts">
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
	import type { File } from './types'

	export let file: File
	export let currentlySelectedFile: Writable<File>

	$: isSelected = file.path === $currentlySelectedFile.path

	const fileExtension = file.name.split('.').pop()

	const selectFile = getContext('selectFile') as (file: File) => void
</script>

<button
	class="flex bg-transparent flex-row items-center gap-1 border border-transparent hover:underline focus:outline-none [&>*]:w-[1em] {isSelected &&
		'text-orange'}"
	on:click={() => selectFile(file)}
>
	{#if fileExtension === 'ts'}
		<svg viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M11.1 21.4H6.59998"
				stroke="white"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M8.84998 27.4V21.4"
				stroke="white"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M14.6 26.9C15.1417 27.3041 15.7991 27.5232 16.475 27.525C17.6 27.525 18.6 27.15 18.6 25.9C18.6 23.9 14.6 24.775 14.6 22.9C14.6 21.9 15.35 21.275 16.475 21.275C17.1508 21.2768 17.8082 21.4959 18.35 21.9"
				stroke="white"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M23.6 28.4H25.6C25.8652 28.4 26.1196 28.2946 26.3071 28.1071C26.4946 27.9196 26.6 27.6652 26.6 27.4V11.4L19.6 4.39999H7.59998C7.33477 4.39999 7.08041 4.50535 6.89288 4.69289C6.70534 4.88042 6.59998 5.13478 6.59998 5.39999V16.4"
				stroke="white"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M19.6 4.39999V11.4H26.6"
				stroke="white"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	{:else if fileExtension === 'svelte'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			viewBox="0 0 98.1 118"
			xml:space="preserve"
		>
			<path
				d="M91.8 15.6C80.9-.1 59.2-4.7 43.6 5.2L16.1 22.8C8.6 27.5 3.4 35.2 1.9 43.9c-1.3 7.3-.2 14.8 3.3 21.3-2.4 3.6-4 7.6-4.7 11.8-1.6 8.9.5 18.1 5.7 25.4 11 15.7 32.6 20.3 48.2 10.4l27.5-17.5c7.5-4.7 12.7-12.4 14.2-21.1 1.3-7.3.2-14.8-3.3-21.3 2.4-3.6 4-7.6 4.7-11.8 1.7-9-.4-18.2-5.7-25.5"
				fill="#ff3e00"
			/>
			<path
				d="M40.9 103.9c-8.9 2.3-18.2-1.2-23.4-8.7-3.2-4.4-4.4-9.9-3.5-15.3.2-.9.4-1.7.6-2.6l.5-1.6 1.4 1c3.3 2.4 6.9 4.2 10.8 5.4l1 .3-.1 1c-.1 1.4.3 2.9 1.1 4.1 1.6 2.3 4.4 3.4 7.1 2.7.6-.2 1.2-.4 1.7-.7L65.5 72c1.4-.9 2.3-2.2 2.6-3.8.3-1.6-.1-3.3-1-4.6-1.6-2.3-4.4-3.3-7.1-2.6-.6.2-1.2.4-1.7.7l-10.5 6.7c-1.7 1.1-3.6 1.9-5.6 2.4-8.9 2.3-18.2-1.2-23.4-8.7-3.1-4.4-4.4-9.9-3.4-15.3.9-5.2 4.1-9.9 8.6-12.7l27.5-17.5c1.7-1.1 3.6-1.9 5.6-2.5 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3-.2.9-.4 1.7-.7 2.6l-.5 1.6-1.4-1c-3.3-2.4-6.9-4.2-10.8-5.4l-1-.3.1-1c.1-1.4-.3-2.9-1.1-4.1-1.6-2.3-4.4-3.3-7.1-2.6-.6.2-1.2.4-1.7.7L32.4 46.1c-1.4.9-2.3 2.2-2.6 3.8s.1 3.3 1 4.6c1.6 2.3 4.4 3.3 7.1 2.6.6-.2 1.2-.4 1.7-.7l10.5-6.7c1.7-1.1 3.6-1.9 5.6-2.5 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3-.9 5.2-4.1 9.9-8.6 12.7l-27.5 17.5c-1.7 1.1-3.6 1.9-5.6 2.5"
				fill="#fff"
			/>
		</svg>
	{:else if fileExtension === 'glsl'}
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
			><path
				fill="#ff88ff"
				d="M510.457 468.75c-3.8-26.946-33.751-40.647-56.392-27.636l-22.523-22.774l-112.123-308.055l.63-35.612c23.775-5.664 36.997-33.405 23.927-55.897c-14.607-25.135-51.183-25.01-65.68.227c-12.55 21.847-.468 48.44 21.883 55.127l-.604 34.145l-203.087 242.45l-24.638 6.84c-10.87-18.462-36.535-25.278-55.464-11.184c-23.363 17.396-19.092 53.715 7.67 65.217c25.377 10.906 53.074-8.195 52.975-34.842l30.155-8.37l306.55 60.214l26.226 26.519c-10.941 18.963-3.575 45.126 18.691 54.093c27.018 10.88 55.867-11.652 51.804-40.462zm-112.388-84.256l-82.033-82.948l2.403-135.835l79.63 218.783zm-99.053-244.598l-2.749 155.375l-165.994 46.077l168.743-201.452zm-149.1 216.628l151.068-41.933l87.89 88.871l-238.957-46.938z"
			/></svg
		>
	{/if}

	{file.name}
</button>
