<script lang="ts">
  import type { Snippet } from 'svelte'
  import { T } from '@threlte/core'
  import { teleportControls } from '@threlte/xr'
  import { useDraco, useGltf } from '@threlte/extras'

  type Props = {
    children?: Snippet
    showBlockers: boolean
    showSurfaces: boolean
  }

  let { children, showBlockers, showSurfaces }: Props = $props()

  teleportControls('left')
  teleportControls('right')

  const dracoLoader = useDraco()
  const gltf = useGltf('/models/xr/ruins.glb', {
    dracoLoader
  })
</script>

{@render children?.()}

{#await gltf then { nodes }}
  {#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as n}
    <T
      is={nodes[`teleportBlocker${n}`]}
      visible={showBlockers}
      teleportBlocker
    />
  {/each}

  {#each [1, 2, 3] as n}
    <T
      is={nodes[`teleportSurface${n}`]}
      visible={showSurfaces}
      teleportSurface
    />
  {/each}
{/await}
