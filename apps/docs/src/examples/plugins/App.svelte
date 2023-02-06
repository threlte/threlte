<script lang="ts">
	import { Canvas } from '@threlte/core'
	import InteractivityPlugin from './plugins/InteractivityPlugin.svelte'
	import LayersPlugin from './plugins/LayersPlugin.svelte'
	import Scene from './Scene.svelte'
</script>

<Canvas>
	<LayersPlugin>
		<InteractivityPlugin>
			<Scene />
		</InteractivityPlugin>
	</LayersPlugin>
</Canvas>
