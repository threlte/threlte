<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import { Project, Studio } from '@threlte/theatre'
</script>

<Canvas>
	<Studio />
	<Project>
		<Scene />
	</Project>
</Canvas>
