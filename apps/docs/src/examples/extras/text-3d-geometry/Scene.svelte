<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, Text3DGeometry, Environment, Align, Float } from '@threlte/extras'
</script>

<Align let:align>
  <T.Mesh>
    <Text3DGeometry
      font={'/fonts/Inter-semibold.blob'}
      text={`hello\nthere!`}
      rotation.x={-0.28}
      size={5}
      height={1}
      bevelEnabled={true}
      bevelThickness={0.1}
      bevelSize={0.2}
      bevelSegments={20}
      smooth={0.1}
      on:rendered={align}
    />
    <T.MeshStandardMaterial
      color="#515151"
      metalness={1.0}
      roughness={0.1}
    />
  </T.Mesh>
</Align>

<Environment files="/hdr/shanghai_riverside_1k.hdr" />

<T.DirectionalLight
  position={[0, 5, 10]}
  intensity={0}
  color="red"
/>

<Float
  rotationIntensity={[0, 3, 0]}
  rotationSpeed={1}
  floatingRange={[-5, 5]}
  speed={1}
>
  <T.PerspectiveCamera
    makeDefault
    position.y={0}
    position.z={20}
    fov={90}
    on:create={({ ref }) => {
      ref.lookAt(0, 0, 0)
    }}
  >
    <OrbitControls
      enableDamping
      enablePan={false}
      enableZoom={false}
    />
  </T.PerspectiveCamera>
</Float>
