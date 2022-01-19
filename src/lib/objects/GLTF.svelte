<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import type { Group, Mesh, Object3D } from 'three'
  import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
  import type { GLTF as ThreeGLTF } from 'three/examples/jsm/loaders/GLTFLoader'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
  import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader'
  import { useLoader } from '../hooks/useLoader'
  import { useThrelte } from '../hooks/useThrelte'
  import Object3DInstance from '../instances/Object3DInstance.svelte'
  import type { GLTFProps } from '../types/components'

  // MeshInstance
  export let position: GLTFProps['position'] = undefined
  export let scale: GLTFProps['scale'] = undefined
  export let rotation: GLTFProps['rotation'] = undefined
  export let viewportAware: GLTFProps['viewportAware'] = false
  export let inViewport: GLTFProps['inViewport'] = false
  export let castShadow: GLTFProps['castShadow'] = undefined
  export let receiveShadow: GLTFProps['receiveShadow'] = undefined
  export let frustumCulled: GLTFProps['frustumCulled'] = undefined
  export let renderOrder: GLTFProps['renderOrder'] = undefined
  export let lookAt: GLTFProps['lookAt'] = undefined

  // self
  export let url: GLTFProps['url']
  export let dracoDecoderPath: GLTFProps['dracoDecoderPath'] = undefined
  export let ktxTranscoderPath: GLTFProps['ktxTranscoderPath'] = undefined

  const dispatch = createEventDispatcher<{
    load: undefined
    error: undefined
  }>()

  export let gltf: ThreeGLTF | undefined = undefined

  export let scene: Group | undefined = undefined
  $: if (gltf && !scene) scene = gltf.scene

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
      new KTX2Loader().setTranscoderPath('/loaders/basis/').detectSupport(renderer)
    )
    loader.setKTX2Loader(ktx2Loader)
  }

  loader.load(
    url,
    (g) => {
      gltf = g
      dispatch('load')
    },
    undefined,
    () => {
      dispatch('error')
    }
  )

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
