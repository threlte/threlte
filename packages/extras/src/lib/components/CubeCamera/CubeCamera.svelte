<script lang="ts">
  import type { CubeCameraProps } from './CubeCamera'
  import { CubeCamera, Group, WebGLCubeRenderTarget } from 'three'
  import { T, useTask, useThrelte } from '@threlte/core'
  import { untrack } from 'svelte'

  let {
    background = 'auto',
    far = 1000,
    fog = 'auto',
    frames = Infinity,
    near = 0.1,
    resolution = 256,
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
  const { start, stop, started } = useTask(
    () => {
      // if frames === Infinity, the task will run indefinitely
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
      }
    },
    { autoStart: false }
  )

  const restart = () => {
    if ($started) {
      stop()
    }
    count = 0
    start()
  }

  // if any of these props update, the task will need to be restarted
  $effect(() => {
    background
    far
    fog
    frames
    near
    resolution
    untrack(restart)
  })
</script>

<T
  is={ref}
  {...props}
>
  <T is={camera} />
  <T is={inner}>
    {@render children?.({ camera, ref, renderTarget, restart })}
  </T>
</T>
