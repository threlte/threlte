<script
  lang="ts"
  module
>
  const loaders: {
    hdr?: HDRCubeTextureLoader
    tex?: CubeTextureLoader
  } = {}
</script>

<script lang="ts">
  import { observe, T, useCache, useThrelte } from '@threlte/core'
  import type { Scene } from 'three'
  import { CubeTextureLoader } from 'three'
  import { GroundedSkybox, HDRCubeTextureLoader } from 'three/examples/jsm/Addons.js'
  import { useSuspense } from '../../suspense/useSuspense'
  import type { CubeEnvironmentProps } from './types'

  let {
    ground = false,
    isBackground = false,
    scene,
    skybox = $bindable(),
    texture = $bindable(),
    urls
  }: CubeEnvironmentProps = $props()

  const cache = useCache()
  const suspend = useSuspense()
  const { invalidate, scene: defaultScene } = useThrelte()

  const _scene = $derived(scene ?? defaultScene)

  // save lastScene and restore when scene changes and on unmount
  $effect(() => {
    const last = _scene
    const background = last.background
    const environment = last.environment
    return () => {
      last.background = background
      last.environment = environment
    }
  })

  let background: Scene['background'] | undefined = $state()
  let environment: Scene['environment'] | undefined = $state()

  observe(
    () => [_scene],
    ([scene]) => {
      background = scene.background
      environment = scene.environment
    }
  )

  $effect(() => {
    if (isBackground && texture !== undefined) {
      _scene.background = texture
      invalidate()
      return () => {
        if (background !== undefined) {
          _scene.background = background
          invalidate()
        }
      }
    }
  })

  $effect(() => {
    if (texture !== undefined) {
      _scene.environment = texture
      invalidate()
      return () => {
        if (environment !== undefined) {
          _scene.environment = environment
          invalidate()
        }
      }
    }
  })

  const first = $derived(urls?.[0])
  const firstIsHDR = $derived(first?.endsWith('hdr') ?? false)

  const loader = $derived.by(() => {
    if (!urls) return
    if (firstIsHDR) {
      loaders.hdr ??= new HDRCubeTextureLoader()
      return loaders.hdr
    } else {
      loaders.tex ??= new CubeTextureLoader()
      return loaders.tex
    }
  })

  $effect(() => {
    if (urls && loader) {
      const suspendedTexture = suspend(
        cache.remember(() => {
          return loader.loadAsync(urls)
        }, urls)
      )

      suspendedTexture.then((t) => {
        texture = t
      })

      return () => {
        suspendedTexture.then((texture) => {
          texture.dispose()
        })
      }
    }
  })
</script>

{#if ground !== false}
  {@const options = ground === true ? {} : ground}
  {#if texture !== undefined}
    {@const args = [texture, options.height ?? 1, options.radius ?? 1, options.resolution ?? 128]}
    <T
      oncreate={() => {
        return () => {
          skybox = undefined
        }
      }}
      is={GroundedSkybox}
      bind:ref={skybox}
      {args}
    />
  {/if}
{/if}
