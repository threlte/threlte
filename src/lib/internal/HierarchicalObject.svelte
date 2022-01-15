<script lang="ts" context="module">
	import { getContext, onDestroy, setContext } from 'svelte'
	import type { Object3D } from 'three'
	import type { ThrelteParentContext } from '../lib/types'

	export const setParent = (obj: Object3D) => {
		setContext<ThrelteParentContext>('threlte-parent', obj)
	}

	export const getParent = () => {
		return getContext<ThrelteParentContext>('threlte-parent')
	}
</script>

<script lang="ts">
	export let object: Object3D

	const parent = getParent()
	if (parent) parent.add(object)
	setParent(object)

	onDestroy(() => {
		if (!parent) return
		parent.remove(object)
	})
</script>

<slot />
