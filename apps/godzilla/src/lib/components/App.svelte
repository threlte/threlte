<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { World } from '@threlte/rapier'
	import { Theatre } from '@threlte/theatre'
	import { VRButton, XR } from '@threlte/xr'
	import Scene from './Scene.svelte'
	import state from './state.json'
	import Scene2 from './Scene2.svelte'
</script>

<Canvas>
	<!-- <World>
		<Theatre
			config={{ state }}
			studio={{
				enabled: false
			}}
		>
			<Scene />
		</Theatre>
	</World> -->

	<Scene2 />
</Canvas>

<VRButton />
