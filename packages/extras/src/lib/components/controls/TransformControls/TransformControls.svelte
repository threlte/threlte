<script lang="ts">
  import {
    HierarchicalObject,
    T,
    currentWritable,
    useThrelte,
    watch,
    type Props
  } from '@threlte/core'
  import { Group } from 'three'
  import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'
  import { writable } from 'svelte/store'
  import { useControlsContext } from '../useControlsContext'
  import type { TransformControlsProps } from './TransformControls.svelte'

  let {
    autoPauseOrbitControls = true,
    autoPauseTrackballControls = true,
    object,
    controls = $bindable(),
    group = $bindable(),
    children,
    ...props
  }: TransformControlsProps = $props()

  const { camera, renderer, invalidate, scene } = useThrelte()

  const { orbitControls, trackballControls } = useControlsContext()
  const isDragging = currentWritable(false)
  const useAutoPauseOrbitControls = writable(autoPauseOrbitControls ?? true)
  $effect.pre(() => useAutoPauseOrbitControls.set(autoPauseOrbitControls ?? true))

  const useAutoPauseTrackballControls = writable(autoPauseTrackballControls ?? true)
  $effect.pre(() => useAutoPauseTrackballControls.set(autoPauseTrackballControls ?? true))

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

  const attachGroup = new Group()

  let transformControls = $derived(new TransformControls($camera, renderer.domElement))

  $effect.pre(() => {
    transformControls?.attach(object ?? attachGroup)
    return () => transformControls?.detach()
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
    'visible',
    'onmouseDown',
    'onmouseUp',
    'onobjectChange'
  ]

  let transformProps: Props<TransformControls> = $state({})
  let objectProps: Props<Group> = $state({})

  $effect.pre(() => {
    transformProps = {}
    objectProps = {}

    Object.keys(props).forEach((key) => {
      $effect.pre(() => {
        if (transformOnlyPropNames.includes(key)) {
          transformProps[key] = props[key]
        } else {
          objectProps[key] = props[key]
        }
      })
    })
  })

  const onchange = () => {
    invalidate()
    if (transformControls.dragging && !isDragging.current) {
      isDragging.set(true)
    } else if (!transformControls.dragging && isDragging.current) {
      isDragging.set(false)
    }
    props.onchange?.()
  }
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
    is={transformControls}
    bind:ref={controls}
    {onchange}
    {...transformProps}
  />
</HierarchicalObject>

<T
  is={attachGroup}
  bind:ref={group}
  {...objectProps}
>
	{#if children}
		{@render children({ref:attachGroup})}
	{/if}
</T>
