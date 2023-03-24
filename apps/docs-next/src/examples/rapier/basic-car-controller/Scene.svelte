<script lang="ts">
  import { T } from '@threlte/core'
  import { Environment, HTML, useGltf } from '@threlte/extras'
  import { AutoColliders, RigidBody, useRapier } from '@threlte/rapier'
  import { BoxGeometry, MeshStandardMaterial } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import Car from './Car.svelte'
  import Ground from './Ground.svelte'

  const gltf = useGltf('/models/loop/loop.glb')

  const { world } = useRapier()
  world.maxStabilizationIterations = 10
  world.maxVelocityIterations = 10
  world.maxVelocityFrictionIterations = 16
</script>

<Environment
  path="/hdr/"
  files="shanghai_riverside_1k.hdr"
/>

<T.DirectionalLight position={[8, 20, -3]} />

<Ground />

<T.Group position={[-10, 3, -12]}>
  <RigidBody dominance={1}>
    <HTML
      transform
      sprite
      pointerEvents={'none'}
      position.y={1}
    >
      <p class="!text-orange">Dominance: 1</p>
    </HTML>
    <AutoColliders shape={'cuboid'}>
      <T.Mesh
        geometry={new BoxGeometry(1, 1, 1)}
        material={new MeshStandardMaterial()}
      />
    </AutoColliders>
  </RigidBody>
</T.Group>

<T.Group position={[-15, 3, -14]}>
  <RigidBody dominance={-1}>
    <HTML
      transform
      sprite
      pointerEvents={'none'}
      position.y={3}
    >
      <p class="!text-orange">Dominance: -1</p>
    </HTML>
    <AutoColliders shape={'cuboid'}>
      <T.Mesh
        geometry={new BoxGeometry(3, 3, 3)}
        material={new MeshStandardMaterial()}
      />
    </AutoColliders>
  </RigidBody>
</T.Group>

<T.Group position={[-13, 3, -10]}>
  <RigidBody dominance={0}>
    <HTML
      transform
      sprite
      pointerEvents={'none'}
      position.y={2}
    >
      <p class="!text-orange">Dominance: 0</p>
    </HTML>
    <AutoColliders shape={'cuboid'}>
      <T.Mesh
        geometry={new BoxGeometry(2, 2, 2)}
        material={new MeshStandardMaterial()}
      />
    </AutoColliders>
  </RigidBody>
</T.Group>

{#if $gltf}
  <AutoColliders shape={'trimesh'}>
    <T
      is={$gltf.scene}
      rotation.y={90 * DEG2RAD}
      position={[-50, -0.3, -3]}
    />
  </AutoColliders>
{/if}

<Car
  position.x={70}
  position.y={5}
>
  <T.PerspectiveCamera
    rotation={[-90 * DEG2RAD, 70 * DEG2RAD, 90 * DEG2RAD]}
    position.x={10}
    position.y={5}
    fov={60}
    makeDefault
  />
</Car>
