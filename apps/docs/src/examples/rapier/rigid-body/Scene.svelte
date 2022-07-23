<script lang="ts">
	import {
		DirectionalLight,
		Object3DInstance,
		OrbitControls,
		PerspectiveCamera
	} from '@threlte/core'
	import { Debug } from '@threlte/rapier'
	import { GridHelper } from 'three'
	import Emitter from './Emitter.svelte'
	import Ground from './Ground.svelte'
</script>

<PerspectiveCamera position={{ y: 10, z: 10, x: 10 }}>
	<OrbitControls />
</PerspectiveCamera>

<DirectionalLight shadow position={{ y: 20, x: 8, z: -3 }} />

<Object3DInstance object={new GridHelper(50)} />

<Ground />

<Debug />

<Emitter />
