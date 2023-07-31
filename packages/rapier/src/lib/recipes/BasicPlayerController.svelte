<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { createRawEventDispatcher, T, useFrame, useThrelte } from '@threlte/core'
  import { Vector2, Vector3 } from 'three'
  import Collider from '../components/Colliders/Collider.svelte'
  import CollisionGroups from '../components/CollisionGroups/CollisionGroups.svelte'
  import RigidBody from '../components/RigidBody/RigidBody.svelte'
  import type { CollisionGroupsBitMask } from '../types/types'

  export let position: Parameters<Vector3['set']> | undefined = undefined
  export let height: number = 1.7
  export let radius: number = 0.3
  export let speed = 1
  export let jumpStrength = 3
  export let playerCollisionGroups: CollisionGroupsBitMask = [0]
  export let groundCollisionGroups: CollisionGroupsBitMask = [15]

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

  const t = new Vector3()
  const t2 = new Vector2()

  const dispatch = createRawEventDispatcher<{
    groundenter: void
    groundexit: void
  }>()

  let grounded = false
  let groundsSensored = 0
  $: {
    if (groundsSensored === 0) grounded = false
    else grounded = true
  }
  $: grounded ? dispatch('groundenter') : dispatch('groundexit')

  useFrame(() => {
    if (!rigidBody) return
    t.fromArray([0, 0, 0])
    if (keys.down) t.x += 1
    if (keys.up) t.x -= 1
    if (keys.left) t.z += 1
    if (keys.right) t.z -= 1
    const l = t.length()

    const xzLength = t2.set(t.x, t.z).length()
    if (l > 0) t.divideScalar(l).multiplyScalar(speed)

    if (xzLength > 0) {
      rigidBody.resetForces(true)
      rigidBody.resetTorques(true)
    }
    const linVel = rigidBody.linvel()
    t.y = linVel.y
    rigidBody.setLinvel(t, true)
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
      case ' ':
        if (!rigidBody || !grounded) break
        rigidBody.applyImpulse({ x: 0, y: jumpStrength, z: 0 }, true)
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

<T.Group {position}>
  <RigidBody
    dominance={127}
    enabledRotations={[false, false, false]}
    bind:rigidBody
    type={'dynamic'}
  >
    <CollisionGroups groups={playerCollisionGroups}>
      <Collider shape={'capsule'} args={[height / 2 - radius, radius]} />
    </CollisionGroups>

    <CollisionGroups groups={groundCollisionGroups}>
      <T.Group position={[0, -height / 2 + radius, 0]}>
        <Collider
          sensor
          on:sensorenter={() => (groundsSensored += 1)}
          on:sensorexit={() => (groundsSensored -= 1)}
          shape={'ball'}
          args={[radius * 1.2]}
        />
      </T.Group>
    </CollisionGroups>

    <T.Group position.y={-height / 2}>
      <slot />
    </T.Group>
  </RigidBody>
</T.Group>
