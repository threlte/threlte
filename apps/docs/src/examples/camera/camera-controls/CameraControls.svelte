<script
  context="module"
  lang="ts"
>
  import { T, useTask, useParent, useThrelte, type Props } from '@threlte/core'
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
    type PerspectiveCamera,
    MathUtils
  } from 'three'
  import CameraControls from 'camera-controls'

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
</script>

<script lang="ts">
  interface CameraControlsProps extends Props<CameraControls> {
    ref: CameraControls
    autoRotate?: boolean
    autoRotateSpeed?: number
  }

  let {
    autoRotate = false,
    autoRotateSpeed = 1,
    ref = $bindable(),
    ...props
  }: CameraControlsProps = $props()

  const parent = useParent()

  if (!$parent) {
    throw new Error('CameraControls must be a child of a ThreeJS camera')
  }

  const { renderer, invalidate } = useThrelte()

  const controls = new CameraControls($parent as PerspectiveCamera, renderer.domElement)

  let disableAutoRotate = false

  useTask(
    (delta) => {
      if (autoRotate && !disableAutoRotate) {
        controls.azimuthAngle += 4 * delta * MathUtils.DEG2RAD * autoRotateSpeed
      }
      const updated = controls.update(delta)
      if (updated) invalidate()
    },
    {
      autoInvalidate: false
    }
  )
</script>

<T
  is={controls}
  bind:ref
  oncontrolstart={() => {
    disableAutoRotate = true
  }}
  onzoom={(event) => {
    console.log('zoomstart', event)
  }}
  oncontrolend={() => {
    disableAutoRotate = false
  }}
  {...props}
>
  <slot {ref} />
</T>
