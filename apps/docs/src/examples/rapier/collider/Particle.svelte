<script
  lang="ts"
  module
>
  const geometry = new BoxGeometry(0.25, 0.25, 0.25)
  const material = new MeshStandardMaterial()
</script>

<script lang="ts">
  import { T } from '@threlte/core'
  import { Collider, RigidBody } from '@threlte/rapier'
  import { BoxGeometry, MeshStandardMaterial, Quaternion, Vector3 } from 'three'

  interface Props {
    position: Vector3
    quaternion: Quaternion
  }

  let { position, quaternion }: Props = $props()
</script>

<T.Group
  position={position.toArray()}
  quaternion={quaternion.toArray()}
>
  <RigidBody type="dynamic">
    <Collider
      shape="cuboid"
      args={[0.125, 0.125, 0.125]}
    />
    <T.Mesh
      castShadow
      receiveShadow
      {geometry}
      {material}
    />
  </RigidBody>
</T.Group>
