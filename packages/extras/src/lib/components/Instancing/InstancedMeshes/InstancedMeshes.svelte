<script lang="ts">
  import { createInstanceIdContext } from '../useInstanceId'
  import type { Mesh } from 'three'
  import Instance from '../Instance.svelte'
  import InnerInstancedMeshes from './InnerInstancedMeshes.svelte'
  import type {
    InstancedMeshesEvents,
    InstancedMeshesProps,
    InstancedMeshesSlots,
    Meshes
  } from './InstancedMeshes.svelte'

  type T = $$Generic<Meshes>

  type $$Props = InstancedMeshesProps<T>
  type $$Events = InstancedMeshesEvents
  type $$Slots = InstancedMeshesSlots<T>

  export let meshes: T

  const getInstance = (id: string) => {
    return (...args) => {
      createInstanceIdContext(id)
      return Instance(...args)
    }
  }

  const getInstanceComponentsArray = <T extends Mesh[]>(meshes: T): (typeof Instance)[] => {
    return meshes.filter((mesh) => mesh.isMesh).map((mesh) => getInstance(mesh.uuid))
  }

  const getInstanceComponentsObject = <T extends Record<string, Mesh>>(
    meshes: T
  ): { [key in keyof T]: typeof Instance } => {
    return Object.entries(meshes).reduce(
      (acc, [id, mesh]) => {
        // filter out non-mesh objects
        if (!mesh.isMesh) return acc
        acc[id as any as keyof T] = getInstance(mesh.uuid)
        return acc
      },
      {} as Record<keyof T, typeof Instance>
    )
  }

  $: components = Array.isArray(meshes)
    ? (getInstanceComponentsArray(meshes) as any)
    : (getInstanceComponentsObject(meshes) as any)

  $: meshesArray = Array.isArray(meshes) ? meshes : Object.values(meshes)
  $: filteredMeshesArray = meshesArray.filter((mesh) => mesh.isMesh)
</script>

<InnerInstancedMeshes
  meshes={filteredMeshesArray}
  {...$$restProps}
>
  <slot {components} />
</InnerInstancedMeshes>
