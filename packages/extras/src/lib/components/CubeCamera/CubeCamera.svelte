<script lang="ts">
  import { CubeCamera, Group, WebGLCubeRenderTarget } from 'three'
  import { T, useTask, useThrelte } from '@threlte/core'
  import type { CubeCameraProps } from './CubeCamera'

  let {
    frames = Infinity,
    resolution = 256,
    near = 0.1,
    far = 1000,
    background = 'auto',
    fog = 'auto',
    children,
    ref = $bindable(new Group()),
    ...props
  }: CubeCameraProps = $props()

  const renderTarget = $derived(new WebGLCubeRenderTarget(resolution))
  const camera = $derived(new CubeCamera(near, far, renderTarget))

  $effect(() => {
    renderTarget
    return () => {
      // fbo may reference `this` in dispose
      renderTarget.dispose()
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
      scene.background = background === 'auto' ? originalBackground : background
      scene.fog = fog === 'auto' ? originalFog : fog
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
    {@render children?.({ ref, renderTarget })}
  </T>
</T>
