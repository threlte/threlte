<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T } from '@threlte/core'
  import { AutoColliders, RigidBody } from '@threlte/rapier'

  let rb = $state<RapierRigidBody>()

  export function reset() {
    if (!rb) return

    const zero = { x: 0, y: 0, z: 0 }
    rb.setTranslation(zero, true)
    rb.setRotation({ ...zero, w: 1 }, true)
    rb.setLinvel(zero, true)
    rb.setAngvel(zero, true)
  }
</script>

<T.PerspectiveCamera
  makeDefault
  position={[4, 3.5, 4]}
  oncreate={(ref) => ref.lookAt(0, -0.6, 0)}
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

<AutoColliders shape="cuboid">
  <T.Mesh
    receiveShadow
    position.y={-2}
  >
    <T.MeshStandardMaterial color="#64748b" />
    <T.BoxGeometry args={[3, 0.2, 3]} />
  </T.Mesh>
</AutoColliders>

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
