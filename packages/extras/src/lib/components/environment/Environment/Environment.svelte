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
  import { useEnvironment } from '../utils/useEnvironment.svelte.js'
  import type { EquirectangularEnvironmentProps } from './types.js'
  import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js'

  let {
    skybox = $bindable(),
    texture,
    ground = false,
    isBackground = false,
    scene,
    url
  }: EquirectangularEnvironmentProps = $props()

  const { scene: defaultScene } = useThrelte()

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

  const tex = $derived(texture ?? (await loader.loadAsync(url)))

  $effect.pre(() => {
    tex.mapping = EquirectangularReflectionMapping
  })

  $effect(() => {
    return () => {
      tex.dispose()
    }
  })

  useEnvironment(
    () => scene ?? defaultScene,
    () => tex,
    () => isBackground
  )
</script>

{#if ground}
  {@const options = ground === true ? {} : ground}
  {#if tex}
    <T
      is={GroundedSkybox}
      bind:ref={skybox}
      args={[tex, options.height ?? 1, options.radius ?? 1, options.resolution ?? 128]}
    />
  {/if}
{/if}
