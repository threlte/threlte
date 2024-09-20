<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { createNoise2D } from 'simplex-noise'
  import { PlaneGeometry, Vector3 } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import fragmentShader from './fragment.glsl?raw'
  import vertexShader from './vertex.glsl?raw'
  import { interactivity } from '@threlte/extras'
  import { quadOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'

  // Terrain setup
  const terrainSize = 30
  const geometry = new PlaneGeometry(terrainSize, terrainSize, 100, 100)
  const noise = createNoise2D()
  const vertices = geometry.getAttribute('position').array
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i]
    const y = vertices[i + 1]
    // @ts-ignore
    vertices[i + 2] = noise(x / 5, y / 5) * 2 + noise(x / 40, y / 40) * 3
  }
  geometry.computeVertexNormals()

  // Interactivity and shader variables
  interactivity()
  const pulsePosition = new Vector3()
  const pulseTimer = tweened(0, {
    easing: quadOut
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-70, 50, 10]}
  fov={15}
>
  <OrbitControls
    autoRotate
    target.y={1.5}
    autoRotateSpeed={0.2}
  />
</T.PerspectiveCamera>

<T.Mesh
  {geometry}
  rotation.x={DEG2RAD * -90}
  onclick={({ point }) => {
    pulsePosition.set(point.x, point.y, point.z)
    pulseTimer.set(0, {
      duration: 0
    })
    pulseTimer.set(1, {
      duration: 2000
    })
  }}
>
  <T.ShaderMaterial
    {fragmentShader}
    {vertexShader}
    uniforms={{
      pulseTimer: {
        value: 0
      },
      pulsePosition: {
        value: pulsePosition
      }
    }}
    uniforms.pulseTimer.value={$pulseTimer}
  />
</T.Mesh>
