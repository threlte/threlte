<script lang="ts">
  import { CircleBufferGeometry, MeshStandardMaterial } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'

  import {
    AmbientLight,
    Canvas,
    DirectionalLight,
    GLTF,
    HemisphereLight,
    Mesh,
    OrbitControls,
    OrthographicCamera,
    useFrame
  } from 'threlte'

  const floorGeometry = new CircleBufferGeometry(4, 60)
  const floorMaterial = new MeshStandardMaterial()

  let loaded = false
</script>

<div class:loaded>
  <Canvas>
    <OrthographicCamera position={{ z: 10, y: 5 }} zoom={80}>
      <OrbitControls
        enableDamping
        enablePan={false}
        maxPolarAngle={DEG2RAD * 80}
        autoRotate
        enableZoom={false}
        target={{ y: 2 }}
      />
    </OrthographicCamera>

    <GLTF on:load={() => (loaded = true)} castShadow receiveShadow url={'/models/threlte.glb'} />
    <Mesh
      receiveShadow
      material={floorMaterial}
      geometry={floorGeometry}
      rotation={{ x: DEG2RAD * -90 }}
    />

    <DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
    <DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.2} />
    <AmbientLight intensity={0.2} />
  </Canvas>
</div>

<style>
  div {
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.4s;
  }

  div.loaded {
    opacity: 1;
  }
</style>
