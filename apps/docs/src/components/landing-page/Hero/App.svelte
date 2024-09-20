<script lang="ts">
	import type { Mesh } from 'three'
	import { useThrelte } from '@threlte/core'
	import { useGltf, useTexture } from '@threlte/extras'
	import { EquirectangularReflectionMapping, SRGBColorSpace } from 'three'
	import Scene from './Scene.svelte'
	import { cubeGeometry } from './state'

	type CubeGltf = {
		nodes: {
			Cube: Mesh
		}
		materials: {}
	}
	const cube = useGltf<CubeGltf>('/models/cube.glb')

	$: if ($cube) cubeGeometry.set($cube.nodes.Cube.geometry)

	const env = useTexture('/textures/oil-on-water.png')

	const { scene } = useThrelte()
	$: if ($env) {
		$env.mapping = EquirectangularReflectionMapping
		$env.colorSpace = SRGBColorSpace
		scene.environment = $env
		scene.environmentIntensity = 10
	}
</script>

{#if $cubeGeometry && $env}
	<Scene />
{/if}
