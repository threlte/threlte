<script lang="ts">
  import { LumaSplatsThree, type LumaSplatsSource } from '@lumaai/luma-web'
  import { T, asyncWritable, useCache, useTask, useThrelte } from '@threlte/core'
  import { useSuspense } from '@threlte/extras'
  import { onDestroy } from 'svelte'
  import type { CubeTexture, Scene } from 'three'

  export let source: LumaSplatsSource
  export let mode: 'object' | 'object-env' | 'env' = 'object'
  export let loadingAnimationEnabled = false
  export let particleRevealEnabled = false
  export let enableThreeShaderIntegration = true

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
  const { start, stop } = useTask(
    () => {
      frame++
      if (frame >= preheat) {
        stop()
        frame = 0
      }
    },
    { autoStart: false }
  )

  let previousEnvironment: Scene['environment']
  let previousBackground: Scene['background']
  let previousBackgroundBluriness: Scene['backgroundBlurriness']
  $: if ($splats && $splats[1]) {
    previousEnvironment = scene.environment
    previousBackground = scene.background
    previousBackgroundBluriness = scene.backgroundBlurriness
    scene.environment = $splats[1]
    scene.background = $splats[1]
    scene.backgroundBlurriness = 0.5
    invalidate()
  }

  onDestroy(() => {
    if (captureCubemap) {
      scene.environment = previousEnvironment
      scene.background = previousBackground
      scene.backgroundBlurriness = previousBackgroundBluriness
      invalidate()
    }
  })
</script>

{#if (mode === 'object' || mode === 'object-env') && $splats && $splats[0]}
  <T
    dispose={false}
    is={$splats[0]}
    oncreate={() => {
      start()
    }}
    {...$$restProps}
  >
    <slot ref={$splats[0]} />
  </T>
{/if}
