<script lang='ts'>
  import { T, Canvas } from '$lib'

  let mount = false

  setInterval(() => {
    mount = !mount
  }, 1000)
</script>

{#if mount}
<main>
  <Canvas>
    <T.PerspectiveCamera
      makeDefault
      position={[3, 3, 3]}
      on:create={({ ref }) => ref.lookAt(0, 0, 0)}
    />
    <T.Mesh>
      <T.MeshStandardMaterial color='hotpink' />
      <T.BoxGeometry />
    </T.Mesh>
    <T.DirectionalLight />
    <T.AmbientLight />
  </Canvas>
</main>
{/if}

<style>
  main {
    height: 100vh;
  }
</style>