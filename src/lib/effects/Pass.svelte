<script lang="ts">
	import { onDestroy } from 'svelte'

	import type { Pass } from 'three-stdlib'
	import { useThrelteRoot } from '../lib/useThrelteRoot'

	export let pass: Pass

	const { addPass, removePass } = useThrelteRoot()

	addPass(pass)

	onDestroy(() => {
		removePass(pass)
	})
</script>
