<script lang="ts">
  import { type RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { useTask } from '@threlte/core'
  import { Portal, Text } from '@threlte/extras'
  import { useRapier } from '@threlte/rapier'
  import { Quaternion, Vector3 } from 'three'
  import Impulse from './Impulse.svelte'
  import { randomNumberInRange } from './utils'

  let {
    rigidBody,
    key,
    min,
    max
  }: { rigidBody: RapierRigidBody; key: string; min: number; max: number } = $props()

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
      rigidBody.applyImpulseAtPoint(impulse, origin, true)
    },
    {
      stage: rapier.physicsStage
    }
  )
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

<Text
  position.y={-0.6}
  position.x={playerOffset.x}
  text={key}
  renderOrder={1000}
/>

<Portal id="scene">
  <Impulse
    {origin}
    {impulse}
    afterTask={t.task}
    multiplier={pressed ? 10 : 1}
  />
</Portal>
