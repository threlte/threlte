<script lang="ts">
  import { T, useThrelte, type Props } from '@threlte/core'
  import { Group } from 'three'
  import {
    TransformControls,
    type TransformControlsEventMap
  } from 'three/examples/jsm/controls/TransformControls.js'
  import { useControlsContext } from '../useControlsContext.svelte.js'
  import type { TransformControlsProps } from './types.js'

  let {
    autoPauseControls = true,
    cameraControls: customCameraControls,
    object,
    controls = $bindable(),
    group = $bindable(),
    ref = $bindable(),
    children,
    ...props
  }: TransformControlsProps = $props()

  const { camera, dom, invalidate, scene } = useThrelte()

  const {
    orbitControls,
    trackballControls,
    cameraControls,
    transformControls: transformControlsContext
  } = useControlsContext()

  let isDragging = $state(false)

  const pauseWhileDragging = (getControls: () => { enabled: boolean } | undefined) => {
    $effect(() => {
      const controls = getControls()

      if (!controls || (!controls.enabled && isDragging)) return

      controls.enabled = !(isDragging && autoPauseControls)
      return () => {
        controls.enabled = true
      }
    })
  }

  pauseWhileDragging(() => customCameraControls)
  pauseWhileDragging(() => orbitControls.current)
  pauseWhileDragging(() => trackballControls.current)
  pauseWhileDragging(() => cameraControls.current)

  // `<HTML> sets canvas pointer-events to "none" if occluding, so events must be placed on the canvas parent.
  const transformControls = new TransformControls(camera.current, dom)
  const attachGroup = new Group()
  ref = attachGroup

  $effect(() => {
    transformControls.camera = camera.current
  })

  $effect.pre(() => {
    transformControls?.attach(object ?? attachGroup)
    return () => transformControls?.detach()
  })

  $effect(() => {
    transformControlsContext.set(transformControls)
    return () => {
      transformControlsContext.set(undefined)
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
    'visible',
    'onmouseDown',
    'onmouseUp',
    'onobjectChange'
  ]

  let transformProps = $state<Props<TransformControls>>({})
  let objectProps = $state<Props<Group>>({})

  $effect(() => {
    transformProps = {}
    objectProps = {}

    Object.keys(props).forEach((key) => {
      $effect(() => {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- upstream three TransformControls event type is wrong; revisit when fixed
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
    const target = scene.current
    target.add(helper)
    return () => {
      target.remove(helper)
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
