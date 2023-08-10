<script lang='ts'>
  import { T, Canvas } from '$lib'
</script>

<main>
  <Canvas>
    <T.PerspectiveCamera
      makeDefault
      position={[3, 3, 3]}
    />
    <T.Mesh>
      <T.MeshStandardMaterial color='hotpink' />
      <T.BoxGeometry />
    </T.Mesh>
    <T.DirectionalLight />
    <T.AmbientLight />
  </Canvas>
</main>

<style>
  main {
    height: 100dvh;
  }
</style>