<script lang="ts">
  import { BoxBufferGeometry, MeshStandardMaterial } from 'three'
  import { DirectionalLight, Mesh, useFrame } from '@threlte/core'

  let rotation = 0
  useFrame(() => {
    rotation += 0.01
  })
</script>

<DirectionalLight position={{ y: 10, z: 10 }} />

<Mesh
  rotation={{
    x: rotation,
    y: rotation,
    z: rotation
  }}
  geometry={new BoxBufferGeometry(2, 2, 2)}
  material={new MeshStandardMaterial()}
/>
