<script lang="ts">
  import { T } from '@threlte/core'
  import { TransformControls } from '@threlte/extras'
  import { onDestroy } from 'svelte'
  import { Box3, Object3D, Vector3, type Group } from 'three'
  import type { TransformControls as TC } from 'three/examples/jsm/controls/TransformControls.js'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import { useStudio } from '../../internal/extensions.js'
  import { useObjectSelection } from '../object-selection/useObjectSelection.svelte.js'
  import { useSnapping } from '../snapping/useSnapping.svelte.js'
  import { useSpace } from '../space/useSpace.js'
  import { useStudioObjectsRegistry } from '../studio-objects-registry/useStudioObjectsRegistry.svelte.js'
  import {
    transformControlsScope,
    type TransformControlsActions,
    type TransformControlsState
  } from './types.js'
  import { useTransactions } from '../transactions/useTransactions.js'
  import type { Transaction } from '../transactions/TransactionQueue/TransactionQueue.svelte.js'
  import { getThrelteStudioUserData } from '../../internal/getThrelteStudioUserData.js'

  const objectSelection = useObjectSelection()
  const { useExtension } = useStudio()
  const transformControlsExtension = useExtension<
    TransformControlsState,
    TransformControlsActions,
    true
  >(transformControlsScope)
  const space = useSpace()
  const snapping = useSnapping()

  const { studioObjectRef, addObject, removeObject } = useStudioObjectsRegistry()
  let controls = $state<TC>()
  $effect(() => {
    if (!controls) return
    const helper = controls.getHelper()

    if (!helper) return

    const objects: Object3D[] = []
    helper.traverse((node) => {
      objects.push(node)
    })
    for (const object of objects) {
      addObject(object)
    }
    return () => {
      for (const object of objects) {
        removeObject(object)
      }
    }
  })
  const group = studioObjectRef<Group>()
  const center = studioObjectRef<Object3D>()

  const mode = $derived(transformControlsExtension.state.mode)

  let centerObject = new Object3D()
  let lastPosition = new Vector3()

  $effect(() => {
    if (objectSelection.selectedObjects.length === 0) return
    // make bb with all selected objects
    const bb = new Box3().setFromObject(objectSelection.selectedObjects[0])
    for (let i = 1; i < objectSelection.selectedObjects.length; i++) {
      bb.expandByObject(objectSelection.selectedObjects[i])
    }
    lastPosition.copy(bb.getCenter(new Vector3()))
    centerObject.position.copy(lastPosition)
  })

  const onChange = () => {
    if (mode === 'translate') {
      const delta = new Vector3().subVectors(centerObject.position, lastPosition)
      for (const object of objectSelection.selectedObjects) {
        // object.position.add(delta)
        if (space.space === 'world') {
          if (!object.parent) {
            // world space is local space
            object.position.add(delta)
          } else {
            // translate in world space
            const worldPosition = new Vector3()
            object.getWorldPosition(worldPosition)
            worldPosition.add(delta)
            const localPosition = object.parent.worldToLocal(worldPosition)
            object.position.copy(localPosition)
          }
        } else {
          object.position.add(delta)
        }
      }
      lastPosition.copy(centerObject.position)
    } else if (mode === 'rotate') {
      // TODO: implement rotation
    } else {
      // TODO: implement scale
    }
  }

  const commitObjects = $derived([...objectSelection.selectedObjects, centerObject])

  let initialValues: Vector3[] = []
  const onMouseDown = () => {
    if (mode === 'translate') {
      initialValues = commitObjects.map((object) => object.position.clone())
    }
  }

  const { commit } = useTransactions()

  const onMouseUp = () => {
    if (commitObjects.length !== initialValues.length) return

    if (mode === 'translate') {
      const transactions = commitObjects.map((object, index) => {
        const isCenterObject = object === centerObject
        const userData = getThrelteStudioUserData(object)
        const initialValue = initialValues[index]
        const value = object.position.clone()
        object.position.copy(initialValue)
        return {
          object,
          read(root) {
            return root.position.clone()
          },
          write(root, data) {
            root.position.copy(data)
            if (isCenterObject) {
              // update lastPosition to enable undo/redo
              lastPosition.copy(data)
            }
          },
          value,
          sync: userData
            ? {
                attributeName: [...(userData.pathItems ?? []), 'position'].join('.'),
                componentIndex: userData.index,
                moduleId: userData.moduleId
              }
            : undefined
        } satisfies Transaction<any, any>
      })
      commit(transactions)
    }

    initialValues = []
  }

  onDestroy(() => {
    transformControlsExtension.setInUse(false)
  })
</script>

<T
  is={centerObject}
  bind:ref={center.ref}
/>

<TransformControls
  object={centerObject}
  space={space.space}
  translationSnap={snapping.enabled ? snapping.translate ?? 0 : null}
  rotationSnap={snapping.enabled ? (snapping.rotate ?? 0) * DEG2RAD : null}
  scaleSnap={snapping.enabled ? snapping.scale ?? 0 : null}
  onchange={onChange}
  onmouseDown={() => {
    transformControlsExtension.setInUse(true)
    onMouseDown()
  }}
  onmouseUp={() => {
    transformControlsExtension.setInUse(false)
    onMouseUp()
  }}
  {mode}
  bind:controls
  bind:group={group.ref}
/>
