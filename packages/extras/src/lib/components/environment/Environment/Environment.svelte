<script
  lang="ts"
  module
>
  const loaders: {
    exr?: EXRLoader
    hdr?: RGBELoader
    tex?: TextureLoader
  } = {}
</script>

<script lang="ts">
  import { T, useCache, useThrelte } from '@threlte/core'
  import { EquirectangularReflectionMapping, TextureLoader } from 'three'
  import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
  import { GroundedSkybox } from 'three/examples/jsm/objects/GroundedSkybox.js'
  import { useSuspense } from '../../../suspense/useSuspense.js'
  import { useEnvironment } from '../utils/useEnvironment.svelte.js'
  import type { EquirectangularEnvironmentProps } from './types.js'

  const ctx = useThrelte()

  let {
    skybox = $bindable(),
    texture = $bindable(),
    ground = false,
    isBackground = false,
    scene = ctx.scene,
    url
  }: EquirectangularEnvironmentProps = $props()

  const suspend = useSuspense()
  const cache = useCache()

  useEnvironment({
    get scene() {
      return scene
    },
    get isBackground() {
      return isBackground
    },
    get texture() {
      return texture
    }
  })

  const isEXR = $derived(url?.endsWith('exr') ?? false)
  const isHDR = $derived(url?.endsWith('hdr') ?? false)

  // defaults to `TextureLoader` if `url` is not provided
  const loader = $derived.by(() => {
    if (url === undefined) return
    if (isEXR) {
      loaders.exr ??= new EXRLoader()
      return loaders.exr
    } else if (isHDR) {
      loaders.hdr ??= new RGBELoader()
      return loaders.hdr
    }
    loaders.tex ??= new TextureLoader()
    return loaders.tex
  })

  $effect.pre(() => {
    if (url === undefined || loader === undefined) {
      return
    }

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
  })
</script>

{#if ground}
  {@const options = ground === true ? {} : ground}
  {#if texture}
    <T
      is={GroundedSkybox}
      bind:ref={skybox}
      args={[texture, options.height ?? 1, options.radius ?? 1, options.resolution ?? 128]}
    />
  {/if}
{/if}
