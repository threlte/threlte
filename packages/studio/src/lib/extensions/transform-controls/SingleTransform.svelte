<script lang="ts">
  import { TransformControls } from '@threlte/extras'
  import { onDestroy } from 'svelte'
  import { Euler, Vector3, type Group } from 'three'
  import type { TransformControls as TC } from 'three/examples/jsm/controls/TransformControls.js'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import { useStudio } from '../../internal/extensions'
  import { useObjectSelection } from '../object-selection/useObjectSelection.svelte'
  import { useSnapping } from '../snapping/useSnapping.svelte'
  import { useSpace } from '../space/useSpace'
  import { useStudioObjectsRegistry } from '../studio-objects-registry/useStudioObjectsRegistry.svelte'
  import { useTransactions } from '../transactions/useTransactions'
  import { getThrelteStudioUserData } from '../transactions/vite-plugin/runtimeUtils'
  import {
    transformControlsScope,
    type TransformControlsActions,
    type TransformControlsState
  } from './types'

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

  const { studioObjectRef } = useStudioObjectsRegistry()
  const controls = studioObjectRef<TC>()
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

    const userData = getThrelteStudioUserData(object)

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
  bind:controls={controls.ref}
  bind:group={group.ref}
/>
