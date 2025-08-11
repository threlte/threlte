<script lang="ts">
  import { T } from '@threlte/core'
  import { InstancedMesh2 } from '@three.ez/instanced-mesh'
  import { Mesh } from 'three'
  import { setContext } from 'svelte'

  let { ref = $bindable(), children, ...props } = $props()

  let tempMesh = $state(new Mesh(undefined, undefined))
  let instancedMesh2 = $state<InstancedMesh2 | undefined>()
  let isCollecting = $state(true)

  const context = {
    get instancedMesh2() {
      return instancedMesh2
    }
  }

  setContext('instancedMesh2', context)

  $effect(() => {
    if (isCollecting && tempMesh.geometry && tempMesh.material) {
      instancedMesh2 = new InstancedMesh2(tempMesh.geometry, tempMesh.material, {
        createEntities: true,
        // todo review euler vs quaternion for ease of use
        allowsEuler: true
      })
      isCollecting = false
      console.log('finished collecting', tempMesh)
    }
  })
</script>

{#if instancedMesh2}
  <T
    is={instancedMesh2}
    bind:ref
    raycast={() => null}
    matrixAutoUpdate={false}
    {...props}
  >
    {@render children?.({ ref: instancedMesh2 })}
  </T>
{:else}
  <!-- Temporary mesh for collecting geometry and material -->
  <T
    is={tempMesh}
    attach={false}
  >
    {@render children?.({ ref: undefined })}
  </T>
{/if}
