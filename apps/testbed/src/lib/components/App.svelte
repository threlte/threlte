<script lang="ts">
	import { transitions, useGltf, useTexture } from '@threlte/extras'
	import { Theatre } from '@threlte/theatre'
	import Scene from './Scene.svelte'
	import { cubeGeometry } from './state'
	import state from './state.json'
	import { useLoader, useThrelte } from '@threlte/core'
	import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
	import { EquirectangularReflectionMapping, SRGBColorSpace, sRGBEncoding } from 'three'

	type CubeGltf = {
		nodes: {
			Cube: THREE.Mesh
		}
		materials: {}
	}
	const cube = useGltf<CubeGltf>('/cube.glb')

	$: if ($cube) cubeGeometry.set($cube.nodes.Cube.geometry)

	const env = useTexture('/oil-on-water.png')

	const { scene } = useThrelte()
	$: if ($env) {
		$env.mapping = EquirectangularReflectionMapping
		$env.colorSpace = SRGBColorSpace
		scene.environment = $env
	}

	transitions()
</script>

<Theatre config={{ state }} studio={{ enabled: true }}>
	{#if $cubeGeometry && $env}
		<Scene />
	{/if}
</Theatre>
