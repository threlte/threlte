<script lang="ts">
	import OpenInStackblitz from './OpenInStackblitz.svelte'

	export let path: string
	export let files: Record<string, string>
	export let hideCode: boolean
	export let hideStackblitz: boolean = false

	let _class = ''
	export { _class as class }
</script>

<div
	class="relative h-[80vh] w-full overflow-hidden rounded-t-md border border-white/20 {hideCode &&
		'!rounded-md'} {_class}"
>
	<iframe src="/examples/{path}" title={path}></iframe>

	{#if !hideStackblitz}
		<div class="absolute bottom-4 right-4">
			<OpenInStackblitz {files} />
		</div>
	{/if}
</div>

<style>
	iframe {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		border-style: none;
	}
</style>
