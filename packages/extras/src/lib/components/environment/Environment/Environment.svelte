<script
  lang="ts"
  module
>
  const loaders: {
    exr?: EXRLoader
    hdr?: HDRLoader
    tex?: TextureLoader
  } = {}
</script>

<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { EquirectangularReflectionMapping, TextureLoader } from 'three'
  import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'
  import { GroundedSkybox } from 'three/examples/jsm/objects/GroundedSkybox.js'
  import { useSuspense } from '../../../suspense/useSuspense.svelte.js'
  import { useEnvironment } from '../utils/useEnvironment.svelte.js'
  import type { EquirectangularEnvironmentProps } from './types.js'
  import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js'

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

  useEnvironment(() => ({
    scene,
    isBackground,
    texture
  }))

  // defaults to `TextureLoader` if `url` is not provided
  const loader = $derived.by(() => {
    if (url === undefined) return

    if (url?.endsWith('exr')) {
      loaders.exr ??= new EXRLoader()
      return loaders.exr
    } else if (url?.endsWith('hdr')) {
      loaders.hdr ??= new HDRLoader()
      return loaders.hdr
    }

    loaders.tex ??= new TextureLoader()
    return loaders.tex
  })

  $effect.pre(() => {
    if (url === undefined || loader === undefined) {
      return
    }

    const suspendedTexture = suspend(loader.loadAsync(url))

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
