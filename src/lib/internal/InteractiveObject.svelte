<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte'
  import type { Object3D } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import type { InteractiveObjectProperties } from '../types/components'
  import type { ThreltePointerEvent } from '../types/types'

  export let object: InteractiveObjectProperties['object']
  let previousObject: InteractiveObjectProperties['object'] | undefined

  export let interactive: InteractiveObjectProperties['interactive']
  export let ignorePointer: InteractiveObjectProperties['ignorePointer']

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

  const { invalidate } = useThrelte()

  const removeObjectInteractivity = (object: Object3D) => {
    removeRaycastableObject(object)
    removeInteractiveObject(object)
    delete object.userData.eventDispatcher
  }

  const setupObjectInteractivity = (
    object: Object3D,
    ignorePointer: boolean,
    interactive: boolean
  ) => {
    object.userData.eventDispatcher = eventDispatcher
    if (ignorePointer) {
      removeRaycastableObject(object)
      removeInteractiveObject(object)
    } else {
      addRaycastableObject(object)
      if (interactive) {
        addInteractiveObject(object)
      } else {
        removeInteractiveObject(object)
      }
    }
  }

  $: {
    if (previousObject && object !== previousObject) {
      removeObjectInteractivity(previousObject)
      setupObjectInteractivity(object, ignorePointer, interactive)
      invalidate('InteractiveObject: object changed')
    } else if (object === previousObject) {
      setupObjectInteractivity(object, ignorePointer, interactive)
      invalidate('InteractiveObject: props changed')
    }
    previousObject = object
  }

  setupObjectInteractivity(object, ignorePointer, interactive)
  invalidate('InteractiveObject: object added')

  onDestroy(() => {
    removeObjectInteractivity(object)
    invalidate('InteractiveObject: object removed')
  })
</script>
