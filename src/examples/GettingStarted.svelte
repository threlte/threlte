<script>
  import { CircleBufferGeometry, MeshStandardMaterial, BoxBufferGeometry, DoubleSide } from 'three'
  import {
    Canvas,
    DirectionalLight,
    HemisphereLight,
    Mesh,
    OrbitControls,
    PerspectiveCamera
  } from 'threlte'
</script>

<div>
  <Canvas>
    <PerspectiveCamera position={{ x: 10, y: 10, z: 10 }} fov={24}>
      <OrbitControls autoRotate />
    </PerspectiveCamera>

    <DirectionalLight shadow color={'white'} position={{ x: -15, y: 45, z: 20 }} />
    <HemisphereLight skyColor={'white'} groundColor={'#ac844c'} intensity={0.4} />

    <Mesh
      castShadow
      geometry={new BoxBufferGeometry(1, 1, 1)}
      material={new MeshStandardMaterial({ color: '#ff3e00' })}
    />

    <Mesh
      receiveShadow
      position={{ y: -0.5 }}
      rotation={{ x: -90 * (Math.PI / 180) }}
      geometry={new CircleBufferGeometry(3, 72)}
      material={new MeshStandardMaterial({ side: DoubleSide, color: 'white' })}
    />
  </Canvas>
</div>

<style>
  div {
    height: 600px;
  }
</style>
