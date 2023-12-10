<script lang="ts">
  import { T } from '@threlte/core'
  import { teleportControls } from '@threlte/xr'
  import { useGltf } from '@threlte/extras'

  export let showSurfaces: boolean
  export let showBlockers: boolean

  teleportControls('left')
  teleportControls('right')

  const gltf = useGltf('/models/xr/ruins.glb', {
    useDraco: true
  })
</script>

<slot />

{#if $gltf}
  {#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as n}
    <T
      is={$gltf.nodes[`teleportBlocker${n}`]}
      visible={showBlockers}
      teleportBlocker
    />
  {/each}

  {#each [1, 2, 3] as n}
    <T
      is={$gltf.nodes[`teleportSurface${n}`]}
      visible={showSurfaces}
      teleportSurface
    />
  {/each}
{/if}
