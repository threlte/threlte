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
  import { useSuspense } from '../../../suspense/useSuspense.svelte.js'
  import { useEnvironment } from '../utils/useEnvironment.svelte.js'
  import type { CubeEnvironmentProps } from './types.js'

  let { isBackground = false, scene, texture = $bindable(), urls }: CubeEnvironmentProps = $props()

  const { scene: defaultScene } = useThrelte()
  const suspend = useSuspense()

  useEnvironment(
    () => scene ?? defaultScene,
    () => texture,
    () => isBackground
  )

  const isHDR = $derived(urls?.[0]?.endsWith('hdr') ?? false)

  const loader = $derived.by(() => {
    if (urls === undefined) return

    if (isHDR) {
      loaders.hdr ??= new HDRCubeTextureLoader()
      return loaders.hdr
    }

    loaders.tex ??= new CubeTextureLoader()
    return loaders.tex
  })

  $effect(() => {
    if (urls === undefined || loader === undefined) {
      return
    }

    const suspendedTexture = suspend(loader.loadAsync(urls))

    suspendedTexture.then((t) => {
      texture = t
    })

    return () => {
      suspendedTexture.then((texture) => {
        texture.dispose()
      })
    }
  })
</script>
