<script lang="ts">
  import { forwardEventHandlers } from '@threlte/core'
  import type { Mesh } from 'three'
  import InstancedMesh from '../InstancedMesh.svelte'

  export let meshes: Mesh[]

  const copiedArray = [...meshes]
  const mesh = copiedArray.pop()

  const dispatchingComponent = forwardEventHandlers()
</script>

{#if mesh}
  <InstancedMesh
    geometry={mesh.geometry}
    material={mesh.material}
    id={mesh.uuid}
    bind:this={$dispatchingComponent}
    {...$$restProps}
  >
    <svelte:self meshes={copiedArray}>
      <slot />
    </svelte:self>
  </InstancedMesh>
{:else}
  <slot />
{/if}
