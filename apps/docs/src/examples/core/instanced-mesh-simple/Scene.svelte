<script lang="ts">
  import { MeshStandardMaterial, SphereBufferGeometry } from 'three'
  import { AmbientLight, DirectionalLight, Instance, InstancedMesh, useFrame } from '@threlte/core'

  const geometry = new SphereBufferGeometry(0.5)
  const material = new MeshStandardMaterial()

  let dn = Date.now()
  useFrame(() => (dn = Date.now()))
</script>

<InstancedMesh {geometry} {material}>
  <Instance position={{ x: -2, y: Math.sin(dn / 1000 + 40) }} />
  <Instance position={{ x: -1, y: Math.sin(dn / 1000 + 10) }} />
  <Instance position={{ x: 0, y: Math.sin(dn / 1000 + 5) }} />
  <Instance position={{ x: 1, y: Math.sin(dn / 1000 + 200) }} />
  <Instance position={{ x: 2, y: Math.sin(dn / 1000 + 550) }} />
</InstancedMesh>

<DirectionalLight position={{ y: 10, z: 5 }} />

<AmbientLight intensity={0.1} />
