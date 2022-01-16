<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte'
	import type { Object3D } from 'three'
	import type { ThrelteEvent } from '../lib/interactivity'
	import { useThrelteRoot } from '../hooks/useThrelteRoot'
	import { useThrelte } from '../hooks/useThrelte'

	export let object: Object3D

	const eventDispatcher = createEventDispatcher<{
		click: ThrelteEvent
		contextmenu: ThrelteEvent
		pointerup: ThrelteEvent
		pointerdown: ThrelteEvent
		pointerenter: ThrelteEvent
		pointerleave: ThrelteEvent
		pointermove: ThrelteEvent
	}>()

	object.userData.eventDispatcher = eventDispatcher

	const rootCtx = useThrelteRoot()
	const { render } = useThrelte()

	rootCtx.addInteractiveObject(object)
	render('InteractiveObject: added')

	onDestroy(() => {
		rootCtx.removeInteractiveObject(object)
		render('InteractiveObject: removed')
	})
</script>
