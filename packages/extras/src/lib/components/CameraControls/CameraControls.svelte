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

  let { ref = $bindable(), camera: userCamera, children, ...rest }: CameraControlsProps = $props()

  const { dom, camera: defaultCamera, invalidate } = useThrelte()
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
  // svelte-ignore state_referenced_locally
  const controls = new CameraControls(camera, dom)
  $effect.pre(() => {
    controls.camera = camera
  })

  useTask(
    (delta) => {
      if (controls.update(delta)) {
        invalidate()
      }
    },
    { autoInvalidate: false }
  )
</script>

<T
  is={controls}
  bind:ref
  {...rest}
>
  {@render children?.({ ref: controls })}
</T>
