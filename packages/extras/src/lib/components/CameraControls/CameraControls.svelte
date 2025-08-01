<script
  module
  lang="ts"
>
  import CC from 'camera-controls'

  export { default as CameraControlsRef } from 'camera-controls'

  let installed = false

  const install = () => {
    if (installed) {
      return
    }

    CC.install({
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
  import {
    T,
    useTask,
    useParent,
    useThrelte,
    type Props as ThrelteProps,
    isInstanceOf
  } from '@threlte/core'
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

  install()

  interface Props extends ThrelteProps<CC> {
    ref?: CC
  }

  let { ref = $bindable(), camera: userCamera, children, ...rest }: Props = $props()

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

  const controls = new CC(camera, dom)
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
