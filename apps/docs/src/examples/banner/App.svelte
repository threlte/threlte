<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import { ContactShadows, Float, Grid, OrbitControls } from '@threlte/extras'
</script>

<img src="/logo/threlte-logo.png" />
<div>
  <Canvas>
    <T.PerspectiveCamera
      makeDefault
      position={[-10, 10, 10]}
      fov={15}
    >
      <OrbitControls
        enableDamping
        target.y={1.5}
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

    <ContactShadows
      scale={10}
      blur={2}
      far={2.5}
      opacity={0.5}
    />

    <T.Group position={[2, 0, 0]}>
      <Float
        floatIntensity={1}
        floatingRange={[0, 1]}
      >
        <T.Mesh
          position.y={1.2}
          position.z={-0.75}
        >
          <T.BoxGeometry />
          <T.MeshStandardMaterial color="#0059BA" />
        </T.Mesh>
      </Float>

      <Float
        floatIntensity={1}
        floatingRange={[0, 1]}
      >
        <T.Mesh
          position={[1.2, 1.5, 0.75]}
          rotation.x={5}
          rotation.y={71}
        >
          <T.TorusKnotGeometry args={[0.5, 0.15, 100, 12, 2, 3]} />
          <T.MeshStandardMaterial color="#F85122" />
        </T.Mesh>
      </Float>

      <Float
        floatIntensity={1}
        floatingRange={[0, 1]}
      >
        <T.Mesh
          position={[-1.4, 1.5, 0.75]}
          rotation={[-5, 128, 10]}
        >
          <T.IcosahedronGeometry args={[1, 0]} />
          <T.MeshStandardMaterial color="#F8EBCE" />
        </T.Mesh>
      </Float>
    </T.Group>
  </Canvas>
</div>

<style>
  div {
    width: 100vw;
    height: 100vh;
    background: #171d27;
  }

  img {
    position: absolute;
    margin: calc(50vh - 100px) 8rem;
    height: 200px;
  }
</style>
