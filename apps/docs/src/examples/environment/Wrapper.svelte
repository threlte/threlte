<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { Environment } from '@threlte/extras'
	import Scene from './Scene.svelte'
</script>

<Canvas>
	<Environment
		path="/hdr/"
		files="shanghai_riverside_1k.hdr"
		isBackground={true}
		format="hdr"
		groundProjection={{ radius: 200, height: 5, scalar: 100 }}
	/>
	<Scene />
</Canvas>
