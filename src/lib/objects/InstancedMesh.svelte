<script context="module" lang="ts">
  import { getContext, setContext } from 'svelte'
  import { Color, InstancedMesh, Matrix4, Object3D } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import MeshInstance from '../instances/MeshInstance.svelte'
  import { usePropChange } from '../lib/usePropChange'
  import type { InstancedMeshProperties } from '../types/components'
  import type { ThrelteInstance, ThreltePointerEvent, ThreltePointerEventMap } from '../types/types'

  const placeholderObject3D = new Object3D()
  placeholderObject3D.scale.set(0, 0, 0)
  const placeholderInstance: ThrelteInstance = {
    object3d: placeholderObject3D,
    color: null
  }

  const emptyM4 = new Matrix4().fromArray(new Array(16).fill(0))

  const defaultColor = new Color(0xffffff)

  type InstancedMeshContext = {
    registerInstance: (instance: ThrelteInstance) => void
    removeInstance: (instance: ThrelteInstance) => void
    setInstanceMatrix: (instance: ThrelteInstance) => void
    setInstanceColor: (instance: ThrelteInstance) => void
  }

  const instancedMeshContextName = 'threlte-instanced-mesh-context' as const

  export const useInstancedMesh = () => {
    return getContext<InstancedMeshContext>(instancedMeshContextName)
  }
</script>

