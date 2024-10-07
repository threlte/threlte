<script lang="ts">
  import type { Mesh } from 'three'
  import InstancedMesh from '../InstancedMesh.svelte'
  import InnerInstancedMeshes from './InnerInstancedMeshes.svelte'
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
    <InnerInstancedMeshes
      {meshes}
      index={index - 1}
      {...props}
    >
      {@render children?.()}
    </InnerInstancedMeshes>
  </InstancedMesh>
{:else}
  {@render children?.()}
{/if}
