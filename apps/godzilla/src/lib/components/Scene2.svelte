<script lang="ts">
	import { T } from '@threlte/core'
	import { Audio, AudioListener, Grid, OrbitControls, PositionalAudio, Sky } from '@threlte/extras'
	import { Controller, Headset, TeleportControls, XR } from '@threlte/xr'
	import Steam from './Steam/Steam.svelte'
	import Wind from './Wind.svelte'
	import Gizmo from './Gizmo.svelte'
	import CompositionB from './models/CompositionB.svelte'
	import CompositionBNavMesh from './models/CompositionBNavMesh.svelte'
	import QuarksRenderer from './Quarks/QuarksRenderer.svelte'
	import Quarks from './Quarks/Quarks.svelte'
	import { DEG2RAD } from 'three/src/math/MathUtils'
</script>

<Headset>
	<AudioListener />
</Headset>

<QuarksRenderer />

<XR>
	<Audio src="/audio/background.m4a" loop autoplay volume={0.3} />

	<PositionalAudio
		src="/audio/candle.m4a"
		loop
		autoplay
		volume={1}
		position.z={-2.8}
		position.x={-0.6}
		position.y={0.9}
	>
		<!-- <PositionalAudioHelper /> -->
	</PositionalAudio>

	<PositionalAudio
		src="/audio/wind.m4a"
		loop
		autoplay
		volume={1}
		refDistance={100}
		position.z={-20}
	/>

	<Controller left />
	<Controller right />

	<TeleportControls maxDistance={10}>
		<CompositionBNavMesh />
	</TeleportControls>

	<svelte:fragment slot="fallback">
		<T.PerspectiveCamera makeDefault position={[10, 10, 10]}>
			<OrbitControls />
		</T.PerspectiveCamera>
	</svelte:fragment>
</XR>

<Sky turbidity={10} rayleigh={3} elevation={0} mieCoefficient={0.005} mieDirectionalG={0.7} />

<CompositionB scale={0.75} />

<Quarks position={[-1.3, 3.6, -2.4]} url="/quarks/steam/scene.json" rotation.y={-90 * DEG2RAD}>
	<Gizmo />
</Quarks>

<Grid />

<Wind position={[3, 1, 0]} offset={1} />
<Wind position={[0, 1, -3]} />
