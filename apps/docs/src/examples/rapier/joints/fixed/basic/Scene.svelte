<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, SoftShadows } from '@threlte/extras'
  import { Collider, Debug, RigidBody } from '@threlte/rapier'
  import Hammer from './Hammer.svelte'
  import Tower from './Tower.svelte'

  interface Props {
    debug: boolean
    resetKey: number
  }

  let { debug, resetKey }: Props = $props()
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 7, 18]}
  fov={60}
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
  <Tower
    position={[-3, 0, 0]}
    color="#FE3D00"
  />
  <Tower
    position={[3, 0, 0]}
    color="#335086"
    jointed
  />
  <Hammer
    position={[-10, 3, 0]}
    rotation={[0, 0, -Math.PI / 6]}
    velocity={[15, 0, 0]}
  />
  <Hammer
    position={[10, 3, 0]}
    rotation={[0, 0, Math.PI / 6]}
    velocity={[-15, 0, 0]}
  />
{/key}

<T.Group position={[0, -0.5, 0]}>
  <RigidBody type="fixed">
    <Collider
      shape="cuboid"
      args={[12, 0.5, 5]}
    />
    <T.Mesh receiveShadow>
      <T.BoxGeometry args={[24, 1, 10]} />
      <T.MeshStandardMaterial color="#888" />
    </T.Mesh>
  </RigidBody>
</T.Group>
