<script lang="ts">
  import type { CubeCameraProps } from './CubeCamera.svelte'
  import { CubeCamera, Group, HalfFloatType, WebGLCubeRenderTarget } from 'three'
  import { T, useTask, useThrelte } from '@threlte/core'

  let {
    frames = Infinity,
    resolution = 256,
    near = 0.1,
    far = 1000,
    envMap,
    fog,
    children,
    ref = $bindable(new Group()),
    ...props
  }: CubeCameraProps = $props()

  const fbo = new WebGLCubeRenderTarget(1, { type: HalfFloatType })

  let camera = $derived(new CubeCamera(near, far, fbo))

  $effect.pre(() => {
    // calls this.dispose
    fbo.setSize(resolution, resolution)
  })

  $effect(() => {
    return () => {
      // fbo may reference `this` in dispose
      fbo.dispose()
    }
  })

  const { renderer, scene } = useThrelte()

  const inner = new Group()

  let count = 0
  const { stop } = useTask(() => {
    if (count < frames) {
      inner.visible = false
      const originalFog = scene.fog
      const originalBackground = scene.background
      scene.background = envMap ?? originalBackground
      scene.fog = fog ?? originalFog
      camera.update(renderer, scene)
      scene.background = originalBackground
      scene.fog = originalFog
      inner.visible = true
      count += 1
    } else {
      stop()
      count = 0
    }
  })
</script>

<T
  is={ref}
  {...props}
>
  <T is={camera} />
  <T is={inner}>
    {@render children({ ref, fbo })}
  </T>
</T>
