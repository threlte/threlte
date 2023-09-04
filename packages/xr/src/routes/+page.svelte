<script lang="ts">
  import { T, Canvas } from '@threlte/core'
  import { XR, VRButton, Controller, Hand, TeleportControls } from '$lib'
</script>

<main>
  <Canvas>
    <XR>
      <Controller left>
        <T.Mesh>
          {@const radius = 0.01}
          {@const length = 0.08}
          <T.CylinderGeometry args={[radius, radius, length]} />
          <T.MeshStandardMaterial color='orange' />
        </T.Mesh>
        <T.Mesh slot='target-ray'>
          {@const size = 0.05}
          <T.BoxGeometry args={[size, size, size]} />
          <T.MeshStandardMaterial color='turquoise' />
        </T.Mesh>
        <T.Mesh slot='grip'>
          {@const radius = 0.02}
          <T.IcosahedronGeometry args={[radius]} />
          <T.MeshStandardMaterial color='skyblue' />
        </T.Mesh>
      </Controller>

      <Controller right />

      <Hand left>
        <T.Mesh slot='wrist'>
          {@const size = 0.05}
          <T.BoxGeometry args={[size, size, size]} />
          <T.MeshStandardMaterial color='turquoise' />
        </T.Mesh>
      </Hand>

      <Hand right>
        <T.Mesh>
          {@const size = 0.05}
          <T.BoxGeometry args={[size, size, size]} />
          <T.MeshStandardMaterial color='skyblue' />
        </T.Mesh>
      </Hand>
    </XR>

    <TeleportControls>
      <T.Mesh receiveShadow teleportSurface position.y={-0.05}>
        <T.CylinderGeometry args={[2, 2, 0.1]} />
        <T.MeshStandardMaterial />
      </T.Mesh>
    </TeleportControls>

    <T.PerspectiveCamera
      makeDefault
      position={[3, 3, 3]}
      on:create={({ ref }) => ref.lookAt(0, 0, 0)}
    />

    <T.Mesh position.y={0.5} castShadow receiveShadow>
      <T.MeshStandardMaterial color="hotpink" />
      <T.BoxGeometry />
    </T.Mesh>

    <T.DirectionalLight castShadow />
    <T.AmbientLight />
  </Canvas>

  <VRButton />
</main>

<style>
  main {
    height: 100dvh;
  }
</style>
