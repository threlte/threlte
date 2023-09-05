<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import { Grid, OrbitControls, Sky } from '@threlte/extras';
	import { Controller, Hand, TeleportControls, XR, useGamepad } from '@threlte/xr';
	import Driveway from './models/Driveway.svelte';
	import Breakable from './Breakable.svelte';
	import { BoxGeometry } from 'three';
	import { RigidBody } from '@threlte/rapier';
	import ConcreteGlove from './ConcreteGlove.svelte';
	import { onMount } from 'svelte';

	let xr = false;

	const presets = {
		sunset: {
			turbidity: 10,
			rayleigh: 3,
			azimuth: 180,
			elevation: 0.5,
			mieCoefficient: 0.005,
			mieDirectionalG: 0.7,
			exposure: 0.37
		},
		noon: {
			turbidity: 0.65,
			rayleigh: 0.17,
			azimuth: 180,
			elevation: 85,
			mieCoefficient: 0.013,
			mieDirectionalG: 0.7,
			exposure: 1
		},
		afternoon: {
			turbidity: 4.78,
			rayleigh: 0.3,
			azimuth: 180,
			elevation: 30,
			mieCoefficient: 0.002,
			mieDirectionalG: 0.86,
			exposure: 0.65
		},
		night: {
			turbidity: 20,
			rayleigh: 0.57,
			azimuth: 180,
			elevation: -5,
			mieCoefficient: 0.038,
			mieDirectionalG: 0,
			exposure: 0.26
		}
	};

	let minBreakForce = 9999;
	onMount(() => {
		const timeout = setTimeout(() => {
			minBreakForce = 100;
		}, 2e3);
		return () => clearTimeout(timeout);
	});
</script>

<XR on:sessionstart={() => (xr = true)} on:sessionend={() => (xr = false)}>
	<Controller left />
	<Controller right>
		<svelte:fragment slot="grip">
			<ConcreteGlove />
		</svelte:fragment>
	</Controller>
	<Hand left />
	<Hand right />
</XR>

<TeleportControls handedness="right">
	<Driveway />
</TeleportControls>

{#if !xr}
	<T.PerspectiveCamera makeDefault position={[10, 10, 10]}>
		<OrbitControls />
	</T.PerspectiveCamera>
{/if}

<Sky {...presets.sunset} />

<T.Group position.y={1.1} position.z={-2}>
	<Breakable {minBreakForce} maxDepth={3}>
		<T.Mesh>
			<T.BoxGeometry args={[1, 2, 1]} />
			<T.MeshStandardMaterial />
		</T.Mesh>
	</Breakable>
</T.Group>

<Grid
	cellColor="#ffffff"
	sectionColor="#ffffff"
	sectionThickness={0}
	fadeDistance={25}
	cellSize={2}
/>
