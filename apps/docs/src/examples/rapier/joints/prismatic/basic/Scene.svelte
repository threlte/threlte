<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { Collider, Debug, RigidBody } from '@threlte/rapier'
  import Press from './Press.svelte'

  interface Props {
    debug: boolean
    resetKey: number
  }

  let { debug, resetKey }: Props = $props()

  const cubes: [number, number, number][] = [
    [-1.1, 1.0, -0.6],
    [-0.5, 1.0, 0.5],
    [0.2, 1.0, -0.3],
    [0.8, 1.0, 0.4],
    [1.2, 1.0, -0.5]
  ]
</script>

<T.PerspectiveCamera
  makeDefault
  position={[5, 4, 10]}
  fov={50}
>
  <OrbitControls
    enableDamping
    enableZoom={false}
    target={[0, 2.5, 0]}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  castShadow
  position={[8, 20, -3]}
/>
<T.AmbientLight intensity={0.4} />

{#if debug}
  <Debug />
{/if}

{#key resetKey}
  <Press />

  {#each cubes as pos (pos)}
    <T.Group position={pos}>
      <RigidBody>
        <Collider
          shape="cuboid"
          args={[0.15, 0.15, 0.15]}
          density={3}
          friction={1.5}
        />
        <T.Mesh castShadow>
          <T.BoxGeometry args={[0.3, 0.3, 0.3]} />
          <T.MeshStandardMaterial color="#FE3D00" />
        </T.Mesh>
      </RigidBody>
    </T.Group>
  {/each}
{/key}

<T.Group position={[0, -0.5, 0]}>
  <RigidBody type="fixed">
    <Collider
      shape="cuboid"
      args={[10, 0.5, 5]}
    />
    <T.Mesh receiveShadow>
      <T.BoxGeometry args={[20, 1, 10]} />
      <T.MeshStandardMaterial color="#888" />
    </T.Mesh>
  </RigidBody>
</T.Group>
