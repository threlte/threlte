<script
  lang="ts"
  module
>
  const loaderCache: CubeEnvironmentCache = {}
</script>

<script lang="ts">
  import type { CubeEnvironmentCache, CubeEnvironmentProps } from './types'
  import type { CubeTexture, Scene } from 'three'
  import { CubeTextureLoader } from 'three'
  import { GroundedSkybox, HDRCubeTextureLoader } from 'three/examples/jsm/Addons.js'
  import { observe, T, useThrelte } from '@threlte/core'
  import { useSuspense } from '../../suspense/useSuspense'

  let {
    ground = false,
    isBackground = false,
    loadOptions = {},
    loaderOptions = {},
    scene,
    skybox = $bindable(),
    texture = $bindable(),
    urls
  }: CubeEnvironmentProps = $props()

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

  // will default to `CubeTextureLoader` if `url`  is undefined
  const loader = $derived.by(() => {
    let loader = (loaderCache.tex ??= new CubeTextureLoader())
    if (firstIsHDR) {
      loader = loaderCache.hdr ??= new HDRCubeTextureLoader()
    }
    return loaderOptions.extend?.(loader) ?? loader
  })

  const suspend = useSuspense()

  $effect(() => {
    if (urls !== undefined) {
      const suspendedTexture = suspend(
        new Promise<CubeTexture>((resolve, reject) => {
          loader.load(
            urls,
            (texture) => {
              resolve(loadOptions?.transform?.(texture) ?? texture)
            },
            loadOptions?.onProgress,
            reject
          )
        })
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
