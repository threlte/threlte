<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, SoftShadows } from '@threlte/extras'
  import { Collider, RigidBody } from '@threlte/rapier'

  let { materials } = $props()

  const stack = Array.from({ length: 4 }, (_, i) => i)
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 8, 10]}
  fov={45}
>
  <OrbitControls
    enableDamping
    enableZoom={false}
  />
</T.PerspectiveCamera>

<SoftShadows />

<T.DirectionalLight
  castShadow
  position={[3, 20, -3]}
/>
<T.AmbientLight intensity={0.4} />

{#each stack as i}
  {#each ['capsule', 'cuboid', 'ball'] as const as shape, j (shape)}
    <T.Group position={[(i % 2) * 0.2 - 0.1, 1 + i * j * 1.05, 0]}>
      <RigidBody>
        <Collider
          {shape}
          args={[0.5, 0.5, 0.5]}
          restitution={0.2}
        />
        <T.Mesh
          castShadow
          receiveShadow
        >
          {#if shape === 'cuboid'}
            <T.BoxGeometry args={[1, 1, 1]} />
          {:else if shape === 'capsule'}
            <T.CapsuleGeometry args={[0.5, 1]} />
          {:else}
            <T.SphereGeometry args={[0.5]} />
          {/if}
          <T.MeshStandardMaterial
            color="orange"
            transparent
            opacity={materials ? 1 : 0}
          />
        </T.Mesh>
      </RigidBody>
    </T.Group>
  {/each}
{/each}

<T.Group
  position={[0, -0.5, 0]}
  rotation.x={Math.PI / 6}
>
  <RigidBody type="fixed">
    <Collider
      shape="cuboid"
      args={[5, 0.5, 5]}
    />
    <T.Mesh receiveShadow>
      <T.BoxGeometry args={[10, 1, 10]} />
      <T.MeshStandardMaterial color="#888" />
    </T.Mesh>
  </RigidBody>
</T.Group>

<T.Group position={[0, -8, 0]}>
  <Collider
    args={[15, 1, 15]}
    sensor
    shape="cuboid"
    onsensorenter={(event) => {
      const body = event.targetRigidBody
      body?.setLinvel({ x: 0, y: 0, z: 0 }, true)
      body?.setAngvel({ x: 0, y: 0, z: 0 }, true)
      body?.setTranslation({ x: 0, y: 15, z: 0 }, true)
    }}
  />
</T.Group>
