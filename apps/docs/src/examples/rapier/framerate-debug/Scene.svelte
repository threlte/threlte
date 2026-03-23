<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T } from '@threlte/core'
  import { Attractor, AutoColliders, RigidBody } from '@threlte/rapier'

  let rb = $state<RapierRigidBody>()
</script>

<svelte:window
  onkeydown={(e) => {
    if (e.key === 'p') {
      if (!rb) return
      const x = Math.random() * 3 - 1.5
      const y = Math.random() * 3 - 1.5
      const z = Math.random() * 3 - 1.5
      rb.setNextKinematicTranslation({ x, y, z })
    }
  }}
/>

<T.PerspectiveCamera
  makeDefault
  position={[3, 3, 3]}
  oncreate={(ref) => ref.lookAt(0, 0, 0.3)}
/>

<T.Group position={[0, 0, 0]}>
  <RigidBody
    bind:rigidBody={rb}
    type="dynamic"
  >
    <AutoColliders>
      <T.Mesh
        castShadow
        receiveShadow
      >
        <T.MeshStandardMaterial
          color="red"
          transparent
          opacity={0.4}
        />
        <T.BoxGeometry />
      </T.Mesh>
    </AutoColliders>
  </RigidBody>
</T.Group>

<Attractor
  position={[0, 0, 0.3]}
  strength={0.2}
  range={2}
  gravityType="linear"
/>

<T.AmbientLight />
<T.DirectionalLight
  position={[4, 10, 0]}
  castShadow
  shadow.mapSize={1024}
  shadow.camera.left={-10}
  shadow.camera.right={10}
  shadow.camera.top={10}
  shadow.camera.bottom={-10}
/>
