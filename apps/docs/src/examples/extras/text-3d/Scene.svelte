<script lang="ts">
  import { T, useLoader } from '@threlte/core'
  import { OrbitControls, Text3D, Align, Environment } from '@threlte/extras'
  import { FontLoader } from 'three/addons/loaders/FontLoader.js'

  let font = useLoader(FontLoader).load('/fonts/Inter-semibold.blob')
</script>

{#await $font then loadedFont}
  {#if loadedFont}
    <Align>
      <Text3D
        font={loadedFont}
        text={`hello there`}
        size={5}
        height={1}
        bevelEnabled={true}
        bevelThickness={0.1}
        bevelSize={0.1}
        bevelSegments={5}
      >
        <T.MeshStandardMaterial
          color="#313131"
          metalness={1.0}
          roughness={0.2}
        />
      </Text3D>
    </Align>
  {/if}
{/await}

<Environment files="/hdr/shanghai_riverside_1k.hdr" />

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
  />
</T.PerspectiveCamera>
