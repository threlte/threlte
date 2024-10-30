<script lang="ts">
  import InstancedMesh from '../InstancedMesh.svelte'
  import Self from './InnerInstancedMeshes.svelte'
  import type { Mesh } from 'three'
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
    <Self
      {meshes}
      index={index - 1}
      {...props}
    >
      {@render children?.()}
    </Self>
  </InstancedMesh>
{:else}
  {@render children?.()}
{/if}
