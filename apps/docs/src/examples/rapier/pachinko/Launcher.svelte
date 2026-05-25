<script lang="ts">
  import { T } from '@threlte/core'
  import { Collider, RigidBody, usePhysicsTask, usePrismaticJoint } from '@threlte/rapier'
  import { fromStore, get } from 'svelte/store'
  import {
    CHANNEL_BOTTOM_Y,
    CHANNEL_TOP_Y,
    CHANNEL_X,
    FIELD_HEIGHT,
    ballRegistry,
    gameState
  } from './gameState.svelte'
  import { spawnQueue } from './spawnQueue.svelte'

  const CHARGE_TIME_MS = 1000
  const AUTOFIRE_INTERVAL_MS = 140
  const ANCHOR_Y = -FIELD_HEIGHT / 2 + 0.2
  const REST_OFFSET = 0.6
  const COMPRESSED_OFFSET = 0
  const SPRING_STIFFNESS = 4000
  const SPRING_DAMPING = 3
  const PLUNGER_HALF_HEIGHT = 0.08
  const BALL_RADIUS = 0.14
  const LOAD_GAP = 0.04

  const {
    rigidBodyA,
    rigidBodyB,
    joint: jointStore
  } = usePrismaticJoint([0, 0, 0], [0, 0, 0], [0, 1, 0], [-0.05, REST_OFFSET + 0.1])

  const joint = fromStore(jointStore)
  const plunger = fromStore(rigidBodyB)

  let configured = false
  let lastAutoFire = 0
  let ballsInLaunchZone = 0
  let lastSpawnAt = 0

  const SPAWN_DEBOUNCE_MS = 80

  const loadBall = () => {
    if (ballsInLaunchZone > 0) return
    const now = performance.now()
    if (now - lastSpawnAt < SPAWN_DEBOUNCE_MS) return
    const plungerBody = get(rigidBodyB)
    if (!plungerBody) return
    const p = plungerBody.translation()
    spawnQueue.spawn(p.x, p.y + PLUNGER_HALF_HEIGHT + BALL_RADIUS + LOAD_GAP, 0, 0)
    lastSpawnAt = now
  }

  // Pre-load a ball on the plunger as soon as the body is available, so the
  // game opens with a ball already sitting in the launcher and the player can
  // fire on their first hold. The sensor + debounce inside loadBall keep this
  // from double-spawning if the effect re-runs.
  $effect(() => {
    if (!plunger.current) return
    loadBall()
  })

  // Runs in the simulation stage *before* the world steps, so the new motor
  // target is in place by the time rapier solves the joint forces this tick.
  usePhysicsTask((delta) => {
    const currentJoint = joint.current

    if (!configured) {
      currentJoint.configureMotorPosition(REST_OFFSET, SPRING_STIFFNESS, SPRING_DAMPING)
      configured = true
    }

    // ---- charge / autofire state machine ----
    if (gameState.holding) {
      gameState.charge = Math.min(1, gameState.charge + (delta * 1000) / CHARGE_TIME_MS)
      if (gameState.charge >= 1) gameState.autoFiring = true
    } else {
      gameState.charge = 0
      gameState.autoFiring = false
    }

    // ---- motor target + ball loading ----
    let target = REST_OFFSET

    if (gameState.autoFiring) {
      const now = performance.now()
      const phase = ((now - lastAutoFire) / AUTOFIRE_INTERVAL_MS) % 1
      if (phase < 0.45) {
        target = COMPRESSED_OFFSET
        if (phase < 0.1) loadBall()
      } else {
        target = REST_OFFSET
      }
      if (now - lastAutoFire > AUTOFIRE_INTERVAL_MS) lastAutoFire = now
    } else if (gameState.holding) {
      target = REST_OFFSET + (COMPRESSED_OFFSET - REST_OFFSET) * gameState.charge
      if (gameState.charge > 0.05) loadBall()
    }

    currentJoint.configureMotorPosition(target, SPRING_STIFFNESS, SPRING_DAMPING)
  })

  const sensorCenterY = (CHANNEL_BOTTOM_Y + CHANNEL_TOP_Y) / 2
  const sensorHalfHeight = (CHANNEL_TOP_Y - CHANNEL_BOTTOM_Y) / 2
</script>

<!-- Anchor — invisible joint root at the bottom of the launcher. -->
<T.Group position={[CHANNEL_X, ANCHOR_Y, 0]}>
  <RigidBody
    type="fixed"
    bind:rigidBody={$rigidBodyA}
  >
    <T.Mesh castShadow>
      <T.BoxGeometry args={[0.36, 0.1, 0.36]} />
      <T.MeshStandardMaterial
        color="#3a2a55"
        metalness={0.6}
        roughness={0.25}
      />
    </T.Mesh>
  </RigidBody>
</T.Group>

<!-- Plunger -->
<T.Group position={[CHANNEL_X, ANCHOR_Y + REST_OFFSET, 0]}>
  <RigidBody
    type="dynamic"
    bind:rigidBody={$rigidBodyB}
    enabledTranslations={[false, true, false]}
    enabledRotations={[false, false, false]}
    linearDamping={0.2}
    ccd
  >
    <Collider
      shape="cuboid"
      args={[0.12, PLUNGER_HALF_HEIGHT, 0.12]}
      restitution={0.1}
      friction={0.4}
      density={50}
    />
    <T.Mesh castShadow>
      <T.CylinderGeometry args={[0.12, 0.12, PLUNGER_HALF_HEIGHT * 2, 16]} />
      <T.MeshStandardMaterial
        color="#ff3366"
        emissive="#ff1144"
        emissiveIntensity={0.4 + gameState.charge * 0.8}
        metalness={0.5}
        roughness={0.3}
      />
    </T.Mesh>
  </RigidBody>
</T.Group>

<!-- Launch-zone sensor -->
<T.Group position={[CHANNEL_X, sensorCenterY, 0]}>
  <Collider
    shape="cuboid"
    args={[0.15, sensorHalfHeight, 0.18]}
    sensor
    onsensorenter={({ targetCollider }) => {
      if (!ballRegistry.has(targetCollider.handle)) return
      ballsInLaunchZone++
    }}
    onsensorexit={({ targetCollider }) => {
      if (!ballRegistry.has(targetCollider.handle)) return
      ballsInLaunchZone = Math.max(0, ballsInLaunchZone - 1)
    }}
  />
</T.Group>
