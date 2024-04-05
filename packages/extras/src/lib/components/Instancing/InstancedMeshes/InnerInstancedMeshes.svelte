<script lang="ts">
  import type { Mesh } from 'three'
  import InstancedMesh from '../InstancedMesh.svelte'

  export let meshes: Mesh[]

  const copiedArray = [...meshes]
  const mesh = copiedArray.pop()
</script>

{#if mesh}
  <InstancedMesh
    geometry={mesh.geometry}
    material={mesh.material}
    id={mesh.uuid}
    {...$$restProps}
  >
    <svelte:self meshes={copiedArray}>
      <slot />
    </svelte:self>
  </InstancedMesh>
{:else}
  <slot />
{/if}
