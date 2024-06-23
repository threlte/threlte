<script lang="ts">
  import { T } from '@threlte/core'
  import type { GLTF as ThreeGLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
  import { useGltf } from '../../hooks/useGltf'
  import { useSuspense } from '../../suspense/useSuspense'
  import type { ThrelteGltf } from '../../types/types'
  import type { GltfProps } from './GLTF.svelte.js'

  type AnyThrelteGltf = ThrelteGltf<{
    nodes: Record<string, any>
    materials: Record<string, any>
  }>

  type Props = GltfProps & { gltf?: AnyThrelteGltf } & AnyThrelteGltf['materials'] & ThreeGLTF

  let {
    url,
    useDraco = false,
    useMeshopt = false,
    ktxTranscoderPath,
    gltf = $bindable(),
    scene = $bindable(),
    animations = $bindable(),
    asset = $bindable(),
    cameras = $bindable(),
    scenes = $bindable(),
    userData = $bindable(),
    parser = $bindable(),
    materials = $bindable(),
    nodes = $bindable(),
    onload,
    onunload,
    onerror,
		children,
    ...props
  }: Props = $props()

  const loader = useGltf({
    useDraco: useDraco
      ? typeof useDraco === 'string'
        ? useDraco
        : 'https://www.gstatic.com/draco/v1/decoders/'
      : undefined,
    useMeshopt,
    ktxTranscoderPath
  })

  const onLoad = (data: AnyThrelteGltf) => {
    if (gltf) onunload?.()

    gltf = data
    scene = data.scene
    animations = data.animations
    asset = data.asset
    cameras = data.cameras
    scenes = data.scenes
    userData = data.userData
    parser = data.parser
    materials = data.materials
    nodes = data.nodes

    onload?.(gltf)
  }

  const onError = (error: Error) => {
    gltf = undefined
    scene = undefined!
    animations = undefined!
    asset = undefined!
    cameras = undefined!
    scenes = undefined!
    userData = undefined!
    parser = undefined!
    nodes = undefined
    materials = undefined
    onerror?.(error)
  }

  const suspend = useSuspense()

  const loadGltf = async (url: string) => {
    try {
      const model = await suspend(loader.load(url))
      onLoad(model)
    } catch (error) {
      onError(error as Error)
    }
  }

  $effect.pre(() => {
    loadGltf(url)
  })
</script>

{#if scene}
  <T
    is={scene}
    {...props}
  >
		{@render children?.({ ref: scene })}
  </T>
{/if}
