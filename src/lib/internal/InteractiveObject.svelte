<script context="module" lang="ts">
  export type InteractiveObjectProps = {
    object: Object3D
    interactive: boolean
    ignorePointer: boolean
  }
</script>

<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte'
  import type { Object3D } from 'three'
  import type { ThrelteEvent } from '../lib/interactivity'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import { useThrelte } from '../hooks/useThrelte'

  export let object: InteractiveObjectProps['object']
  export let interactive: InteractiveObjectProps['interactive']
  export let ignorePointer: InteractiveObjectProps['ignorePointer']

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
