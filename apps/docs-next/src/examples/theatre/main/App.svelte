<script lang="ts">
	import { Canvas } from '@threlte/core'
	import SceneA from './SceneA.svelte'
	import { Theatre } from '@threlte/theatre'
	import { Debug, World } from '@threlte/rapier'
	import state from './default.theatre-project-state.json'
</script>

<Canvas>
	<Theatre config={{ state }}>
		<World gravity={{}}>
			<!-- <Debug /> -->
			<SceneA />
		</World>
	</Theatre>
</Canvas>
