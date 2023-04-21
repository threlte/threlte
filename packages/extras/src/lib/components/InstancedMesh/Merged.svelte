<script lang="ts">
  import type { Mesh } from 'three'
  import InstancedMesh from './InstancedMesh.svelte'

  export let meshes: Mesh[]
</script>

{#each meshes as mesh}
  <InstancedMesh>
    <slot />
  </InstancedMesh>
{/each}
