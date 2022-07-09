<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import { Color, Matrix4, Object3D } from 'three'
  import { useFrame } from '../hooks/useFrame'
  import SceneGraphObject from '../internal/SceneGraphObject.svelte'
  import TransformableObject from '../internal/TransformableObject.svelte'
  import { useInstancedMesh } from '../objects/InstancedMesh.svelte'
  import type { InstanceProperties } from '../types/components'
  import type { ThrelteInstance, ThreltePointerEvent } from '../types/types'

  export let position: InstanceProperties['position'] = undefined
  export let scale: InstanceProperties['scale'] = undefined
  export let rotation: InstanceProperties['rotation'] = undefined
  export let lookAt: InstanceProperties['lookAt'] = undefined
  export let color: InstanceProperties['color'] = undefined
  export let id: InstanceProperties['id'] = ''

  const { registerInstance, setInstanceMatrix, removeInstance, setInstanceColor, parentObject } =
    useInstancedMesh(id)

  const object3d = new Object3D()
  const m4 = new Matrix4()

  const pointerEventDispatcher = createEventDispatcher<{
    click: ThreltePointerEvent
    contextmenu: ThreltePointerEvent
    pointerup: ThreltePointerEvent
    pointerdown: ThreltePointerEvent
    pointerenter: ThreltePointerEvent
    pointerleave: ThreltePointerEvent
    pointermove: ThreltePointerEvent
  }>()

  const isDirectChild = () => {
    // sanity null check in case it's not mounted yet
    return parentObject.uuid === object3d.parent?.uuid
  }

  const parseColor = (color: InstanceProperties['color']): Color | null => {
    return color !== undefined ? (color instanceof Color ? color : new Color(color)) : null
  }

  const instance: ThrelteInstance = {
    color: parseColor(color),
    matrix: object3d.matrix,
    pointerEventDispatcher
  }

  $: setColor(color)

  const setColor = (color: InstanceProperties['color']) => {
    instance.color = parseColor(color)
    setInstanceColor(instance)
  }

  const prepareNonDirectChildMatrix = () => {
    let currentObj = object3d.parent
    const interjacentObjects: Object3D[] = []
    // tiny bit faster than Object3D.traverseAncestors
    // as that cannot be broken out of
    while (currentObj && parentObject && currentObj.uuid !== parentObject.uuid) {
      interjacentObjects.push(currentObj)
      if (!currentObj.parent) break
      currentObj = currentObj.parent
    }
    object3d.updateMatrix()
    m4.copy(object3d.matrix)
    interjacentObjects.forEach((obj) => {
      obj.updateMatrix()
      m4.premultiply(obj.matrix)
    })
    instance.matrix = m4
  }

  const prepareDirectChildMatrix = () => {
    object3d.updateMatrix()
    instance.matrix = object3d.matrix
  }

  const setDirectChildInstanceTransform = () => {
    prepareDirectChildMatrix()
    setInstanceMatrix(instance)
  }

  const { start: trackNonDirectChildInstanceTransform } = useFrame(
    () => {
      prepareNonDirectChildMatrix()
      setInstanceMatrix(instance)
    },
    {
      autostart: false,
      debugFrameloopMessage: 'Instance: tracking non-direct child instance'
    }
  )

  registerInstance(instance)

  onMount(() => {
    if (isDirectChild()) setDirectChildInstanceTransform()
    else trackNonDirectChildInstanceTransform()
    setColor(color)
  })

  const onTransform = () => {
    if (isDirectChild()) setDirectChildInstanceTransform()
  }

  onDestroy(() => {
    removeInstance(instance)
  })
</script>

<SceneGraphObject object={object3d}>
  <slot />
</SceneGraphObject>

<TransformableObject
  object={object3d}
  {position}
  {scale}
  {rotation}
  {lookAt}
  on:transform={onTransform}
/>
