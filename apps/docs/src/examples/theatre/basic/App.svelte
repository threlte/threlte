<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import { Project, Studio, Theatre } from '@threlte/theatre'
</script>

<Canvas>
	<Theatre>
		<Scene />
	</Theatre>
</Canvas>
