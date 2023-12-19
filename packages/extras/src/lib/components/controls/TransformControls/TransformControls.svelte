<script lang="ts">
  import {
    forwardEventHandlers,
    HierarchicalObject,
    T,
    useThrelte,
    watch,
    type Props
  } from '@threlte/core'

  import { Group } from 'three'
  import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

  import { derived, writable } from 'svelte/store'

  import { useControlsContext } from '../useControlsContext'
  import type {
    TransformControlsEvents,
    TransformControlsProps,
    TransformControlsSlots
  } from './TransformControls.svelte'

  type $$Props = TransformControlsProps
  type $$Events = TransformControlsEvents
  type $$Slots = TransformControlsSlots

  export let autoPauseOrbitControls: $$Props['autoPauseOrbitControls'] = true
  export let autoPauseTrackballControls: $$Props['autoPauseTrackballControls'] = true
  export let object: $$Props['object'] = undefined

  const { camera, renderer, invalidate, scene } = useThrelte()

  const { orbitControls, trackballControls } = useControlsContext()
  const isDragging = writable(false)
  const useAutoPauseOrbitControls = writable(autoPauseOrbitControls ?? true)
  $: useAutoPauseOrbitControls.set(autoPauseOrbitControls ?? true)
  const useAutoPauseTrackballControls = writable(autoPauseTrackballControls ?? true)
  $: useAutoPauseTrackballControls.set(autoPauseTrackballControls ?? true)

  const onDraggingChanged = (e: { value: boolean }) => {
    isDragging.set(e.value)
  }

  watch(
    [orbitControls, isDragging, useAutoPauseOrbitControls],
    ([orbitControls, isDragging, useAutoPauseOrbitControls]) => {
      // if there are no orbitcontrols or we're not even
      // dragging, or the orbitcontrols are disabled, return
      if (!orbitControls || (!orbitControls.enabled && isDragging)) return
      orbitControls.enabled = !(isDragging && useAutoPauseOrbitControls)
      return () => {
        // we know they were enabled before, so we can
        // safely re-enable them
        orbitControls.enabled = true
      }
    }
  )

  watch(
    [trackballControls, isDragging, useAutoPauseTrackballControls],
    ([trackballControls, isDragging, useAutoPausetrackballControls]) => {
      // if there are no trackballcontrols or we're not even
      // dragging, or the trackballcontrols are disabled, return
      if (!trackballControls || (!trackballControls.enabled && isDragging)) return
      trackballControls.enabled = !(isDragging && useAutoPausetrackballControls)
      return () => {
        // we know they were enabled before, so we can
        // safely re-enable them
        trackballControls.enabled = true
      }
    }
  )

  export const group = new Group()

  const controlsStore = derived(camera, (camera) => {
    return new TransformControls(camera, renderer.domElement)
  })

  export let controls = $controlsStore
  $: controls = $controlsStore

  const attachTo = writable(object ?? group)

  watch([controlsStore, attachTo], ([controls, attachTo]) => {
    controls.attach(attachTo)
    return () => {
      controls.detach()
    }
  })

  // This component is receiving the props for the controls as well as the props
  // for the group, so we need to split them up
  const transformOnlyPropNames = [
    'enabled',
    'axis',
    'mode',
    'translationSnap',
    'rotationSnap',
    'scaleSnap',
    'space',
    'size',
    'showX',
    'showY',
    'showZ',
    'visible'
  ]

  let transformProps: Props<TransformControls> = {}
  let objectProps: Props<Group> = {}

  $: {
    transformProps = {}
    objectProps = {}

    for (let [key, value] of Object.entries($$restProps)) {
      if (transformOnlyPropNames.includes(key)) {
        transformProps[key] = value
      } else {
        objectProps[key] = value
      }
    }
  }

  const component = forwardEventHandlers()
</script>

<!-- TransformControls need to be added to the scene -->
<HierarchicalObject
  onChildMount={(child) => {
    scene.add(child)
  }}
  onChildDestroy={(child) => {
    scene.remove(child)
  }}
>
  <T
    is={$controlsStore}
    on:dragging-changed={onDraggingChanged}
    on:change={invalidate}
    {...transformProps}
    bind:this={$component}
  />
</HierarchicalObject>

<T
  is={group}
  let:ref
  {...objectProps}
>
  <slot {ref} />
</T>
