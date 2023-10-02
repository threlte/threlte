<script lang="ts">
  import { T } from '@threlte/core'
  import { RoundedBoxGeometry, useCursor, useTexture } from '@threlte/extras'
  import { spring } from 'svelte/motion'

  export let matcapUrl: string
  export let width = 5
  export let height = 5
  export let z = 0

  const { onPointerEnter, onPointerLeave, hovering } = useCursor()
  const scale = spring(0.9)
  $: scale.set($hovering ? 1 : 0.9)
</script>

{#await useTexture(matcapUrl) then matcap}
  <T.Mesh
    scale.x={(width / 100) * $scale}
    scale.y={(height / 100) * $scale}
    scale.z={$scale}
    position.z={20}
    on:pointerenter={onPointerEnter}
    on:pointerleave={onPointerLeave}
  >
    <RoundedBoxGeometry
      args={[100, 100, 20]}
      radius={2}
    />
    <T.MeshMatcapMaterial
      {matcap}
      on:create={() => {
        matcap.colorSpace = 'srgb'
      }}
    />
  </T.Mesh>
{/await}
