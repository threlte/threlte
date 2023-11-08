<script lang='ts'>
  import { T } from '@threlte/core'
  import { teleportControls } from '@threlte/xr'
  import { useGltf } from '@threlte/extras'

  teleportControls('left')
  teleportControls('right')

  const gltf = useGltf('/models/xr/ruins.glb', {
    useDraco: true
  })
</script>

<slot />

{#if $gltf}
  {#each [1, 2, 3, 4, 5] as n}
    <T
      is={$gltf.nodes[`teleportBlocker${n}`]}
      visible={false}
      teleportBlocker
    />
  {/each}

  <T
    is={$gltf.nodes.teleportSurface1}
    visible={false}
    teleportSurface
  />

  <T
    is={$gltf.nodes.teleportSurface2}
    visible={false}
    teleportSurface
  />
{/if}
