<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { Color, Matrix4, Object3D } from 'three'
  import {
    SceneGraphObject,
    type ThrelteInstance,
    TransformableObject,
    useFrame
  } from '@threlte/core'
  import { useInstancedMesh } from '../InstancedMesh/useInstancedMesh'
  import type { InstanceProps } from './Instance.svelte'

  type $$Props = InstanceProps

  export let position: $$Props['position'] = undefined
  export let scale: $$Props['scale'] = undefined
  export let rotation: $$Props['rotation'] = undefined
  export let lookAt: $$Props['lookAt'] = undefined
  export let color: $$Props['color'] = undefined
  export let id: $$Props['id'] = ''

  const { registerInstance, setInstanceMatrix, removeInstance, setInstanceColor, parentObject } =
    useInstancedMesh(id)

  const object3d = new Object3D()
  const m4 = new Matrix4()

  const isDirectChild = () => {
    // sanity null check in case it's not mounted yet
    return parentObject.uuid === object3d.parent?.uuid
  }

  const parseColor = (color: InstanceProps['color']): Color | null => {
    return color !== undefined ? (color instanceof Color ? color : new Color(color)) : null
  }

  const instance: ThrelteInstance = {
    color: parseColor(color),
    matrix: object3d.matrix
  }

  $: setColor(color)

  const setColor = (color: InstanceProps['color']) => {
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
