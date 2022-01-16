<script lang="ts">
	import { onDestroy } from 'svelte'
	import type { ColorRepresentation } from 'three'
	import { FogExp2 } from 'three'
	import { convertColorRepresentationToColor } from '../lib/colors'
	import { defaults } from '../lib/defaults'
	import { useThrelte } from '../hooks/useThrelte'
	import { useThrelteRoot } from '../hooks/useThrelteRoot'

	export let color: ColorRepresentation = defaults.fog.color
	export let density = defaults.fog.density

	const { linear } = useThrelteRoot()
	const { scene, render } = useThrelte()

	// @ts-ignore Bad types
	export const fog = new FogExp2(convertColorRepresentationToColor(color, linear), density)

	$: {
		fog.color = convertColorRepresentationToColor(color, linear)
		fog.density = density
		render()
	}

	scene.fog = fog
	render()

	onDestroy(() => {
		scene.fog = null
		render()
	})
</script>
