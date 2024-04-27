<script lang="ts">
  import { T } from '@threlte/core'
  import { Align, Environment, Float, OrbitControls, Text3DGeometry } from '@threlte/extras'

  export let text: string
  export let bevelEnabled: boolean
  export let bevelOffset: number
  export let bevelSegments: number
  export let bevelSize: number
  export let bevelThickness: number
  export let curveSegments: number
  export let height: number
  export let size: number
  export let smooth: number
</script>

<Align let:align>
  <T.Mesh>
    <Text3DGeometry
      font={'/fonts/Inter-semibold.blob'}
      {text}
      {bevelEnabled}
      {bevelOffset}
      {bevelSegments}
      {bevelSize}
      {bevelThickness}
      {curveSegments}
      {height}
      {size}
      {smooth}
      on:create={() => {
        align()
      }}
    />
    <T.MeshStandardMaterial
      color="#FD3F00"
      toneMapped={false}
      metalness={1.0}
      roughness={0.1}
    />
  </T.Mesh>
</Align>

<Environment files="/hdr/shanghai_riverside_1k.hdr" />

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
