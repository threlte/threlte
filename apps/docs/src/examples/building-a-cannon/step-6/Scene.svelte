<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T } from '@threlte/core'
  import { OrbitControls, SoftShadows } from '@threlte/extras'
  import { Collider, Debug, RigidBody } from '@threlte/rapier'
  import Cannon from './Cannon.svelte'

  type Props = {
    debug: boolean
    aim: number
    rows: number
    columns: number
    power: number
    fireSignal: number
    onscore: () => void
  }

  let { debug, aim, rows, columns, power, fireSignal, onscore }: Props = $props()

  const WALL_X = 7

  const bricks = $derived(
    Array.from({ length: columns * rows }, (_, i) => {
      const column = i % columns
      const row = Math.floor(i / columns)
      // Running bond: alternate rows shift relative to each other. Kept under
      // 0.245 so the end brick of an offset row still has its centre of mass over
      // the brick below it, otherwise it topples on its own.
      const stagger = row % 2 === 0 ? 0.15 : -0.15
      // Columns run across the firing line, so this is a wall facing the cannon
      // rather than a stack pointing away from it.
      const z = (column - (columns - 1) / 2 + stagger) * 1.02
      return {
        key: i,
        position: [WALL_X, 0.5 + row * 1.02, z] as [number, number, number]
      }
    })
  )

  // The shot leaves along the barrel, so the aim angle is the launch angle and
  // the impulse direction falls straight out of it. Only the forward part of
  // the barrel reaches past the trunnions.
  const PIVOT_HEIGHT = 0.8
  const PIVOT_X = 0.35
  const MUZZLE_FROM_PIVOT = 1.6 * 0.66
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

  // A tumbling brick crosses the plane several times, so each body is only
  // allowed to score once.
  const scored = new Set<number>()

  const onsensorenter = (event: { targetRigidBody: RapierRigidBody | null }) => {
    const body = event.targetRigidBody
    // The shot crosses the line too. Only bricks count, so they are tagged with
    // userData and everything else is ignored.
    if (!body || !(body.userData as { brick?: boolean } | undefined)?.brick) return
    if (scored.has(body.handle)) return
    scored.add(body.handle)
    onscore()
  }

  // Each shot mounts a fresh ball at the muzzle. Fire it once, as it appears.
  $effect(() => {
    const body = ball
    if (!body || fireSignal === 0 || firedFor === fireSignal) return
    firedFor = fireSignal
    body.applyImpulse({ x: Math.cos(aimRad) * power, y: Math.sin(aimRad) * power, z: 0 }, true)
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-9, 5, 6]}
  fov={45}
>
  <OrbitControls
    enableDamping
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
  shadow.mapSize.width={2048}
  shadow.mapSize.height={2048}
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

<Cannon aim={aimRad} />

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

<!-- A sensor generates intersection events instead of contacts, so bodies pass
     straight through it and simply get counted. It is invisible, which is why
     the finish line below shows the reader where it is. -->
<T.Group position={[WALL_X + 1.6, 2.5, 0]}>
  <RigidBody type="fixed">
    <Collider
      shape="cuboid"
      args={[0.15, 2.5, 4]}
      sensor
      {onsensorenter}
    />
  </RigidBody>
</T.Group>

<T.Group position={[WALL_X + 1.6, 0, 0]}>
  <T.Mesh position.y={0.03}>
    <T.BoxGeometry args={[0.3, 0.06, 8]} />
    <T.MeshStandardMaterial
      color="#B6FFEC"
      emissive="#54E8C6"
      emissiveIntensity={1.4}
    />
  </T.Mesh>
  {#each [4, -4] as postZ (postZ)}
    <T.Mesh
      castShadow
      position={[0, 1.3, postZ]}
    >
      <T.CylinderGeometry args={[0.075, 0.075, 2.6, 12]} />
      <T.MeshStandardMaterial
        color="#B6FFEC"
        emissive="#54E8C6"
        emissiveIntensity={0.9}
      />
    </T.Mesh>
  {/each}
</T.Group>

{#each bricks as brick (brick.key)}
  <T.Group position={brick.position}>
    <RigidBody userData={{ brick: true }}>
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
