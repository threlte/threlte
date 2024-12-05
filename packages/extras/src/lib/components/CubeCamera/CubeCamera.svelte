<script lang="ts">
  import { isInstanceOf, observe, T, useTask, useThrelte } from '@threlte/core'
  import { CubeCamera, Group, WebGLCubeRenderTarget } from 'three'
  import type { CubeCameraProps } from './types'
  import { onDestroy } from 'svelte'

  let {
    background = 'auto',
    far = 1000,
    fog = 'auto',
    frames = Infinity,
    near = 0.1,
    onrenderstart,
    onrenderstop,
    resolution = 256,
    children,
    ref = $bindable(),
    ...props
  }: CubeCameraProps = $props()

  export const renderTarget = new WebGLCubeRenderTarget(resolution)
  observe.pre(
    () => [resolution],
    () => {
      renderTarget.setSize(resolution, resolution)
    }
  )

  onDestroy(() => {
    renderTarget.dispose()
  })

  export const camera = new CubeCamera(near, far, renderTarget)

  observe.pre(
    () => [near, far],
    () => {
      camera.children.forEach((child) => {
        if (isInstanceOf(child, 'PerspectiveCamera')) {
          child.far = far
          child.near = near
          child.updateProjectionMatrix()
        }
      })
    }
  )

  const { renderer, scene } = useThrelte()

  const group = new Group()
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
        onrenderstop?.()
      }
    },
    { autoStart: false }
  )

  export const restart = () => {
    if ($started) {
      stop()
      onrenderstop?.()
    }
    count = 0
    start()
    onrenderstart?.()
  }

  // if any of these props update, the task will need to be restarted
  observe.pre(() => [background, far, near, fog, frames, resolution], restart)
</script>

<T
  is={group}
  bind:ref
  {...props}
>
  <T is={camera} />
  <T is={inner}>
    {@render children?.({ camera, ref: group, renderTarget, restart })}
  </T>
</T>
