<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T } from '@threlte/core'
  import { OrbitControls, SoftShadows } from '@threlte/extras'
  import { Collider, Debug, RigidBody } from '@threlte/rapier'
  import Cannon from '../shared/Cannon.svelte'
  import { BARREL_LENGTH, PIVOT_HEIGHT, PIVOT_X } from '../shared/cannon'
  import { createWall } from '../shared/wall'

  type Props = {
    debug: boolean
    aim: number
    power: number
    fireSignal: number
  }

  let { debug, aim, power, fireSignal }: Props = $props()

  const bricks = createWall()

  // The shot leaves along the barrel, so the aim angle is the launch angle and
  // the impulse direction falls straight out of it. Only the forward part of
  // the barrel reaches past the trunnions.
  const MUZZLE_FROM_PIVOT = BARREL_LENGTH * 0.66

  // The power slider is a multiplier so its whole range reads on screen: 1 is
  // the tuned default, 2 a full-strength shot, 0.1 barely leaves the barrel.
  const FULL_POWER = 14
  const BALL_RADIUS = 0.24

  const aimRad = $derived((aim * Math.PI) / 180)
  const reach = $derived(MUZZLE_FROM_PIVOT + BALL_RADIUS + 0.05)
  const muzzle = $derived<[number, number, number]>([
    PIVOT_X + Math.cos(aimRad) * reach,
    PIVOT_HEIGHT + Math.sin(aimRad) * reach,
    0
  ])

  let ball = $state<RapierRigidBody | undefined>()
  let firedFor = 0

  // Each shot mounts a fresh ball at the muzzle. Fire it once, as it appears.
  $effect(() => {
    const body = ball
    if (!body || fireSignal === 0 || firedFor === fireSignal) return
    firedFor = fireSignal
    body.applyImpulse(
      { x: Math.cos(aimRad) * power * FULL_POWER, y: Math.sin(aimRad) * power * FULL_POWER, z: 0 },
      true
    )
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-9, 5, 6]}
  fov={45}
>
  <OrbitControls
    enableDamping
    enableZoom={false}
    target={[7, 1.2, 0]}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  castShadow
  intensity={2}
  position={[8, 20, 6]}
  shadow.camera.top={20}
  shadow.camera.bottom={-20}
  shadow.camera.left={-20}
  shadow.camera.right={20}
  shadow.mapSize.width={1024}
  shadow.mapSize.height={1024}
/>
<T.AmbientLight intensity={1} />

<SoftShadows />

{#if debug}
  <Debug />
{/if}

<!-- The ground never moves, so it is a fixed body. Note the collider is offset
     to sit where the mesh sits: a collider does not follow its mesh, they are
     positioned independently. -->
<RigidBody type="fixed">
  <T.Group position.y={-0.5}>
    <Collider
      shape="cuboid"
      args={[60, 0.5, 60]}
      friction={1}
    />
  </T.Group>
  <T.Mesh
    receiveShadow
    position.y={-0.5}
  >
    <T.BoxGeometry args={[120, 1, 120]} />
    <T.MeshStandardMaterial color="#4E5A46" />
  </T.Mesh>
</RigidBody>

<!-- The carriage never moves, so it is a fixed body. One box collider stands in
     for the whole assembly: colliders do not have to match the meshes. -->
<RigidBody type="fixed">
  <T.Group position.y={0.45}>
    <Collider
      shape="cuboid"
      args={[1, 0.45, 0.6]}
    />
  </T.Group>
  <Cannon aim={aimRad} />
</RigidBody>

<!-- Four properties turn a shot that behaves oddly into one that behaves:
     ccd stops it tunnelling through the wall at speed, restitution 0 stops it
     pinging off, friction lets it bite, and damping keeps a clipped corner from
     flinging it across the map. The density is the quiet one: at this radius it
     makes the ball heavier than a brick, so it drives through instead of
     bouncing back. -->
{#if fireSignal > 0}
  {#key fireSignal}
    <T.Group position={muzzle}>
      <RigidBody
        ccd
        linearDamping={0.05}
        angularDamping={0.8}
        bind:rigidBody={ball}
      >
        <Collider
          shape="ball"
          args={[BALL_RADIUS]}
          density={30}
          restitution={0}
          friction={0.8}
        />
        <T.Mesh castShadow>
          <T.SphereGeometry args={[BALL_RADIUS, 24, 16]} />
          <T.MeshStandardMaterial
            color="#222"
            metalness={0.8}
            roughness={0.3}
          />
        </T.Mesh>
      </RigidBody>
    </T.Group>
  {/key}
{/if}

{#each bricks as brick (brick.key)}
  <T.Group position={brick.position}>
    <RigidBody>
      <Collider
        shape="cuboid"
        args={[0.5, 0.5, 0.5]}
        friction={0.8}
        restitution={0}
      />
      <T.Mesh castShadow>
        <T.BoxGeometry args={[1, 1, 1]} />
        <T.MeshStandardMaterial color="#9C6B4E" />
      </T.Mesh>
    </RigidBody>
  </T.Group>
{/each}
