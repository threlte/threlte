<script lang="ts">
  import { T } from '@threlte/core'
  import { Align, OrbitControls, PointsMaterial } from '@threlte/extras'
  import { BufferGeometry } from 'three'

  const size = 30
  const count = size ** 3

  const positions = new Float32Array(count * 3)

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

    //x
    positions[i * 3 + 0] = vx
    //y
    positions[i * 3 + 1] = vy
    //z
    positions[i * 3 + 2] = vz
  }
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
    <T.BufferGeometry>
      <T.BufferAttribute
        args={[positions, 3]}
        attach={({ parent, ref }) => {
          ;(parent as BufferGeometry).setAttribute('position', ref)
          return () => {
            // cleanup function called when ref changes or the component unmounts
            // https://threlte.xyz/docs/reference/core/t#attach
          }
        }}
      />
    </T.BufferGeometry>
    <PointsMaterial size={0.25} />
  </T.Points>
</Align>
