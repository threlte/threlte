<script lang="ts">
	import {
		DirectionalLight,
		Object3DInstance,
		OrbitControls,
		PerspectiveCamera
	} from '@threlte/core'
	import { Debug } from '@threlte/rapier'
	import { onMount } from 'svelte'
	import { onDestroy } from 'svelte'
	import { GridHelper } from 'three'
	import AttachedCollider from './AttachedCollider.svelte'
	import Sensor from './Sensor.svelte'
	import StandaloneCollider from './StandaloneCollider.svelte'

	export let testIndex: number

	const tests = [StandaloneCollider, AttachedCollider, Sensor]
</script>

<PerspectiveCamera position={{ y: 13, x: 12 }} fov={40}>
	<OrbitControls target={{ x: 2.5 }} />
</PerspectiveCamera>

<DirectionalLight shadow position={{ y: 20, x: 8, z: -3 }} />

<Object3DInstance object={new GridHelper(50)} />

<Debug depthTest={false} depthWrite={false} />

<svelte:component this={tests[testIndex]} />
