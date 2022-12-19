<script lang="ts">
	import { Canvas } from '@threlte/core'
	import InteractivityPlugin from './plugins/InteractivityPlugin.svelte'
	import LayersPlugin from './plugins/LayersPlugin.svelte'
	import Scene from './Scene.svelte'
</script>

<div class="w-full h-full fixed top-0 left-0">
	<Canvas>
		<LayersPlugin>
			<InteractivityPlugin>
				<Scene />
			</InteractivityPlugin>
		</LayersPlugin>
	</Canvas>
</div>
