<script lang="ts">
	import { T, forwardEventHandlers, useLoader } from '@threlte/core'
	import { useQuarks } from './useQuarks'
	import { ParticleSystem, QuarksLoader } from 'three.quarks'
	import { onDestroy } from 'svelte'

	export let url: string
	export let autoplay = true

	const { addObject, removeObject } = useQuarks()

	const loader = useLoader(QuarksLoader)
	const object = loader.load(url)

	let systems: ParticleSystem[] = []

	onDestroy(() => {
		if (!$object) return
		removeObject($object)
	})

	const component = forwardEventHandlers()

	export const play = () => {
		if (!systems.length) return
		systems.forEach((system) => system.play())
	}
	export const restart = () => {
		if (!systems.length) return
		systems.forEach((system) => system.restart())
	}
	export const pause = () => {
		if (!systems.length) return
		systems.forEach((system) => system.pause())
	}

	$: if ($object) {
		systems = addObject($object)
		systems.forEach((system) => {
			system.restart()
		})
		if (!autoplay) {
			pause()
		}
	}
</script>

<T.Group {...$$restProps} bind:this={$component}>
	{#if $object}
		<T is={$object} let:ref>
			<slot {ref} />
		</T>
	{/if}
</T.Group>
