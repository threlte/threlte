<script lang="ts">
  import { T } from '@threlte/core'
  import type { GLTF as ThreeGLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
  import { useGltf } from '../../hooks/useGltf'
  import { useSuspense } from '../../suspense/useSuspense'
  import type { ThrelteGltf } from '../../types/types'
  import type { GltfEvents, GltfProps, GltfSlots } from './GLTF.svelte.js'

  type $$Events = GltfEvents
  type $$Slots = GltfSlots

  type AnyThrelteGltf = ThrelteGltf<{
    nodes: Record<string, any>
    materials: Record<string, any>
  }>

  type Props = GltfProps & { gltf?: AnyThrelteGltf } & AnyThrelteGltf['materials'] & ThreeGLTF

  let {
    url,
    draco,
    meshopt,
    ktx,
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
    ...props
  }: Props = $props()

  const loader = useGltf({
    draco,
    meshopt,
    ktx
  })

  const onLoad = (data: AnyThrelteGltf) => {
    if (gltf) props.$$events?.unload?.()

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

    props.$$events?.load?.(gltf)
  }

  const onError = (error: any) => {
    console.error(`Error loading GLTF: ${error.message}`)
    gltf = undefined
    scene = undefined
    animations = undefined
    asset = undefined
    cameras = undefined
    scenes = undefined
    userData = undefined
    parser = undefined
    nodes = undefined
    materials = undefined
    props.$$events?.error?.(error.message)
  }

  const suspend = useSuspense()

  const loadGltf = async (url: string) => {
    try {
      const model = await suspend(loader.load(url))
      onLoad(model)
    } catch (error: any) {
      onError(error)
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
    <slot ref={scene} />
  </T>
{/if}