<script lang="ts">
  // MeshInstance
  export let position: InstancedMeshProperties['position'] = undefined
  export let scale: InstancedMeshProperties['scale'] = undefined
  export let rotation: InstancedMeshProperties['rotation'] = undefined
  export let viewportAware: InstancedMeshProperties['viewportAware'] = false
  export let inViewport: InstancedMeshProperties['inViewport'] = false
  export let castShadow: InstancedMeshProperties['castShadow'] = undefined
  export let receiveShadow: InstancedMeshProperties['receiveShadow'] = undefined
  export let renderOrder: InstancedMeshProperties['renderOrder'] = undefined
  export let visible: InstancedMeshProperties['visible'] = undefined
  export let interactive: InstancedMeshProperties['interactive'] = false
  export let ignorePointer: InstancedMeshProperties['ignorePointer'] = false
  export let lookAt: InstancedMeshProperties['lookAt'] = undefined

  // self
  export let geometry: InstancedMeshProperties['geometry']
  export let material: InstancedMeshProperties['material']
  export let count: InstancedMeshProperties['count'] = undefined

  const { onChange } = usePropChange(material)
  $: onChange(material, (newMaterial) => {
    instancedMesh.material = newMaterial
  })

  let autoCount = count === undefined
  $: autoCount = count === undefined

  let instancedMesh: InstancedMesh = new InstancedMesh(geometry, material, autoCount ? 0 : count)

  const instances: ThrelteInstance[] = []

  const { invalidate } = useThrelte()

  const useInstanceIndex = (instance: ThrelteInstance, callback: (index: number) => void) => {
    const index = instances.findIndex((i) => i === instance)
    if (index === -1) {
      console.warn('Instanced Mesh: Instance not found')
      return
    }
    callback(index)
  }

  const registerInstance = (instance: ThrelteInstance) => {
    if (autoCount) {
      instances.push(instance)
      handleAutoCountChange()
    } else {
      const firstPlaceholderInstanceIndex = instances.findIndex((i) => i === placeholderInstance)
      if (firstPlaceholderInstanceIndex !== -1) {
        instances[firstPlaceholderInstanceIndex] = instance
      } else {
        instances.push(instance)
      }
      if (instances.length > count) {
        console.warn('Instanced Mesh: More instances requested than allocated, increase count on <')
      }
    }
    setDefaultInstanceColor(instance)
    invalidate('Instanced Mesh: Instance added')
  }

  const removeInstance = (instance: ThrelteInstance) => {
    if (autoCount) {
      const index = instances.findIndex((i) => i === instance)
      instances.splice(index, 1)
      handleAutoCountChange()
    } else {
      resetInstanceMatrix(instance)
      const index = instances.findIndex((i) => i === instance)
      if (index >= count) {
        // remove the instance entirely if it's out of bounds of the InstancedMesh BufferAttribute Array
        instances.splice(index, 1)
      } else {
        // otherwise replace it with a placeholder instance to keep the indices in sync
        instances.splice(index, 1, placeholderInstance)
      }
    }
    invalidate('Instanced Mesh: Instance removed')
  }

  const setDefaultInstanceColor = (instance: ThrelteInstance) => {
    if (instance.color) return
    useInstanceIndex(instance, (index) => {
      instancedMesh.setColorAt(index, defaultColor)
      if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true
    })
  }

  const resetInstanceMatrix = (instance: ThrelteInstance) => {
    useInstanceIndex(instance, (index) => {
      instancedMesh.setMatrixAt(index, emptyM4)
      instancedMesh.instanceMatrix.needsUpdate = true
      invalidate('Instanced Mesh: instance matrix resetted')
    })
  }

  const setInstanceMatrix = (instance: ThrelteInstance) => {
    useInstanceIndex(instance, (index) => {
      instance.object3d.updateMatrix()
      instancedMesh.setMatrixAt(index, instance.object3d.matrix)
      instancedMesh.instanceMatrix.needsUpdate = true
      invalidate('Instanced Mesh: instance matrix set')
    })
  }

  const setInstanceColor = (instance: ThrelteInstance) => {
    useInstanceIndex(instance, (index) => {
      instancedMesh.setColorAt(index, instance.color ?? defaultColor)
      if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true
      invalidate('Instanced Mesh: instance color set')
    })
  }

  setContext<InstancedMeshContext>(instancedMeshContextName, {
    registerInstance,
    removeInstance,
    setInstanceMatrix,
    setInstanceColor
  })

  const updateBufferAttributes = () => {
    instances.forEach((instance, index) => {
      instancedMesh.setMatrixAt(index, instance.object3d.matrix)
      if (instance.color) {
        instancedMesh.setColorAt(index, instance.color)
      } else {
        instancedMesh.setColorAt(index, defaultColor)
      }
    })
    instancedMesh.instanceMatrix.needsUpdate = true
    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor.needsUpdate = true
    }
    invalidate('Instanced Mesh: Buffer Attributes updated')
  }

  const handleAutoCountChange = () => {
    instancedMesh.dispose()
    instancedMesh = new InstancedMesh(geometry, material, instances.length)
    updateBufferAttributes()
    invalidate('Instanced Mesh: instance count updated')
  }

  /**
   * The <InstancedMesh> component itself will not dispatch events.
   * Instances are however able to dispatch events. For now it's an
   * all-or-nothing approach where the props "interactive" and
   * "ignorePointer" are set on the <InstancedMesh> component and the
   * events are triggered on the instances.
   */
  const onEvent = (e: CustomEvent<ThreltePointerEvent>) => {
    const instance = instances[e.detail.instanceId]
    if (instance && instance.pointerEventDispatcher) {
      instance.pointerEventDispatcher(e.type as keyof ThreltePointerEventMap, e.detail)
    }
  }
</script>

{#key instancedMesh.uuid}
  <MeshInstance
    mesh={instancedMesh}
    {position}
    {scale}
    {rotation}
    {lookAt}
    {castShadow}
    {receiveShadow}
    frustumCulled={undefined}
    {renderOrder}
    {visible}
    {interactive}
    {ignorePointer}
    on:click={onEvent}
    on:contextmenu={onEvent}
    on:pointerup={onEvent}
    on:pointerdown={onEvent}
    on:pointerenter={onEvent}
    on:pointerleave={onEvent}
    on:pointermove={onEvent}
    {viewportAware}
    bind:inViewport
    on:viewportenter
    on:viewportleave
  >
    <slot />
  </MeshInstance>
{/key}

<slot name="instances" />
