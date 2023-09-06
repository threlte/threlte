<script lang="ts">
	import { T } from '@threlte/core'
	import { AudioListener, OrbitControls, Sky, interactivity } from '@threlte/extras'
	import { TeleportControls, XR } from '@threlte/xr'
	import { onMount } from 'svelte'
	import Bow from './Archery/Bow.svelte'
	import Head from './Head.svelte'
	import QuarksRenderer from './Quarks/QuarksRenderer.svelte'
	import TheatrePlacer from './Theatre/TheatrePlacer.svelte'
	import ArcheryTarget from './models/ArcheryTarget.svelte'
	import BellTower from './models/Bell_Tower.svelte'
	import Blacksmith from './models/Blacksmith.svelte'
	import Ground from './models/Ground.svelte'
	import House_1 from './models/House_1.svelte'
	import House_2 from './models/House_2.svelte'
	import House_3 from './models/House_3.svelte'
	import House_4 from './models/House_4.svelte'
	import Inn from './models/Inn.svelte'
	import Mill from './models/Mill.svelte'
	import Sawmill from './models/Sawmill.svelte'
	import Stable from './models/Stable.svelte'

	interactivity()

	let xr = false

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
	}
</script>

<!-- <QuarksRenderer /> -->

<XR on:sessionstart={() => (xr = true)} on:sessionend={() => (xr = false)} foveation={0}>
	<Head>
		<AudioListener />
	</Head>

	<Bow />
</XR>

<TheatrePlacer key="Archery Target A">
	<ArcheryTarget />
</TheatrePlacer>

<TheatrePlacer key="Archery Target B">
	<ArcheryTarget />
</TheatrePlacer>

<TeleportControls>
	<Ground />
</TeleportControls>

{#if !xr}
	<T.PerspectiveCamera makeDefault position={[10, 10, 10]}>
		<OrbitControls />
	</T.PerspectiveCamera>
{/if}

<Sky {...presets.sunset} />

<TheatrePlacer key="Mill">
	<Mill />
</TheatrePlacer>

<TheatrePlacer key="Sawmill">
	<Sawmill />
</TheatrePlacer>

<TheatrePlacer key="House_1 A">
	<House_1 />
</TheatrePlacer>

<TheatrePlacer key="House_2 A">
	<House_2 />
</TheatrePlacer>

<TheatrePlacer key="House_3 A">
	<House_3 />
</TheatrePlacer>

<TheatrePlacer key="House_4 A">
	<House_4 />
</TheatrePlacer>

<TheatrePlacer key="Inn A">
	<Inn />
</TheatrePlacer>

<TheatrePlacer key="Blacksmith A">
	<Blacksmith />
</TheatrePlacer>

<TheatrePlacer key="Bell_Tower A">
	<BellTower />
</TheatrePlacer>

<TheatrePlacer key="Stable A">
	<Stable />
</TheatrePlacer>
