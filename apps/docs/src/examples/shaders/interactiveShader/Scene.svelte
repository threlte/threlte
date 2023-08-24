<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid, OrbitControls } from '@threlte/extras'
  import { createNoise2D } from 'simplex-noise'

  import { DoubleSide, PlaneGeometry, ShaderMaterial, Vector3 } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import fragmentShader from './fragment.glsl?raw'
  import vertexShader from './vertex.glsl?raw'

  import { interactivity } from '@threlte/extras'
  import { tweened } from 'svelte/motion'
  interactivity()

  const terrainSize = 20
  const geometry = new PlaneGeometry(terrainSize, terrainSize, 100, 100)
  const noise = createNoise2D()
  const vertices = geometry.getAttribute('position').array
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i]
    const y = vertices[i + 1]
    // @ts-ignore
    vertices[i + 2] = noise(x / 4, y / 4)
  }
  // needed for lighting
  geometry.computeVertexNormals()

  const pulsePosition = new Vector3()
  const pulseTimer = tweened(0)

  const shaderMaterial = new ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      pulsePosition: {
        value: pulsePosition
      },
      pulseTimer: { value: 0 }
    },
    vertexShader,
    fragmentShader,
    side: DoubleSide
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-30, 30, 30]}
  fov={15}
>
  <OrbitControls
    autoRotate
    target.y={1.5}
    autoRotateSpeed={0.2}
    enabled={false}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  intensity={0.8}
  position.x={5}
  position.y={10}
/>
<T.AmbientLight intensity={0.2} />

<Grid
  position.y={-0.001}
  cellColor="#ffffff"
  sectionColor="#ffffff"
  sectionThickness={0}
  fadeDistance={25}
  cellSize={2}
/>

<T.Mesh
  position.y={1.2}
  position.z={-0.75}
  {geometry}
  rotation.x={DEG2RAD * 90}
  on:click={({ point }) => {
    pulsePosition.set(point.x, point.y, point.z)
    pulseTimer.set(0, {
      duration: 0
    })
    pulseTimer.set(1, {
      duration: 500
    })
  }}
>
  <T
    is={shaderMaterial}
    uniforms.pulseTimer.value={$pulseTimer}
  />
</T.Mesh>
