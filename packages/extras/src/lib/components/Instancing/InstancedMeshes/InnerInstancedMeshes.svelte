<script lang="ts">
  import type { Mesh } from 'three'
  import InstancedMesh from '../InstancedMesh.svelte'
  import type { Snippet } from 'svelte'

  interface Props {
    meshes: Mesh[]
    index?: number
		children?: Snippet
  }

  let { meshes, index = meshes.length - 1, children, ...props }: Props = $props()
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
			{@render children?.()}
    </svelte:self>
  </InstancedMesh>
{:else}
	{@render children?.()}
{/if}
