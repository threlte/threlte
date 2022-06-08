<script lang="ts">
  import {
    EdgesGeometry,
    LineBasicMaterial,
    MeshStandardMaterial,
    OctahedronBufferGeometry
  } from 'three'
  import { DirectionalLight, LineSegments, Mesh, OrbitControls, PerspectiveCamera } from 'threlte'

  const material = new LineBasicMaterial({
    color: 0x0000ff
  })

  const geometry = new OctahedronBufferGeometry(1, 1)

  const linesGeometry = new EdgesGeometry(geometry, 30)
</script>

<PerspectiveCamera position={{ y: 3, x: 3, z: 3 }}>
  <OrbitControls autoRotate enableZoom={false} />
</PerspectiveCamera>

<DirectionalLight position={{ y: 10 }} />

<Mesh
  {geometry}
  material={new MeshStandardMaterial({
    transparent: true,
    opacity: 0.5,
    flatShading: true
  })}
/>

<LineSegments scale={1.1} geometry={linesGeometry} {material} />
