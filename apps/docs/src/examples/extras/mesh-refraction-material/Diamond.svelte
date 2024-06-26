<script lang="ts">
  import { Mesh } from 'three'
  import { T, useLoader } from '@threlte/core'
  import { useGltf, MeshRefractionMaterial } from '@threlte/extras'

  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

  let { ...props } = $props()

  type GLTFResult = {
    nodes: {
      Diamond_1_0: Mesh
    }
    materials: {}
  }

  const gltf = useGltf<GLTFResult>('/models/diamond/dflat.glb', { useDraco: true })
  const env = useLoader(RGBELoader).load('/hdr/aerodynamics_workshop_1k.hdr')
</script>

{#await gltf then { nodes }}
  <T.Mesh
    castShadow
    receiveShadow
    geometry={nodes.Diamond_1_0.geometry}
    {...props}
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
{/await}
