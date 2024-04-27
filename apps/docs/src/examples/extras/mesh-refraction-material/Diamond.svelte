<script lang="ts">
  import { Group } from 'three'
  import { T, type Props, type Events, type Slots, useLoader } from '@threlte/core'
  import { useGltf, MeshRefractionMaterial } from '@threlte/extras'

  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

  type $$Props = Props<THREE.Group>
  type $$Events = Events<THREE.Group>
  type $$Slots = Slots<THREE.Group> & { fallback: {}; error: { error: any } }

  export const ref = new Group()

  type GLTFResult = {
    nodes: {
      Diamond_1_0: THREE.Mesh
    }
    materials: {}
  }

  const gltf = useGltf<GLTFResult>('/models/diamond/dflat.glb', { useDraco: true })
  const env = useLoader(RGBELoader).load('/hdr/aerodynamics_workshop_1k.hdr')
</script>

<T
  is={ref}
  dispose={false}
  {...$$restProps}
>
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}
    <T.Mesh
      castShadow
      receiveShadow
      geometry={gltf.nodes.Diamond_1_0.geometry}
    >
      {#await env then e}
        <MeshRefractionMaterial
          envMap={e}
          fresnel={0.5}
          ior={2.75}
          aberrationStrength={0.04}
          bounces={3}
          color={'#ffdddd'}
        />
      {/await}
    </T.Mesh>
  {:catch error}
    <slot
      name="error"
      {error}
    />
  {/await}
  <slot {ref} />
</T>
