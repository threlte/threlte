<script>
  import { Canvas, T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { spring } from 'svelte/motion'
  import { degToRad } from 'three/src/math/MathUtils.js'

  const scale = spring(1)
</script>

<div>
  <Canvas>
    <T.PerspectiveCamera
      makeDefault
      position={[10, 10, 10]}
      fov={24}
    >
      <OrbitControls
        maxPolarAngle={degToRad(80)}
        enableZoom={false}
        target.y={0.5}
      />
    </T.PerspectiveCamera>

    <T.DirectionalLight
      castShadow
      position={[3, 10, 10]}
    />
    <T.DirectionalLight
      position={[-3, 10, -10]}
      intensity={0.2}
    />
    <T.AmbientLight intensity={0.2} />

    <!-- Cube -->
    <T.Group scale={$scale}>
      <T.Mesh
        position.y={0.5}
        castShadow
        onpointerenter={() => ($scale = 2)}
        onpointerleave={() => ($scale = 1)}
      >
        <T.BoxGeometry />
        <T.MeshStandardMaterial color="#333333" />
      </T.Mesh>
    </T.Group>

    <!-- Floor -->
    <T.Mesh
      receiveShadow
      rotation.x={degToRad(-90)}
    >
      <T.CircleGeometry args={[3, 72]} />
      <T.MeshStandardMaterial color="white" />
    </T.Mesh>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
    width: 100%;
  }
</style>
