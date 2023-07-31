<script
  lang="ts"
  context="module"
>
  const geometry = new BoxGeometry(0.25, 0.25, 0.25)
  const material = new MeshStandardMaterial()
</script>

<script lang="ts">
  import { T } from '@threlte/core'
  import { Collider, RigidBody } from '@threlte/rapier'
  import type { Euler } from 'three'
  import { BoxGeometry, MeshStandardMaterial, Vector3 } from 'three'

  export let position: Parameters<Vector3['set']>
  export let rotation: Parameters<Euler['set']>
</script>

<T.Group
  {position}
  {rotation}
>
  <RigidBody type={'dynamic'}>
    <Collider
      shape={'cuboid'}
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
