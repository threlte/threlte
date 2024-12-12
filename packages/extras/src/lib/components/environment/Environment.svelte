<script
  lang="ts"
  module
>
  const loaders: { exr?: EXRLoader; hdr?: RGBELoader; tex?: TextureLoader } = {}
</script>

<script lang="ts">
  import { observe, T, useCache, useThrelte } from '@threlte/core'
  import { EquirectangularReflectionMapping, Scene, TextureLoader } from 'three'
  import { EXRLoader, GroundedSkybox, RGBELoader } from 'three/examples/jsm/Addons.js'
  import { useSuspense } from '../../suspense/useSuspense'
  import type { EquirectangularEnvironmentProps } from './types'

  let {
    ground = false,
    isBackground = false,
    scene,
    skybox = $bindable(),
    texture = $bindable(),
    url
  }: EquirectangularEnvironmentProps = $props()

  const suspend = useSuspense()
  const cache = useCache()
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
        // background is allowed to be `null`
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
        // environment is allowed to be `null`
        if (environment !== undefined) {
          _scene.environment = environment
          invalidate()
        }
      }
    }
  })

  const isEXR = $derived(url?.endsWith('exr') ?? false)
  const isHDR = $derived(url?.endsWith('hdr') ?? false)

  // defaults to `TextureLoader` if `url` is not provided
  const loader = $derived.by(() => {
    if (!url) return
    if (isEXR) {
      loaders.exr ??= new EXRLoader()
      return loaders.exr
    } else if (isHDR) {
      loaders.hdr ??= new RGBELoader()
      return loaders.hdr
    } else {
      loaders.tex ??= new TextureLoader()
      return loaders.tex
    }
  })

  $effect(() => {
    if (url && loader) {
      const suspendedTexture = suspend(
        cache.remember(() => {
          return loader.loadAsync(url)
        }, [url])
      )

      suspendedTexture.then((t) => {
        t.mapping = EquirectangularReflectionMapping
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
