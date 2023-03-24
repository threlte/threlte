<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T, useFrame } from '@threlte/core'
  import { HTML } from '@threlte/extras'
  import { Collider, RigidBody, useRapier } from '@threlte/rapier'
  import { onDestroy, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { BoxGeometry, MeshStandardMaterial, Vector3 } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import Axle from './Axle.svelte'

  import type { CarProps } from './Car.svelte'

  type $$Props = CarProps

  let parentRigidBody: RapierRigidBody

  const carContext = {
    speed: writable(0)
  }

  const { speed } = carContext

  setContext<typeof carContext>('threlte-car-context', carContext)

  const { world } = useRapier()
  const v3 = new Vector3()

  useFrame(() => {
    const s = parentRigidBody.linvel()
    v3.set(s.x, s.y, s.z)
    carContext.speed.set(v3.length())
  })

  const initialIterations = {
    maxStabilizationIterations: world.maxStabilizationIterations,
    maxVelocityFrictionIterations: world.maxVelocityFrictionIterations,
    maxVelocityIterations: world.maxVelocityIterations
  }

  world.maxStabilizationIterations *= 100
  world.maxVelocityFrictionIterations *= 100
  world.maxVelocityIterations *= 100

  onDestroy(() => {
    world.maxStabilizationIterations = initialIterations.maxStabilizationIterations
    world.maxVelocityFrictionIterations = initialIterations.maxVelocityFrictionIterations
    world.maxVelocityIterations = initialIterations.maxVelocityIterations
  })
</script>

<T.Group {...$$restProps}>
  <RigidBody
    bind:rigidBody={parentRigidBody}
    canSleep={false}
  >
    <Collider
      mass={1}
      shape={'cuboid'}
      args={[1.25, 0.4, 0.5]}
    />

    <!-- CAR BODY MESH -->
    <T.Mesh
      castShadow
      geometry={new BoxGeometry(2.5, 0.8, 1)}
      material={new MeshStandardMaterial()}
    />

    <slot />
    <HTML
      rotation.y={90 * DEG2RAD}
      transform
      position.x={3}
    >
      <p class="text-xs !text-orange">
        {($speed * 3.6).toFixed(0)} km/h
      </p>
    </HTML>
  </RigidBody>

  <!-- FRONT AXLES -->
  <Axle
    side={'left'}
    isSteered
    {parentRigidBody}
    position={[-1.2, -0.4, 0.8]}
    anchor={[-1.2, -0.4, 0.8]}
  />
  <Axle
    side={'right'}
    isSteered
    {parentRigidBody}
    position={[-1.2, -0.4, -0.8]}
    anchor={[-1.2, -0.4, -0.8]}
  />

  <!-- BACK AXLES -->
  <Axle
    isDriven
    side={'left'}
    {parentRigidBody}
    position={[1.2, -0.4, 0.8]}
    anchor={[1.2, -0.4, 0.8]}
  />
  <Axle
    isDriven
    side={'right'}
    {parentRigidBody}
    position={[1.2, -0.4, -0.8]}
    anchor={[1.2, -0.4, -0.8]}
  />
</T.Group>
