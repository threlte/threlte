<script lang="ts">
  import { createRawEventDispatcher, forwardEventHandlers, T } from '@threlte/core'
  import type { GLTF as ThreeGLTF } from 'three/examples/jsm/loaders/GLTFLoader'
  import { useGltf } from '../../hooks/useGltf'
  import type { ThrelteGltf } from '../../types/types'
  import type { GltfEvents, GltfProps, GltfSlots } from './GLTF.svelte.js'
  import { useSuspense } from '../../suspense/useSuspense'

  type $$Props = GltfProps
  type $$Events = GltfEvents
  type $$Slots = GltfSlots

  const component = forwardEventHandlers()

  export let url: $$Props['url']

  export let useDraco: $$Props['useDraco'] = false
  export let useMeshopt: $$Props['useMeshopt'] = false
  export let ktxTranscoderPath: $$Props['ktxTranscoderPath'] = undefined

  type AnyThrelteGltf = ThrelteGltf<{
    nodes: Record<string, any>
    materials: Record<string, any>
  }>

  const dispatch = createRawEventDispatcher<{
    load: ThreeGLTF
    unload: undefined
    error: string
  }>()

  export let gltf: AnyThrelteGltf | undefined = undefined
  export let scene: ThreeGLTF['scene'] | undefined = undefined
  export let animations: ThreeGLTF['animations'] | undefined = undefined
  export let asset: ThreeGLTF['asset'] | undefined = undefined
  export let cameras: ThreeGLTF['cameras'] | undefined = undefined
  export let scenes: ThreeGLTF['scenes'] | undefined = undefined
  export let userData: ThreeGLTF['userData'] | undefined = undefined
  export let parser: ThreeGLTF['parser'] | undefined = undefined
  export let materials: AnyThrelteGltf['materials'] | undefined = undefined
  export let nodes: AnyThrelteGltf['nodes'] | undefined = undefined

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
    if (gltf) dispatch('unload')

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

    dispatch('load', gltf)
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
    dispatch('error', error.message)
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

  $: loadGltf(url)
</script>

{#if scene}
  <T
    is={scene}
    {...$$restProps}
    let:ref
    bind:this={$component}
  >
    <slot {ref} />
  </T>
{/if}
