<script
  lang="ts"
  module
>
  const defaultLoadOptions: UseLoaderLoadOptions<TextureLoader> = {
    transform(texture) {
      texture.mapping = EquirectangularReflectionMapping
      return texture
    }
  }
</script>

<script lang="ts">
  import type { EquirectangularEnvironmentProps } from './types'
  import type { UseLoaderLoadOptions } from '@threlte/core'
  import { EXRLoader, GroundedSkybox, RGBELoader } from 'three/examples/jsm/Addons.js'
  import { EquirectangularReflectionMapping, Scene, TextureLoader } from 'three'
  import { observe, T, useLoader, useThrelte } from '@threlte/core'
  import { useSuspense } from '../../suspense/useSuspense'

  let {
    ground = false,
    isBackground = false,
    loadOptions = defaultLoadOptions,
    loaderOptions = {},
    scene,
    skybox = $bindable(),
    texture = $bindable(),
    url
  }: EquirectangularEnvironmentProps = $props()

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
  const loader = $derived(
    useLoader(isHDR ? RGBELoader : isEXR ? EXRLoader : TextureLoader, loaderOptions)
  )

  const suspend = useSuspense()

  $effect(() => {
    if (url !== undefined) {
      const suspendedTexture = suspend(loader.load(url, loadOptions))

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
