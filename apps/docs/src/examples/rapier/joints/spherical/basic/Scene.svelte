<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, SoftShadows } from '@threlte/extras'
  import { Collider, Debug, RigidBody } from '@threlte/rapier'
  import Chain from './Chain.svelte'

  interface Props {
    debug: boolean
    resetKey: number
  }

  let { debug, resetKey }: Props = $props()

  const tower = Array.from({ length: 4 }, (_, i) => i)
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 5, 12]}
  fov={55}
>
  <OrbitControls
    enableDamping
    enableZoom={false}
    target={[0, 2.5, 0]}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  castShadow
  intensity={2}
  position={[8, 20, -3]}
  shadow.camera.top={-20}
  shadow.camera.bottom={20}
  shadow.mapSize.width={1024}
  shadow.mapSize.height={1024}
/>
<T.AmbientLight intensity={1} />

<SoftShadows />

{#if debug}
  <Debug />
{/if}

{#key resetKey}
  <Chain />

  {#each tower as i}
    <T.Group position={[3, 0.5 + i, 0]}>
      <RigidBody>
        <Collider
          shape="cuboid"
          args={[0.4, 0.4, 0.4]}
        />
        <T.Mesh castShadow>
          <T.BoxGeometry args={[0.8, 0.8, 0.8]} />
          <T.MeshStandardMaterial color="#335086" />
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
