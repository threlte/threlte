<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { extend } from '@threlte/core'
	import Scene from './Scene.svelte'
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

	extend({
		OrbitControls
	})
</script>

<Canvas>
	<Scene />
</Canvas>
