<script lang="ts">
  import { T, forwardEventHandlers } from '@threlte/core'
  import type { Mesh } from 'three'
  import Instance from '../Instance.svelte'
  import InnerMerged from './InnerMerged.svelte'
  import type { MergedEvents, MergedProps, MergedSlots, Meshes } from './Merged.svelte'

  type T = $$Generic<Meshes>

  type $$Props = MergedProps<T>
  type $$Events = MergedEvents
  type $$Slots = MergedSlots<T>

  export let meshes: T

  const getInstance = (id: string) => {
    return new Proxy(Instance, {
      construct(Instance, args) {
        const opts = {
          ...args[0],
          props: {
            ...args[0].props,
            id
          }
        } as any
        return new Instance(opts)
      }
    })
  }

  const getInstanceComponentsArray = <T extends Mesh[]>(meshes: T): typeof Instance[] => {
    return meshes.filter((mesh) => mesh.isMesh).map((mesh) => getInstance(mesh.uuid))
  }

  const getInstanceComponentsObject = <T extends Record<string, Mesh>>(
    meshes: T
  ): { [key in keyof T]: typeof Instance } => {
    return Object.entries(meshes).reduce((acc, [id, mesh]) => {
      // filter out non-mesh objects
      if (!mesh.isMesh) return acc
      acc[id as any as keyof T] = getInstance(mesh.uuid)
      return acc
    }, {} as Record<keyof T, typeof Instance>)
  }

  $: components = Array.isArray(meshes)
    ? (getInstanceComponentsArray(meshes) as any)
    : (getInstanceComponentsObject(meshes) as any)

  $: meshesArray = Array.isArray(meshes) ? meshes : Object.values(meshes)
  $: filteredMeshesArray = meshesArray.filter((mesh) => mesh.isMesh)

  const dispatchingComponent = forwardEventHandlers()
</script>

<InnerMerged meshes={filteredMeshesArray} bind:this={$dispatchingComponent} {...$$restProps}>
  <slot {components} />
</InnerMerged>
