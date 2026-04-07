<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T, useTask } from '@threlte/core'
  import { Portal, Text } from '@threlte/extras'
  import { useRapier } from '@threlte/rapier'
  import { Quaternion, Vector3 } from 'three'
  import Impulse from './Impulse.svelte'
  import { randomNumberInRange } from './utils'
  import type { Snippet } from 'svelte'

  let {
    rigidBody,
    key,
    min,
    max,
    active,
    children
  }: {
    rigidBody: RapierRigidBody
    key: string
    min: number
    max: number
    active: boolean
    children?: Snippet<[active: boolean]>
  } = $props()

  const rapier = useRapier()

  let pressed = $state(false)

  const power = 5
  const playerOffset = new Vector3(randomNumberInRange(min, max), -0.5, 0)
  const impulse = new Vector3()
  const origin = new Vector3()
  const offset = new Vector3()
  const quaternion = new Quaternion()

  const t = useTask(
    (delta) => {
      if (!rigidBody) return
      const rotation = rigidBody.rotation()
      quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)

      const translation = rigidBody.translation()
      origin.set(translation.x, translation.y, translation.z)

      offset.copy(playerOffset)
      offset.applyQuaternion(quaternion)
      origin.add(offset)

      impulse.set(0, power * delta, 0)
      impulse.applyQuaternion(quaternion)

      if (!pressed) return
      if (!active) return
      rigidBody.applyImpulseAtPoint(impulse, origin, true)
    },
    {
      before: rapier.simulationTask
    }
  )

  const thrusterActive = $derived(pressed && active)
</script>

<svelte:window
  onkeydown={(e) => {
    if (e.key === key) {
      pressed = true
    }
  }}
  onkeyup={(e) => {
    if (e.key === key) {
      pressed = false
    }
  }}
/>

<T.Group
  position.y={-0.5}
  position.x={playerOffset.x}
>
  <Text
    position.y={-0.1}
    text={key}
    renderOrder={1000}
  />

  {@render children?.(thrusterActive)}
</T.Group>

<Portal id="scene">
  <Impulse
    {origin}
    {impulse}
    afterTask={t.task}
    multiplier={pressed && active ? 10 : 1}
  />
</Portal>
