<script lang="ts">
  import { LumaSplatsThree } from '@lumaai/luma-web'
  import { T, useTask, useThrelte, useCache } from '@threlte/core'

  import type { CubeTexture } from 'three'
  import type { LumaSplatsThreeProps } from './types'
  import { CubeEnvironment } from '@threlte/extras'

  let {
    source,
    mode = 'object',
    loadingAnimationEnabled = false,
    particleRevealEnabled = false,
    enableThreeShaderIntegration = true,
    children,
    ...rest
  }: LumaSplatsThreeProps = $props()

  const { renderer, scene } = useThrelte()
  const { remember } = useCache()

  const captureCubemap = mode === 'env' || mode === 'object-env'

  const splats = await remember(typeof source === 'string' ? source : (source.src ?? ''), () => {
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
  })

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

  scene.backgroundBlurriness = 0.5
</script>

{#if (mode === 'object' || mode === 'object-env') && splats?.[0]}
  <T
    is={splats[0]}
    oncreate={() => {
      running = true
    }}
    {...rest}
    dispose={false}
  >
    {@render children?.({ ref: splats[0] })}
  </T>
{/if}

{#if splats[1]}
  <CubeEnvironment texture={splats[1]} />
{/if}
