<script lang="ts">
  import { T, observe, useThrelte, type Props } from '@threlte/core'
  import { Group } from 'three'
  import {
    TransformControls,
    type TransformControlsEventMap
  } from 'three/examples/jsm/controls/TransformControls.js'
  import { useControlsContext } from '../useControlsContext.js'
  import type { TransformControlsProps } from './types.js'

  let {
    autoPauseControls = true,
    autoPauseOrbitControls,
    autoPauseTrackballControls,
    cameraControls: customCameraControls,
    object,
    controls = $bindable(),
    group = $bindable(),
    children,
    ...props
  }: TransformControlsProps = $props()

  const { camera, dom, invalidate, scene } = useThrelte()

  const { orbitControls, trackballControls, cameraControls } = useControlsContext()

  let isDragging = $state(false)

  // Resolve effective pause state: deprecated per-control props take
  // precedence if explicitly set, otherwise fall back to autoPauseControls.
  const shouldPauseOrbit = $derived(autoPauseOrbitControls ?? autoPauseControls)
  const shouldPauseTrackball = $derived(autoPauseTrackballControls ?? autoPauseControls)
  const shouldPauseCamera = $derived(autoPauseControls)

  observe(
    () => [orbitControls, isDragging, shouldPauseOrbit],
    ([orbitControls, isDragging, shouldPause]) => {
      if (!orbitControls || (!orbitControls.enabled && isDragging)) return
      orbitControls.enabled = !(isDragging && shouldPause)
      return () => {
        orbitControls.enabled = true
      }
    }
  )

  observe(
    () => [trackballControls, isDragging, shouldPauseTrackball],
    ([trackballControls, isDragging, shouldPause]) => {
      if (!trackballControls || (!trackballControls.enabled && isDragging)) return
      trackballControls.enabled = !(isDragging && shouldPause)
      return () => {
        trackballControls.enabled = true
      }
    }
  )

  observe(
    () => [cameraControls, isDragging, shouldPauseCamera],
    ([cameraControls, isDragging, shouldPause]) => {
      if (!cameraControls || (!cameraControls.enabled && isDragging)) return
      cameraControls.enabled = !(isDragging && shouldPause)
      return () => {
        cameraControls.enabled = true
      }
    }
  )

  // Custom/third-party controls passed via the cameraControls prop
  observe(
    () => [customCameraControls, isDragging, autoPauseControls],
    ([controls, isDragging, shouldPause]) => {
      if (!controls || (!controls.enabled && isDragging)) return
      controls.enabled = !(isDragging && shouldPause)
      return () => {
        controls.enabled = true
      }
    }
  )

  // `<HTML> sets canvas pointer-events to "none" if occluding, so events must be placed on the canvas parent.
  const transformControls = new TransformControls(camera.current, dom)
  const attachGroup = new Group()

  $effect.pre(() => {
    transformControls.camera = camera.current
  })

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

  let transformProps = $state<Props<TransformControls>>({})
  let objectProps = $state<Props<Group>>({})

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

  const onchange = (event: TransformControlsEventMap['change']) => {
    invalidate()
    if (transformControls.dragging && !isDragging) {
      isDragging = true
    } else if (!transformControls.dragging && isDragging) {
      isDragging = false
    }
    // TODO: unfortunately the type of the event prop is not correct *yet*
    props.onchange?.(event as any)
  }
</script>

<!-- TransformControls need to be added to the scene -->
<T
  is={transformControls}
  bind:ref={controls}
  {onchange}
  {...transformProps}
  attach={({ ref }) => {
    const helper = ref.getHelper()
    scene.add(helper)
    return () => {
      scene.remove(helper)
    }
  }}
  dispose={false}
  oncreate={(ref) => {
    return () => ref.dispose()
  }}
/>

<T
  is={attachGroup}
  bind:ref={group}
  {...objectProps}
>
  {@render children?.({ ref: attachGroup })}
</T>
