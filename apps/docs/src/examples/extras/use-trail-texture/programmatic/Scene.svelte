<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { OrbitControls, useTrailTexture } from '@threlte/extras'

  const { texture, setTrail } = useTrailTexture(() => ({
    size: 512,
    radius: 0.4,
    maxAge: 1500,
    intensity: 0.3,
    interpolate: 2,
  }))

  let time = 0
  useTask((delta) => {
    time += delta * 1.5
    setTrail({
      x: 0.5 + Math.sin(time) * 0.25,
      y: 0.5 + Math.sin(time * 2) * 0.15,
    })
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-3, 3, 3]}
  fov={45}
>
  <OrbitControls enableZoom={false} />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.3} />
<T.DirectionalLight
  position={[2, 4, 3]}
  intensity={1.5}
/>

<T.Mesh>
  <T.PlaneGeometry args={[3, 3, 128, 128]} />
  <T.MeshStandardMaterial
    displacementMap={texture}
    displacementScale={0.3}
    color="#14b8a6"
    roughness={0.4}
    metalness={0.1}
    wireframe
  />
</T.Mesh>
