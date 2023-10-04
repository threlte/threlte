<script lang="ts">
  import { T } from '@threlte/core'
  import { Align, OrbitControls } from '@threlte/extras'
  import { BufferGeometry, Vector3 } from 'three'

  const size = 30
  const count = size ** 3

  const vectorPositions: Vector3[] = []

  // 3D math squiggles
  for (let i = 0; i < count; i++) {
    // 1D to 3D array
    let x = i / (size * size)
    let y = (i / size) % size
    let z = i % size

    const vx =
      Math.sin(Math.abs(size - x) * 0.1) * Math.sin(Math.abs(size - y) * 0.1) * 10 +
      Math.random() * 0.1

    const vy =
      Math.sin(Math.abs(size - x) * 0.3) * Math.sin(Math.abs(size - y) * 0.3) * 10 +
      Math.random() * 0.1

    const vz = y + Math.random() * 0.01 * z

    vectorPositions.push(new Vector3(vx, vy, vz))
  }

  const pointsBufferGeometry = new BufferGeometry().setFromPoints(vectorPositions)
</script>

<T.PerspectiveCamera
  makeDefault
  position={[50, 50, 50]}
  fov={15}
>
  <OrbitControls autoRotate />
</T.PerspectiveCamera>

<T.DirectionalLight
  position.y={10}
  position.z={10}
/>

<Align>
  <T.Points>
    <T is={pointsBufferGeometry} />
    <T.PointsMaterial size={0.25} />
  </T.Points>
</Align>
