<script lang="ts">
  import { HierarchicalObject, T, useThrelte, watch, type Props } from '@threlte/core'

  import { Group } from 'three'
  import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'
  import { writable } from 'svelte/store'
  import { useControlsContext } from '../useControlsContext'
  import type {
    TransformControlsEvents,
    TransformControlsProps,
    TransformControlsSlots
  } from './TransformControls.svelte'

  type $$Props = TransformControlsProps
  type $$Events = TransformControlsEvents
  type $$Slots = TransformControlsSlots

  let {
    autoPauseOrbitControls = true,
    autoPauseTrackballControls = true,
    object,
    controls = $bindable(),
    group = $bindable(),
    ...props
  }: TransformControlsProps = $props()

  const { camera, renderer, invalidate, scene } = useThrelte()

  const { orbitControls, trackballControls } = useControlsContext()
  const isDragging = writable(false)
  const useAutoPauseOrbitControls = writable(autoPauseOrbitControls ?? true)
  $effect.pre(() => useAutoPauseOrbitControls.set(autoPauseOrbitControls ?? true))

  const useAutoPauseTrackballControls = writable(autoPauseTrackballControls ?? true)
  $effect.pre(() => useAutoPauseTrackballControls.set(autoPauseTrackballControls ?? true))

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

  group = new Group()

  controls = new TransformControls($camera, renderer.domElement)
  $effect.pre(() => {
    controls = new TransformControls($camera, renderer.domElement)
  })

  $effect.pre(() => {
    controls?.attach(object ?? group)
    return () => controls?.detach()
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

  $effect.pre(() => {
    transformProps = {}
    objectProps = {}

    for (let [key, value] of Object.entries(props)) {
      if (transformOnlyPropNames.includes(key)) {
        transformProps[key] = value
      } else {
        objectProps[key] = value
      }
    }
  })
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
    is={controls}
    on:dragging-changed={(e) => {
      onDraggingChanged(e)
      props.$$events?.['dragging-changed']?.()
    }}
    on:change={() => {
      invalidate()
      props.$$events?.change?.()
    }}
    on:objectChange={props.$$events?.objectChange}
    on:mouseDown={props.$$events?.mouseDown}
    on:mouseUp={props.$$events?.mouseUp}
    {...transformProps}
  />
</HierarchicalObject>

<T
  is={group}
  let:ref
  {...objectProps}
>
  <slot {ref} />
</T>
