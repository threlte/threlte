<script lang="ts">
	import {
		DirectionalLight,
		Object3DInstance,
		OrbitControls,
		PerspectiveCamera,
		Mesh
	} from '@threlte/core'
	import { Debug, Attractor } from '@threlte/rapier'
	import { GridHelper, SphereBufferGeometry, MeshBasicMaterial } from 'three'
	import RandomMeshes from './RandomMeshes.svelte'

	let count: number = 50
	export let showHelper: boolean
	export let strengthLeft: number
	export let strengthCenter: number
	export let strengthRight: number
	export const reset = () => {
		count = 0
		setTimeout(() => (count = 50))
	}
</script>

<PerspectiveCamera position={{ y: 50, z: 100 }} fov={70} far={10000}>
	<OrbitControls enableZoom={true} target={{ y: 20 }} />
</PerspectiveCamera>

<DirectionalLight shadow position={{ y: 20, x: 8, z: -3 }} />

<Object3DInstance object={new GridHelper(100)} />

<Debug />

<RandomMeshes {count} rangeX={[-30, 30]} rangeY={[0, 75]} rangeZ={[-10, 10]} />

<Attractor range={20} strength={strengthLeft} {showHelper} position={{ x: -25, y: 10 }} />
<Attractor range={15} strength={strengthCenter} {showHelper} position={{ y: 20 }} />
<Attractor range={20} strength={strengthRight} {showHelper} position={{ x: 25, y: 10 }} />
