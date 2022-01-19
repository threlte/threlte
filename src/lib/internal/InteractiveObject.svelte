<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte'
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import type { ThrelteEvent } from '../lib/interactivity'
  import type { InteractiveObjectProperties } from '../types/components'

  export let object: InteractiveObjectProperties['object']
  export let interactive: InteractiveObjectProperties['interactive']
  export let ignorePointer: InteractiveObjectProperties['ignorePointer']

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

  const {
    addInteractiveObject,
    removeInteractiveObject,
    addRaycastableObject,
    removeRaycastableObject
  } = useThrelteRoot()

  const { render } = useThrelte()

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
    render('InteractiveObject: props changed')
  }

  onDestroy(() => {
    removeInteractiveObject(object)
    removeRaycastableObject(object)
    render('InteractiveObject: removed')
  })
</script>
