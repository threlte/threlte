<script
  lang="ts"
  context="module"
>
  const geometry = new SphereGeometry(1, 64, 64)
</script>

<script lang="ts">
  import { T } from '@threlte/core'
  import { useTexture } from '@threlte/extras'
  import { SphereGeometry } from 'three'

  export let matcapUrl: string
  export let radius = 5
  export let z = 0
</script>

{#await useTexture(matcapUrl) then matcap}
  <T.Mesh
    scale={radius}
    position.z={z + radius}
  >
    <T is={geometry} />
    <T.MeshMatcapMaterial
      {matcap}
      on:create={() => {
        matcap.colorSpace = 'srgb'
      }}
    />
  </T.Mesh>
{/await}
