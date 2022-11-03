<script lang="ts">
  import {
    DisposableObject,
    InteractiveObject,
    LayerableObject,
    Object3DInstance,
    useLoader,
    useThrelte
  } from '@threlte/core'
  import { createEventDispatcher } from 'svelte'
  import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
  import type { GLTF as ThreeGLTF } from 'three/examples/jsm/loaders/GLTFLoader'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
  import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader'
  import { buildSceneGraph } from '../../lib/buildSceneGraph'
  import type { GLTFProperties } from '../../types/components'
  import type { ThrelteGltf } from '../../types/types'

  export let position: GLTFProperties['position'] = undefined
  export let scale: GLTFProperties['scale'] = undefined
  export let rotation: GLTFProperties['rotation'] = undefined
  export let viewportAware: GLTFProperties['viewportAware'] = false
  export let inViewport: GLTFProperties['inViewport'] = false
  export let castShadow: GLTFProperties['castShadow'] = undefined
  export let receiveShadow: GLTFProperties['receiveShadow'] = undefined
  export let frustumCulled: GLTFProperties['frustumCulled'] = undefined
  export let renderOrder: GLTFProperties['renderOrder'] = undefined
  export let visible: GLTFProperties['visible'] = undefined
  export let dispose: GLTFProperties['dispose'] = undefined
  export let lookAt: GLTFProperties['lookAt'] = undefined

  export let url: GLTFProperties['url']

  /**
   * @deprecated Use `useDraco` instead
   */
  export let dracoDecoderPath: GLTFProperties['dracoDecoderPath'] = undefined
  export let useDraco: GLTFProperties['useDraco'] = false
  export let ktxTranscoderPath: GLTFProperties['ktxTranscoderPath'] = undefined

  export let ignorePointer: GLTFProperties['ignorePointer'] = false
  export let interactive: GLTFProperties['interactive'] = false

  const { invalidate } = useThrelte()

  const dispatch = createEventDispatcher<{
    load: ThreeGLTF
    unload: undefined
    error: string
  }>()

  export let gltf: ThreeGLTF | undefined = undefined
  export let scene: ThreeGLTF['scene'] | undefined = undefined
  export let animations: ThreeGLTF['animations'] | undefined = undefined
  export let asset: ThreeGLTF['asset'] | undefined = undefined
  export let cameras: ThreeGLTF['cameras'] | undefined = undefined
  export let scenes: ThreeGLTF['scenes'] | undefined = undefined
  export let userData: ThreeGLTF['userData'] | undefined = undefined
  export let parser: ThreeGLTF['parser'] | undefined = undefined
  export let materials:
    | ThrelteGltf<{
        nodes: Record<string, any>
        materials: Record<string, any>
      }>['materials']
    | undefined = undefined
  export let nodes:
    | ThrelteGltf<{
        nodes: Record<string, any>
        materials: Record<string, any>
      }>['nodes']
    | undefined = undefined

  const loader = useLoader(GLTFLoader, () => new GLTFLoader())

  if (useDraco) {
    // This has a priority over the deprecated `dracoDecoderPath` property
    if (useDraco === true) {
      setDracoPath('https://www.gstatic.com/draco/v1/decoders/')
    } else if (typeof useDraco === 'string') {
      setDracoPath(useDraco)
    }
  } else if (dracoDecoderPath) {
    // This is discarded if `useDraco` is used
    console.warn('⚠️ dracoDecoderPath is deprecated, use useDraco instead')
    setDracoPath(dracoDecoderPath)
  }

  function setDracoPath(path: string) {
    const dracoLoader = useLoader(DRACOLoader, () => new DRACOLoader().setDecoderPath(path))
    loader.setDRACOLoader(dracoLoader)
  }

  const { renderer } = useThrelte()
  if (renderer && ktxTranscoderPath) {
    const ktx2Loader = useLoader(KTX2Loader, () =>
      new KTX2Loader().setTranscoderPath(ktxTranscoderPath as string).detectSupport(renderer)
    )
    loader.setKTX2Loader(ktx2Loader)
  }

  const onLoad = (data: ThreeGLTF) => {
    // unload is not in use anymore
    if (gltf) dispatch('unload')

    gltf = data
    scene = gltf.scene
    animations = gltf.animations
    asset = gltf.asset
    cameras = gltf.cameras
    scenes = gltf.scenes
    userData = gltf.userData
    parser = gltf.parser

    const { materials: m, nodes: n } = buildSceneGraph(data.scene)
    materials = m
    nodes = n

    invalidate('GLTF: model loaded')
    dispatch('load', gltf)
  }

  const onError = (e: ErrorEvent) => {
    console.error(`Error loading GLTF: ${e.message}`)
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
    dispatch('error', e.message)
  }

  $: loader.load(url, onLoad, undefined, onError)

  $: {
    if (scene) {
      scene.traverse((obj) => {
        if (castShadow !== undefined) obj.castShadow = castShadow
        if (receiveShadow !== undefined) obj.receiveShadow = receiveShadow
        if (frustumCulled !== undefined) obj.frustumCulled = frustumCulled
        if (renderOrder !== undefined) obj.renderOrder = renderOrder
      })
    }
  }
</script>

{#if nodes}
  {#each Object.values(nodes) as node}
    {#if node}
      {#key node.uuid}
        <!-- dispose all nodes, i.e. meshes, skinnedMeshs -->
        <DisposableObject
          {dispose}
          object={node}
        />

        <LayerableObject object={node} />

        {#if node.type === 'Mesh' || node.type === 'SkinnedMesh'}
          <InteractiveObject
            object={node}
            {interactive}
            {ignorePointer}
            on:click
            on:contextmenu
            on:pointerup
            on:pointerdown
            on:pointerenter
            on:pointerleave
            on:pointermove
          />
        {/if}
      {/key}
    {/if}
  {/each}
{/if}

<!-- dispose all materials -->
{#if materials}
  {#each Object.values(materials) as material}
    <DisposableObject
      {dispose}
      object={material}
    />
  {/each}
{/if}

{#if scene}
  <Object3DInstance
    object={scene}
    {position}
    {scale}
    {rotation}
    {lookAt}
    {frustumCulled}
    {renderOrder}
    {visible}
    {dispose}
    {castShadow}
    {receiveShadow}
    {viewportAware}
    bind:inViewport
    on:viewportenter
    on:viewportleave
  >
    <slot />
  </Object3DInstance>
{/if}
