<script
  module
  lang="ts"
>
  import { T, useTask, useParent, useThrelte, isInstanceOf } from '@threlte/core'
  import {
    Box3,
    Matrix4,
    Quaternion,
    Raycaster,
    Sphere,
    Spherical,
    Vector2,
    Vector3,
    Vector4,
    type PerspectiveCamera
  } from 'three'
  import type { CameraControlsProps } from './types.js'
  import CameraControls from 'camera-controls'
  import { useControlsContext } from '../controls/useControlsContext.js'
  import { untrack } from 'svelte'

  export { default as CameraControlsRef } from 'camera-controls'

  let installed = false

  const install = () => {
    if (installed) {
      return
    }

    CameraControls.install({
      THREE: {
        Vector2,
        Vector3,
        Vector4,
        Quaternion,
        Matrix4,
        Spherical,
        Box3,
        Sphere,
        Raycaster
      }
    })

    installed = true
  }
</script>

<script lang="ts">
  install()

  let {
    ref = $bindable(),
    camera: userCamera,
    pointerLock = false,
    pointerLockSensitivity = 0.003,
    children,
    ...rest
  }: CameraControlsProps = $props()

  const { dom, camera: defaultCamera, invalidate } = useThrelte()
  const { cameraControls } = useControlsContext()
  const parent = useParent()

  const camera = $derived.by(() => {
    if (userCamera) {
      return userCamera
    }

    if (isInstanceOf($parent, 'PerspectiveCamera') || isInstanceOf($parent, 'OrthographicCamera')) {
      return $parent
    }

    return $defaultCamera as PerspectiveCamera
  })

  const controls = new CameraControls(
    untrack(() => camera),
    dom
  )

  $effect.pre(() => {
    controls.camera = camera
  })

  $effect.pre(() => {
    cameraControls.set(controls)
    return () => {
      cameraControls.set(undefined)
    }
  })

  useTask(
    (delta) => {
      if (!controls.enabled) {
        return
      }

      if (controls.update(delta)) {
        invalidate()
      }
    },
    {
      autoInvalidate: false
    }
  )

  $effect(() => {
    if (!pointerLock) return

    const savedButtons = { ...controls.mouseButtons }
    controls.mouseButtons.left = CameraControls.ACTION.NONE
    controls.mouseButtons.middle = CameraControls.ACTION.NONE
    controls.mouseButtons.right = CameraControls.ACTION.NONE

    let locked = false

    const onLockChange = () => {
      locked = document.pointerLockElement === dom
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!locked) return
      controls.rotate(
        -event.movementX * pointerLockSensitivity,
        -event.movementY * pointerLockSensitivity,
        false
      )
      invalidate()
    }

    const onClick = () => {
      if (document.pointerLockElement !== dom) {
        dom.requestPointerLock()
      }
    }

    dom.addEventListener('click', onClick)
    document.addEventListener('pointerlockchange', onLockChange)
    document.addEventListener('pointermove', onPointerMove)

    return () => {
      dom.removeEventListener('click', onClick)
      document.removeEventListener('pointerlockchange', onLockChange)
      document.removeEventListener('pointermove', onPointerMove)
      if (document.pointerLockElement === dom) document.exitPointerLock()
      controls.mouseButtons.left = savedButtons.left
      controls.mouseButtons.middle = savedButtons.middle
      controls.mouseButtons.right = savedButtons.right
    }
  })
</script>

<T
  is={controls}
  bind:ref
  {...rest}
>
  {@render children?.({ ref: controls })}
</T>
