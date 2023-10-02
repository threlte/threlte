<script lang="ts">
  import { T } from '@threlte/core'

  export let color: string = 'white'
  export let height = 1
  export let width = 1
  export let depth = 0
</script>

<T.Mesh
  position.z={depth * 20}
  renderOrder={depth}
>
  <T.PlaneGeometry args={[width, height]} />

  {#if $$slots.default}
    <slot />
  {:else}
    <T.MeshBasicMaterial
      {color}
      transparent
      opacity={0.5}
    />
  {/if}
</T.Mesh>
