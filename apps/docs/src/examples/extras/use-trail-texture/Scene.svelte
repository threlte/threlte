<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, useTrailTexture, interactivity } from '@threlte/extras'

  interactivity()

  let {
    maxAge = 750,
    radius = 0.3,
    intensity = 0.4,
    interpolate = 1,
    smoothing = 0.5,
    minForce = 0.3,
    displacementScale = 0.3,
    ease,
  }: {
    maxAge?: number
    radius?: number
    intensity?: number
    interpolate?: number
    smoothing?: number
    minForce?: number
    displacementScale?: number
    ease?: (t: number) => number
  } = $props()

  const { texture, onPointerMove } = useTrailTexture(() => ({
    size: 512,
    radius,
    maxAge,
    intensity,
    interpolate,
    smoothing,
    minForce,
    ease,
  }))
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

<T.Mesh onpointermove={onPointerMove}>
  <T.PlaneGeometry args={[3, 3, 128, 128]} />
  <T.MeshStandardMaterial
    displacementMap={texture}
    {displacementScale}
    color="#6366f1"
    roughness={0.4}
    metalness={0.1}
    wireframe
  />
</T.Mesh>
