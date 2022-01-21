<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte'
  import { usePrevious } from '../hooks/usePrevious'
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import type { InteractiveObjectProperties } from '../types/components'
  import type { ThreltePointerEvent } from '../types/types'

  export let object: InteractiveObjectProperties['object']
  export let interactive: InteractiveObjectProperties['interactive']
  export let ignorePointer: InteractiveObjectProperties['ignorePointer']

  const { current: currentObject, previous: previousObject } = usePrevious(
    object,
    (a, b) => a.uuid === b.uuid
  )
  $: $currentObject = object

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

  $: {
    if ($previousObject) {
      removeRaycastableObject($previousObject)
      removeInteractiveObject($previousObject)
    }
    if (!('eventDispatcher' in $currentObject.userData)) {
      $currentObject.userData.eventDispatcher = eventDispatcher
    }
    if (ignorePointer) {
      removeRaycastableObject($currentObject)
      removeInteractiveObject($currentObject)
    } else {
      addRaycastableObject($currentObject)
      if (interactive) {
        addInteractiveObject($currentObject)
      }
    }
    invalidate('InteractiveObject: props changed')
  }

  onDestroy(() => {
    removeInteractiveObject($currentObject)
    removeRaycastableObject($currentObject)
    invalidate('InteractiveObject: removed')
  })
</script>
