<script lang="ts">
  import type { Mesh } from 'three'
  import InstancedMesh from '../InstancedMesh.svelte'

  interface Props {
    meshes: Mesh[]
    index: number
  }

  let { meshes, index = meshes.length - 1, ...props }: Props = $props()
  const mesh = meshes[index]
</script>

{#if index > -1}
  <InstancedMesh
    geometry={mesh.geometry}
    material={mesh.material}
    id={mesh.uuid}
    {...props}
  >
    <svelte:self
      {meshes}
      index={index - 1}
      {...props}
    >
      <slot />
    </svelte:self>
  </InstancedMesh>
{:else}
  <slot />
{/if}
