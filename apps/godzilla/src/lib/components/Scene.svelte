<script lang="ts">
	import { T } from '@threlte/core'
	import { AudioListener, Grid, OrbitControls, PositionalAudio, Sky } from '@threlte/extras'
	import { Controller, Hand, TeleportControls, XR } from '@threlte/xr'
	import { onMount } from 'svelte'
	import Bullet from './Bullet.svelte'
	import Floor from './Floor.svelte'
	import Head from './Head.svelte'
	import Quarks from './Quarks/Quarks.svelte'
	import QuarksRenderer from './Quarks/QuarksRenderer.svelte'

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

	let minBreakForce = 9999
	onMount(() => {
		const timeout = setTimeout(() => {
			minBreakForce = 100
		}, 2e3)
		return () => clearTimeout(timeout)
	})

	let show

	let playExplosion = false
	let timeout: ReturnType<typeof setTimeout>

	let bullets: string[] = []
	const addBullet = () => {
		const randomId = Math.random().toString(36).slice(2)
		bullets.push(randomId)
		bullets = bullets
	}
	const removeBullet = (id: string) => {
		bullets.splice(bullets.indexOf(id), 1)
		bullets = bullets
	}
</script>

<QuarksRenderer />

<XR on:sessionstart={() => (xr = true)} on:sessionend={() => (xr = false)} foveation={0}>
	<Head>
		<AudioListener />
	</Head>

	<Controller left>
		<Quarks url="/scene.json" scale={0.02} />
		<PositionalAudio src="/neon.wav" autoplay loop rolloffFactor={2} volume={0.3} />
	</Controller>

	<Controller
		right
		on:select={async () => {
			addBullet()
		}}
	>
		<svelte:fragment slot="grip">
			{#each bullets as bullet}
				<Bullet
					on:eol={() => {
						removeBullet(bullet)
					}}
				/>
			{/each}
			<!-- <ConcreteGlove /> -->
		</svelte:fragment>
	</Controller>
	<Hand left />
	<Hand right />

	<T.Group position.x={5} position.y={1} />
</XR>

<TeleportControls>
	<Floor />
</TeleportControls>

{#if !xr}
	<T.PerspectiveCamera makeDefault position={[10, 10, 10]}>
		<OrbitControls />
	</T.PerspectiveCamera>
{/if}

<Grid
	position.y={0.01}
	cellColor="#ffffff"
	sectionColor="#ffffff"
	sectionThickness={1}
	cellSize={0.25}
	sectionSize={1}
	gridSize={10}
/>

<Sky {...presets.sunset} />
