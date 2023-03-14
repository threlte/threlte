<script lang="ts">
  import {
    forwardEvents,
    HierarchicalObject,
    T,
    useThrelte,
    watch,
    type Props
  } from '@threlte/core'
  import { omit, pick } from 'lodash'
  import { derived, writable } from 'svelte/store'
  import { Group } from 'three'
  import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
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
  export let object: $$Props['object'] = undefined

  const { camera, renderer, invalidate, scene } = useThrelte()

  const { orbitControls } = useControlsContext()
  const isDragging = writable(false)
  const useAutoPauseOrbitControls = writable(autoPauseOrbitControls) ?? true
  $: useAutoPauseOrbitControls.set(autoPauseOrbitControls ?? true)

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

  if (!renderer) {
    throw new Error(
      'TransformControls: renderer is undefined, is this component a child of <Canvas>?'
    )
  }

  export const group = new Group()
  export const controls = derived(camera, (camera) => {
    return new TransformControls(camera, renderer.domElement)
  })

  const attachTo = writable(object ?? group)

  watch([controls, attachTo], ([controls, attachTo]) => {
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

  $: transformProps = pick($$restProps, transformOnlyPropNames) as Props<TransformControls>
  $: objectProps = omit($$restProps, transformOnlyPropNames) as Props<Group>

  const component = forwardEvents()
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
    is={$controls}
    on:dragging-changed={onDraggingChanged}
    on:change={invalidate}
    {...transformProps}
    bind:this={$component}
  />
</HierarchicalObject>

<T is={group} let:ref {...objectProps}>
  <slot {ref} />
</T>
