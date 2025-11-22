<script
  lang="ts"
  generics="Type extends Meshes"
>
  import { createInstanceIdContext } from '../useInstanceId.js'
  import type { Mesh } from 'three'
  import Instance from '../Instance.svelte'
  import InnerInstancedMeshes from './InnerInstancedMeshes.svelte'
  import type { InstancedMeshesProps, Meshes } from './types.js'

  let { meshes, children, ...props }: InstancedMeshesProps<Type> = $props()

  const getInstance = (id: string) => {
    return (...args: Parameters<typeof Instance>) => {
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

  let components = $derived(
    Array.isArray(meshes)
      ? (getInstanceComponentsArray(meshes) as any)
      : (getInstanceComponentsObject(meshes) as any)
  )

  let meshesArray = $derived(Array.isArray(meshes) ? meshes : Object.values(meshes))
  let filteredMeshesArray = $derived(meshesArray.filter((mesh) => mesh.isMesh))
</script>

<InnerInstancedMeshes
  meshes={filteredMeshesArray}
  {...props}
>
  {@render children?.({ components })}
</InnerInstancedMeshes>
