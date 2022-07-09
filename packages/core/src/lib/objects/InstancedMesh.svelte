<script context="module" lang="ts">
  import { getContext, setContext } from 'svelte'
  import { Color, InstancedMesh as ThreeInstancedMesh, Matrix4, Object3D } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import { useFrame } from '../hooks/useFrame'
  import MeshInstance from '../instances/MeshInstance.svelte'
  import { usePropChange } from '../lib/usePropChange'
  import type { InstancedMeshProperties } from '../types/components'
  import type { ThrelteInstance, ThreltePointerEvent, ThreltePointerEventMap } from '../types/types'
  import Object3DInstance from '../instances/Object3DInstance.svelte'
  import { writable, type Writable } from 'svelte/store'

  const placeholderObject3D = new Object3D()
  placeholderObject3D.scale.set(0, 0, 0)
  const placeholderInstance: ThrelteInstance = {
    matrix: placeholderObject3D.matrix,
    color: null
  }

  const emptyM4 = new Matrix4().fromArray(new Array(16).fill(0))

  const defaultColor = new Color(0xffffff)

  type InstancedMeshContext = {
    registerInstance: (instance: ThrelteInstance) => void
    removeInstance: (instance: ThrelteInstance) => void
    setInstanceMatrix: (instance: ThrelteInstance) => void
    setInstanceColor: (instance: ThrelteInstance) => void
    parentObject: Object3D
  }

  const instancedMeshContextName = 'threlte-instanced-mesh-context' as const

  export const useInstancedMesh = (id: string | undefined) => {
    return getContext<InstancedMeshContext>(instancedMeshContextName + id)
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
  export let id: InstancedMeshProperties['id'] = ''

  const { onChange } = usePropChange(material)
  $: onChange(material, (newMaterial) => {
    $instancedMesh.material = newMaterial
  })

  const autoCount = (count: number | undefined): count is undefined => count === undefined

  // let autoCount = count === undefined
  // $: autoCount = count === undefined

  export const instancedMesh: Writable<ThreeInstancedMesh> = writable(
    new ThreeInstancedMesh(geometry, material, autoCount(count) ? 0 : count)
  )
  const parentObject = new Object3D()

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

  const {
    start: queueHandleInstanceCountChange,
    stop,
    started: instanceCountChangeHandlerQueued
  } = useFrame(
    () => {
      $instancedMesh.dispose()
      $instancedMesh = new ThreeInstancedMesh(geometry, material, instances.length)

      instances.forEach((instance, index) => {
        setInstanceMatrixByIndex(instance, index)
        if (instance.color) {
          $instancedMesh.setColorAt(index, instance.color)
        } else {
          $instancedMesh.setColorAt(index, defaultColor)
        }
      })
      $instancedMesh.instanceMatrix.needsUpdate = true
      if ($instancedMesh.instanceColor) {
        $instancedMesh.instanceColor.needsUpdate = true
      }

      stop()
    },
    {
      autostart: false,
      debugFrameloopMessage: 'Instanced Mesh: auto instance count change queued'
    }
  )

  const registerInstance = (instance: ThrelteInstance) => {
    if (autoCount(count)) {
      instances.push(instance)
      if (!$instanceCountChangeHandlerQueued) queueHandleInstanceCountChange()
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
    if (autoCount(count)) {
      const index = instances.findIndex((i) => i === instance)
      instances.splice(index, 1)
      if (!$instanceCountChangeHandlerQueued) queueHandleInstanceCountChange()
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
      $instancedMesh.setColorAt(index, defaultColor)
      if ($instancedMesh.instanceColor) $instancedMesh.instanceColor.needsUpdate = true
    })
  }

  const resetInstanceMatrix = (instance: ThrelteInstance) => {
    useInstanceIndex(instance, (index) => {
      $instancedMesh.setMatrixAt(index, emptyM4)
      $instancedMesh.instanceMatrix.needsUpdate = true
      invalidate('Instanced Mesh: instance matrix resetted')
    })
  }

  const setInstanceMatrixByIndex = (instance: ThrelteInstance, index: number) => {
    $instancedMesh.setMatrixAt(index, instance.matrix)
    $instancedMesh.instanceMatrix.needsUpdate = true
    invalidate('Instanced Mesh: instance matrix set')
  }

  const setInstanceMatrix = (instance: ThrelteInstance) => {
    useInstanceIndex(instance, (index) => {
      setInstanceMatrixByIndex(instance, index)
    })
  }

  const setInstanceColor = (instance: ThrelteInstance) => {
    useInstanceIndex(instance, (index) => {
      $instancedMesh.setColorAt(index, instance.color ?? defaultColor)
      if ($instancedMesh.instanceColor) $instancedMesh.instanceColor.needsUpdate = true
      invalidate('Instanced Mesh: instance color set')
    })
  }

  setContext<InstancedMeshContext>(instancedMeshContextName + id, {
    registerInstance,
    removeInstance,
    setInstanceMatrix,
    setInstanceColor,
    parentObject
  })

  /**
   * The <InstancedMesh> component itself will not dispatch events.
   * Instances are however able to dispatch events. For now it's an
   * all-or-nothing approach where the props "interactive" and
   * "ignorePointer" are set on the <InstancedMesh> component and the
   * events are triggered on the instances.
   */
  const onEvent = (e: CustomEvent<ThreltePointerEvent>) => {
    if (!e.detail.instanceId) return
    const instance = instances[e.detail.instanceId]
    if (instance && instance.pointerEventDispatcher) {
      instance.pointerEventDispatcher(e.type as keyof ThreltePointerEventMap, e.detail)
    }
  }
</script>

<Object3DInstance object={parentObject} {position} {scale} {rotation} {lookAt}>
  {#key $instancedMesh.uuid}
    <MeshInstance
      mesh={$instancedMesh}
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
    />
  {/key}
  <slot />
</Object3DInstance>
