<script lang="ts">
  import { TransformControls } from '@threlte/extras'
  import { onDestroy } from 'svelte'
  import { Euler, Vector3, type Group, Object3D } from 'three'
  import type { TransformControls as TC } from 'three/examples/jsm/controls/TransformControls.js'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import { useStudio } from '../../internal/extensions.js'
  import { useObjectSelection } from '../object-selection/useObjectSelection.svelte.js'
  import { useSnapping } from '../snapping/useSnapping.svelte.js'
  import { useSpace } from '../space/useSpace.js'
  import { useStudioObjectsRegistry } from '../studio-objects-registry/useStudioObjectsRegistry.svelte.js'
  import { useTransactions } from '../transactions/useTransactions.js'
  import {
    transformControlsScope,
    type TransformControlsActions,
    type TransformControlsState
  } from './types.js'

  const { useExtension } = useStudio()
  const transformControlsExtension = useExtension<
    TransformControlsState,
    TransformControlsActions,
    true
  >(transformControlsScope)

  const objectSelection = useObjectSelection()
  const space = useSpace()
  const snapping = useSnapping()

  const mode = $derived(transformControlsExtension.state.mode)

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

  onDestroy(() => {
    transformControlsExtension.setInUse(false)
  })

  const { commit, buildTransaction } = useTransactions()

  const object = $derived(objectSelection.selectedObjects[0])

  let usedModes = new Set<'translate' | 'rotate' | 'scale'>()
  let listenToModes = $state(false)
  $effect(() => {
    if (!listenToModes) return
    usedModes.add(mode)
  })

  let initialValue = {
    position: new Vector3(),
    rotation: new Euler(),
    scale: new Vector3()
  }

  const onMouseDown = () => {
    listenToModes = true
    initialValue.position.copy(object.position)
    initialValue.rotation.copy(object.rotation)
    initialValue.scale.copy(object.scale)
  }

  const onMouseUp = () => {
    listenToModes = false
    if (!initialValue) return

    const value = {
      position: object.position.clone(),
      rotation: object.rotation.clone(),
      scale: object.scale.clone()
    }
    const props = Object.keys(value).filter((key) => {
      if (usedModes.has('translate') && key === 'position') return true
      if (usedModes.has('rotate') && key === 'rotation') return true
      if (usedModes.has('scale') && key === 'scale') return true
      return false
    }) as unknown as (keyof typeof value)[]

    object.position.copy(initialValue.position)
    object.rotation.copy(initialValue.rotation)
    object.scale.copy(initialValue.scale)

    const transactions = props.map((prop) => {
      return buildTransaction({
        object,
        propertyPath: prop,
        value: value[prop]
      })
    })

    commit(transactions)
  }
</script>

<TransformControls
  {object}
  {mode}
  space={space.space}
  translationSnap={snapping.enabled ? snapping.translate ?? 0 : null}
  rotationSnap={snapping.enabled ? (snapping.rotate ?? 0) * DEG2RAD : null}
  scaleSnap={snapping.enabled ? snapping.scale ?? 0 : null}
  onmouseDown={() => {
    transformControlsExtension.setInUse(true)
    onMouseDown()
  }}
  onmouseUp={() => {
    transformControlsExtension.setInUse(false)
    onMouseUp()
  }}
  bind:controls
  bind:group={group.ref}
/>
