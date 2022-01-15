<script lang="ts">
	import { onDestroy } from 'svelte'

	import type { Pass } from 'three/examples/jsm/postprocessing/EffectComposer'
	import { useThrelteRoot } from '../lib/useThrelteRoot'

	export let pass: Pass

	const { addPass, removePass } = useThrelteRoot()

	addPass(pass)

	onDestroy(() => {
		removePass(pass)
	})
</script>
