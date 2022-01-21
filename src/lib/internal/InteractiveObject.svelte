<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte'
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import type { InteractiveObjectProperties } from '../types/components'
  import type { ThreltePointerEvent } from '../types/types'

  export let object: InteractiveObjectProperties['object']
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

  object.userData.eventDispatcher = eventDispatcher

  const {
    addInteractiveObject,
    removeInteractiveObject,
    addRaycastableObject,
    removeRaycastableObject
  } = useThrelteRoot()

  const { invalidate } = useThrelte()

  $: {
    if (ignorePointer) {
      removeRaycastableObject(object)
      removeInteractiveObject(object)
    } else {
      addRaycastableObject(object)
      if (interactive) {
        addInteractiveObject(object)
      }
    }
    invalidate('InteractiveObject: props changed')
  }

  onDestroy(() => {
    removeInteractiveObject(object)
    removeRaycastableObject(object)
    invalidate('InteractiveObject: removed')
  })
</script>
