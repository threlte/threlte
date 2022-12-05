<script lang="ts">
	import { Canvas } from '@threlte/core'
	import SceneA from './SceneA.svelte'
	import { Theatre } from '@threlte/theatre'
	import { Debug, World } from '@threlte/rapier'
</script>

<Canvas>
	<Theatre>
		<World gravity={{}}>
			<!-- <Debug /> -->
			<SceneA />
		</World>
	</Theatre>
</Canvas>
