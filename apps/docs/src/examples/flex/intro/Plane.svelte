<script lang="ts">
  import type { Snippet } from 'svelte'
  import { T } from '@threlte/core'

  interface Props {
    color?: string
    height?: number
    width?: number
    depth?: number
    children?: Snippet
  }

  let { color = 'white', height = 1, width = 1, depth = 0, children }: Props = $props()
</script>

<T.Mesh
  position.z={depth * 20}
  renderOrder={depth}
>
  <T.PlaneGeometry args={[width, height]} />

  {#if children}
    {@render children?.()}
  {:else}
    <T.MeshBasicMaterial
      {color}
      transparent
      opacity={0.5}
    />
  {/if}
</T.Mesh>
