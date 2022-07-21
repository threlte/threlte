<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { useFrame, useThrelte, type Position } from '@threlte/core'
  import { Vector2 } from 'three'
  import { Vector3 } from 'three'
  import Collider from '../Colliders/Collider.svelte'
  import RigidBody from '../RigidBody/RigidBody.svelte'

  export let position: Position | undefined = undefined
  export let speed = 1

  let rigidBody: RapierRigidBody

  const { renderer } = useThrelte()
  if (!renderer) throw new Error()

  type Keys = 'left' | 'right' | 'down' | 'up'

  const keys: Record<Keys, boolean> = {
    up: false,
    down: false,
    left: false,
    right: false
  }

  useFrame(() => {
    if (!rigidBody) return
    const f = new Vector3()
    const linVel = rigidBody.linvel()
    if (keys.down) f.z += 1
    if (keys.up) f.z -= 1
    if (keys.left) f.x -= 1
    if (keys.right) f.x += 1
    f.y = linVel.y
    f.multiplyScalar(speed)
    const xzLength = new Vector2(f.x, f.z).length()
    if (xzLength > 0) {
      rigidBody.resetForces(true)
      rigidBody.resetTorques(true)
    }
    rigidBody.setLinvel(f, true)
  })

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        keys.down = true
        break
      case 'ArrowUp':
        keys.up = true
        break
      case 'ArrowLeft':
        keys.left = true
        break
      case 'ArrowRight':
        keys.right = true
        break
      default:
        break
    }
  }

  const onKeyUp = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        keys.down = false
        break
      case 'ArrowUp':
        keys.up = false
        break
      case 'ArrowLeft':
        keys.left = false
        break
      case 'ArrowRight':
        keys.right = false
        break
      default:
        break
    }
  }
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} on:keyup|preventDefault={onKeyUp} />

<RigidBody
  enabledRotations={[false, true, false]}
  bind:rigidBody
  {position}
  colliders={false}
  type={'dynamic'}
>
  <Collider shape={'capsule'} args={[0.75, 0.35]} />
  <Collider
    sensor
    on:sensorenter={() => console.log('GROUNDED')}
    on:sensorexit={() => console.log('AIR')}
    position={{ y: -0.45 }}
    shape={'capsule'}
    args={[0.2, 0.4]}
  />
  <slot />
</RigidBody>
