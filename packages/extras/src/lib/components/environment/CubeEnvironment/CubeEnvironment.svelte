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
  import { useThrelte } from '@threlte/core'
  import { CubeTextureLoader } from 'three'
  import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader.js'
  import { useEnvironment } from '../utils/useEnvironment.svelte.js'
  import type { CubeEnvironmentProps } from './types.js'

  let { isBackground = false, scene, texture = $bindable(), urls }: CubeEnvironmentProps = $props()

  let {
    isBackground = false,
    isEnvironment = true,
    scene = ctx.scene,
    texture = $bindable(),
    urls
  }: CubeEnvironmentProps = $props()

  useEnvironment(
    () => scene ?? defaultScene,
    () => texture,
    () => isBackground
  )

  useEnvironment(
    () => scene,
    () => texture,
    () => isBackground,
    () => isEnvironment
  )

  const first = $derived(urls?.[0])
  const firstIsHDR = $derived(first?.endsWith('hdr') ?? false)

  const loader = $derived.by(() => {
    if (urls === undefined) return

    if (isHDR) {
      loaders.hdr ??= new HDRCubeTextureLoader()
      return loaders.hdr
    }

    loaders.tex ??= new CubeTextureLoader()
    return loaders.tex
  })

  const tex = $derived(urls ? await loader?.loadAsync(urls) : undefined)

  $effect.pre(() => {
    texture = tex
  })

  $effect(() => {
    return () => {
      tex?.dispose()
    }
  })
</script>
