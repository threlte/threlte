<script lang="ts">
  import Object3DInstance from '$lib/instances/Object3DInstance.svelte'
  import type { Group, Mesh, Object3D } from 'three'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
  import { defaults } from '../lib/defaults'
  import type { LookAt, Position, Rotation, Scale } from '../types/types'

  // MeshInstance
  export let position: Position = defaults.position
  export let scale: Scale = defaults.scale
  export let rotation: Rotation = defaults.rotation
  export let viewportAware: boolean = false
  export let inViewport: boolean = defaults.object3d.inViewport
  export let castShadow: boolean = defaults.mesh.castShadow
  export let receiveShadow: boolean = defaults.mesh.receiveShadow
  export let frustumCulled: boolean = defaults.mesh.frustumCulled
  export let renderOrder: number = defaults.mesh.renderOrder
  export let lookAt: LookAt | undefined = undefined

  // self
  export let url: string

  const loader = new GLTFLoader()

  export let gltf: Group | undefined = undefined

  loader.load(url, (g) => {
    gltf = g.scene
  })

  const objIsMesh = (obj: Object3D | Mesh): obj is Mesh => {
    return 'isMesh' in obj && obj.isMesh
  }

  $: {
    if (gltf) {
      gltf.traverse((obj) => {
        const objOrMesh = obj as Object3D | Mesh
        if (objIsMesh(objOrMesh)) {
          obj.castShadow = castShadow
          obj.receiveShadow = receiveShadow
          obj.frustumCulled = frustumCulled
          obj.renderOrder = renderOrder
        }
      })
    }
  }
</script>

{#if gltf}
  <Object3DInstance
    object={gltf}
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
