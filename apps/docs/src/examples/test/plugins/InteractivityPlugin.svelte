<script lang="ts">
	import { useThrelteRoot, injectPlugin, type ThreltePointerEvent } from '@threlte/core'
	import { createEventDispatcher } from 'svelte'
	import type { Object3D } from 'three'

	injectPlugin('interactivity', () => {
		const getThrelteUserData = (object: any): any => {
			return object.userData as any
		}

		const eventDispatcher = createEventDispatcher<{
			click: ThreltePointerEvent
			contextmenu: ThreltePointerEvent
			pointerup: ThreltePointerEvent
			pointerdown: ThreltePointerEvent
			pointerenter: ThreltePointerEvent
			pointerleave: ThreltePointerEvent
			pointermove: ThreltePointerEvent
		}>()

		const {
			addInteractiveObject,
			removeInteractiveObject,
			addRaycastableObject,
			removeRaycastableObject
		} = useThrelteRoot()

		const removeObjectInteractivity = (object: Object3D) => {
			removeRaycastableObject(object)
			removeInteractiveObject(object)
			delete getThrelteUserData(object).eventDispatcher
		}

		const setupObjectInteractivity = (object: Object3D) => {
			getThrelteUserData(object).eventDispatcher = eventDispatcher
			addRaycastableObject(object)
			addInteractiveObject(object)
		}

		return {
			onRefChange: (ref) => {
				if (!ref.raycast) return
				setupObjectInteractivity(ref)
				return () => {
					removeObjectInteractivity(ref)
				}
			},
			pluginProps: ['entity']
		}
	})
</script>

<slot />
