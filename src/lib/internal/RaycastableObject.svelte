<script lang="ts">
	import { onDestroy } from 'svelte'
	import type { Object3D } from 'three'
	import { useThrelteRoot } from '../hooks/useThrelteRoot'

	export let object: Object3D

	const { addRaycastableObject, removeRaycastableObject } = useThrelteRoot()
	addRaycastableObject(object)

	onDestroy(() => {
		removeRaycastableObject(object)
	})
</script>
