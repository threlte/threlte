<script lang="ts">
  import { T, useThrelte } from '@threlte/core'

  const { renderer, invalidate } = useThrelte()
</script>

<T.Mesh>
  <T.BoxGeometry />
  <T.MeshStandardMaterial>
    <T.Color
      args={['#ff0000']}
      attach="color"
    />
  </T.MeshStandardMaterial>
</T.Mesh>

<T.DirectionalLight
  position.y={5}
  position.x={3}
/>

<T.PerspectiveCamera
  makeDefault
  position.y={10}
  position.x={10}
>
  {#snippet children({ ref: camera })}
    <T.OrbitControls
      args={[camera, renderer.domElement]}
      onchange={invalidate}
    />
  {/snippet}
</T.PerspectiveCamera>
