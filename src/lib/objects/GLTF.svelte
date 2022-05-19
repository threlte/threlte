<script lang="ts">
  import InteractiveObject from '$lib/internal/InteractiveObject.svelte'
  import { createEventDispatcher } from 'svelte'
  import type { Material, Mesh, Object3D } from 'three'
  import { Texture } from 'three'
  import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
  import type { GLTF as ThreeGLTF } from 'three/examples/jsm/loaders/GLTFLoader'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
  import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader'
  import { useLoader } from '../hooks/useLoader'
  import { useThrelte } from '../hooks/useThrelte'
  import Object3DInstance from '../instances/Object3DInstance.svelte'
  import type { GLTFProperties } from '../types/components'

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
  export let lookAt: GLTFProperties['lookAt'] = undefined

  export let url: GLTFProperties['url']
  export let dracoDecoderPath: GLTFProperties['dracoDecoderPath'] = undefined
  export let ktxTranscoderPath: GLTFProperties['ktxTranscoderPath'] = undefined

  // <InteractiveObject> properties
  export let ignorePointer: GLTFProperties['ignorePointer'] = false
  export let interactive: GLTFProperties['interactive'] = false

  const { invalidate } = useThrelte()

  const dispatch = createEventDispatcher<{
    load: ThreeGLTF
    unload: undefined
    error: string
  }>()

  let interactiveMeshes: Mesh[] = []

  export let gltf: ThreeGLTF | undefined = undefined
  export let scene: ThreeGLTF['scene'] | undefined = undefined
  export let animations: ThreeGLTF['animations'] | undefined = undefined
  export let asset: ThreeGLTF['asset'] | undefined = undefined
  export let cameras: ThreeGLTF['cameras'] | undefined = undefined
  export let scenes: ThreeGLTF['scenes'] | undefined = undefined
  export let userData: ThreeGLTF['userData'] | undefined = undefined
  export let parser: ThreeGLTF['parser'] | undefined = undefined

  const loader = useLoader(GLTFLoader, () => new GLTFLoader())

  if (dracoDecoderPath) {
    const dracoLoader = useLoader(DRACOLoader, () =>
      new DRACOLoader().setDecoderPath(dracoDecoderPath as string)
    )
    loader.setDRACOLoader(dracoLoader)
  }

  const { renderer } = useThrelte()
  if (renderer && ktxTranscoderPath) {
    const ktx2Loader = useLoader(KTX2Loader, () =>
      new KTX2Loader().setTranscoderPath(ktxTranscoderPath as string).detectSupport(renderer)
    )
    loader.setKTX2Loader(ktx2Loader)
  }

  const disposeGltf = () => {
    if (gltf) {
      gltf.scene.traverse((object) => {
        if (object.type !== 'Mesh') return
        const m = object as Mesh

        m.geometry.dispose()

        if (Array.isArray(m.material)) {
          m.material.forEach((mm) => {
            if (mm.isMaterial) {
              disposeMaterial(mm)
            }
          })
        } else if (m.material.isMaterial) {
          disposeMaterial(m.material)
        }
      })
      gltf = undefined
      scene = undefined
      animations = undefined
      asset = undefined
      cameras = undefined
      scenes = undefined
      userData = undefined
      parser = undefined

      interactiveMeshes.splice(0, interactiveMeshes.length)
      interactiveMeshes = interactiveMeshes

      invalidate('GLTF: model disposed')
      dispatch('unload')
    }
  }

  const disposeMaterial = (material: Material) => {
    material.dispose()
    Object.values(material).forEach((value) => {
      try {
        if (value instanceof Texture) {
          value.dispose()
        }
      } catch (error) {
        console.warn('<GLTF>: Unable to dispose texture.')
      }
    })
  }

  const onLoad = (g: ThreeGLTF) => {
    disposeGltf()
    gltf = g
    scene = gltf.scene
    animations = gltf.animations
    asset = gltf.asset
    cameras = gltf.cameras
    scenes = gltf.scenes
    userData = gltf.userData
    parser = gltf.parser

    scene.traverse((object) => {
      if (object.type === 'Mesh') {
        const mesh = object as Mesh
        interactiveMeshes.push(mesh)
      }
      interactiveMeshes = interactiveMeshes
    })

    invalidate('GLTF: model loaded')
    dispatch('load', gltf)
  }

  const onError = (e: ErrorEvent) => {
    console.error(`Error loading GLTF: ${e.message}`)
    disposeGltf()
    dispatch('error', e.message)
  }

  $: loader.load(url, onLoad, undefined, onError)

  const objIsMesh = (obj: Object3D | Mesh): obj is Mesh => {
    return 'isMesh' in obj && obj.isMesh
  }

  $: {
    if (scene) {
      scene.traverse((obj) => {
        const objOrMesh = obj as Object3D | Mesh
        if (objIsMesh(objOrMesh)) {
          if (castShadow !== undefined) obj.castShadow = castShadow
          if (receiveShadow !== undefined) obj.receiveShadow = receiveShadow
          if (frustumCulled !== undefined) obj.frustumCulled = frustumCulled
          if (renderOrder !== undefined) obj.renderOrder = renderOrder
        }
      })
    }
  }
</script>

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
    {castShadow}
    {receiveShadow}
    {viewportAware}
    bind:inViewport
    on:viewportenter
    on:viewportleave
  >
    <slot />
  </Object3DInstance>

  {#each interactiveMeshes as mesh}
    {#key mesh.uuid}
      <InteractiveObject
        object={mesh}
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
    {/key}
  {/each}
{/if}
