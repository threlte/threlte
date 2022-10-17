<script lang="ts">
	import PlaygroundIcon from './PlaygroundIcon.svelte'

	export let href: string
	let _class = ''
	export { _class as class }
</script>

<a
	{href}
	class={[
		'flex flex-row items-center gap-2 !no-underline !border-2 border-brand text-brand rounded-md px-2 py-0.5 shadow-lg bg-white hover:bg-brand hover:text-white',
		_class
	].join(' ')}
>
	<PlaygroundIcon class="!text-inherit !p-0 !m-0" {href} />
	Playground
</a>
