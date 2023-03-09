<script lang="ts">
	import { get_current_component, onMount } from 'svelte/internal'

	type T = $$Generic

	let _new: (...args: any[]) => Promise<T>
	export { _new as new }

	const component = get_current_component()

	let callbacks: Record<string, ((value: T) => void)[]> = {}

	onMount(() => {
		callbacks = component.$$.callbacks
	})

	type $$Events = {
		resolve: T
	}

	const promise = _new()

	promise.then((value) => {
		callbacks['resolve'].forEach((callback) => {
			callback(value)
		})
	})
</script>

{#await promise then value}
	<slot {value} />
{/await}
