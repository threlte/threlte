<script lang="ts">
  import { LumaSplatsThree } from '@lumaai/luma-web'
  import { T, asyncWritable, useCache, useTask, useThrelte } from '@threlte/core'
  import { useSuspense } from '@threlte/extras'
  import type { CubeTexture } from 'three'
  import type { LumaSplatsThreeProps } from './types'

  let {
    source,
    mode = 'object',
    loadingAnimationEnabled = false,
    particleRevealEnabled = false,
    enableThreeShaderIntegration = true,
    children,
    ...rest
  }: LumaSplatsThreeProps = $props()

  const { invalidate, renderer, scene } = useThrelte()

  const { remember } = useCache()
  const suspend = useSuspense()

  const captureCubemap = mode === 'env' || mode === 'object-env'

  const splats = suspend(
    asyncWritable(
      remember(() => {
        return new Promise<[LumaSplatsThree, CubeTexture | undefined]>((resolve) => {
          const splats = new LumaSplatsThree({
            source,
            loadingAnimationEnabled,
            particleRevealEnabled,
            enableThreeShaderIntegration
          })

          splats.onLoad = async () => {
            if (captureCubemap) {
              splats.captureCubemap(renderer).then((cubemap) => {
                resolve([splats, cubemap])
              })
            } else {
              resolve([splats, undefined])
            }
          }
        })
      }, [source])
    )
  )

  let preheat =
    particleRevealEnabled && loadingAnimationEnabled ? 400 : loadingAnimationEnabled ? 100 : 10
  let frame = 0

  let running = $state(false)
  useTask(
    () => {
      frame++
      if (frame >= preheat) {
        running = false
        frame = 0
      }
    },
    { running: () => running }
  )

  $effect(() => {
    if (!$splats?.[1]) {
      return
    }

    const previousEnvironment = scene.environment
    const previousBackground = scene.background
    const previousBackgroundBluriness = scene.backgroundBlurriness

    scene.environment = $splats[1]
    scene.background = $splats[1]
    scene.backgroundBlurriness = 0.5

    invalidate()

    return () => {
      scene.environment = previousEnvironment
      scene.background = previousBackground
      scene.backgroundBlurriness = previousBackgroundBluriness ?? 0
      invalidate()
    }
  })
</script>

{#if (mode === 'object' || mode === 'object-env') && $splats && $splats[0]}
  <T
    is={$splats[0]}
    oncreate={() => {
      running = true
    }}
    {...rest}
    dispose={false}
  >
    {@render children?.({ ref: $splats[0] })}
  </T>
{/if}
