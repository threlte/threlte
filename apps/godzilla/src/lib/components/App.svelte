<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { World } from '@threlte/rapier'
	import { Theatre } from '@threlte/theatre'
	import { VRButton } from '@threlte/xr'
	import Scene from './Scene.svelte'
	import state from './state.json'
</script>

<Canvas>
	<World>
		<Theatre
			config={{ state }}
			studio={{
				enabled: false
			}}
		>
			<Scene />
		</Theatre>
	</World>
</Canvas>

<VRButton />
