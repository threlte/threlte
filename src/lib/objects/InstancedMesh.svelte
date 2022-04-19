<script context="module" lang="ts">
  import MeshInstance from '$lib/instances/MeshInstance.svelte'
  import { getContext, setContext } from 'svelte'
  import { Color, InstancedMesh, Matrix4, Object3D } from 'three'
  import type { MeshInstanceProperties, MeshProperties } from '../types/components'

  export type Instance = {
    object3d: Object3D
    color: null | Color
  }

  type InstancedMeshContext = {
    registerInstance: (instance: Instance) => void
    removeInstance: (instance: Instance) => void
    updateInstanceMatrix: (instance: Instance) => void
    updateInstanceColor: (
      instance: Instance,
      updateFn: (currentColor: Color | null) => Color | null
    ) => void
  }

  const instancedMeshContextName = 'threlte-instanced-mesh-context'

  export const useInstancedMesh = () => {
    return getContext<InstancedMeshContext>(instancedMeshContextName)
  }
</script>

<script lang="ts">
  import { useThrelte } from '$lib/hooks/useThrelte'

  export let position: MeshInstanceProperties['position'] = undefined

  export let geometry: MeshProperties['geometry']
  export let material: MeshProperties['material']

  export let count: number | undefined = undefined

  let instancedMesh: InstancedMesh = new InstancedMesh(geometry, material, count ?? 0)

  let instances: Instance[] = []
  let instancesCount = instances.length
  $: instancesCount = instances.length

  const workingColor = new Color()

  const { invalidate } = useThrelte()

  const registerInstance = (instance: Instance) => {
    instances.push(instance)
    instances = instances
  }

  const removeInstance = (instance: Instance) => {
    const index = instances.findIndex((i) => i === instance)
    instances.splice(index, 1)
    instances = instances
  }

  const updateInstanceMatrix = (instance: Instance) => {
    if (!instancedMesh) {
      console.warn('Instanced Mesh: No InstancedMesh yet.')
      return
    }
    const index = instances.findIndex((i) => i === instance)
    if (index === -1) {
      console.warn('Instanced Mesh: Instance not found')
      return
    }
    instance.object3d.updateMatrix()
    instancedMesh.setMatrixAt(index, instance.object3d.matrix)
    instancedMesh.instanceMatrix.needsUpdate = true
    invalidate('Instanced Mesh: instance matrix updated')
  }

  const updateInstanceColor = (
    instance: Instance,
    updateFn: (currentColor: Color | null) => Color | null
  ) => {
    if (!instancedMesh) {
      console.warn('Instanced Mesh: No InstancedMesh yet.')
      return
    }
    const index = instances.findIndex((i) => i === instance)
    if (index === -1) {
      console.warn('Instanced Mesh: Instance not found')
      return
    }
    instancedMesh.getColorAt(index, workingColor)
    instancedMesh.setColorAt(index, updateFn(workingColor))
    instancedMesh.instanceColor.needsUpdate = true
    invalidate('Instanced Mesh: instance color updated')
  }

  setContext<InstancedMeshContext>(instancedMeshContextName, {
    registerInstance,
    removeInstance,
    updateInstanceMatrix,
    updateInstanceColor
  })

  const handleCountChange = () => {
    instancedMesh.dispose()
    instancedMesh = new InstancedMesh(geometry, material, instancesCount)
    updateAllMatrices()
    invalidate('Instanced Mesh: instance count updated')
  }

  const updateAllMatrices = () => {
    instances.forEach((instance, index) => {
      instancedMesh.setMatrixAt(index, instance.object3d.matrix)
      instancedMesh.instanceMatrix.needsUpdate = true
    })
  }

  let previousInstancesCount = instancesCount
  $: if (instancesCount !== previousInstancesCount && count === undefined) {
    console.log('count change!')

    handleCountChange()
    previousInstancesCount = instancesCount
  }
</script>

{#key instancedMesh.uuid}
  {#if instancedMesh && instancedMesh.count > 0}
    <MeshInstance
      mesh={instancedMesh}
      {position}
      scale={undefined}
      rotation={undefined}
      lookAt={undefined}
      castShadow={undefined}
      receiveShadow={undefined}
      frustumCulled={undefined}
      renderOrder={undefined}
      visible={undefined}
      interactive={false}
      ignorePointer={false}
      on:click
      on:contextmenu
      on:pointerup
      on:pointerdown
      on:pointerenter
      on:pointerleave
      on:pointermove
      viewportAware={false}
      on:viewportenter
      on:viewportleave
    >
      <slot />
    </MeshInstance>
  {/if}
{/key}

<slot name="instances" />
