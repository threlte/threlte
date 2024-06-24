<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { SheetObject } from '$lib'
</script>

<T.PerspectiveCamera
  position={[3, 3, 3]}
  makeDefault
>
  <OrbitControls />
</T.PerspectiveCamera>

<!-- Box -->
<SheetObject key="Box">
  {#snippet children({ Transform, Sync })}
    <Transform>
      <T.Mesh
        receiveShadow
        castShadow
        position.y={0.5}
      >
        <T.BoxGeometry />
        <T.MeshStandardMaterial color="hotpink">
          <Sync
            color
            roughness
            metalness
          />
        </T.MeshStandardMaterial>
      </T.Mesh>
    </Transform>
  {/snippet}
</SheetObject>

<T.DirectionalLight />
<T.AmbientLight />
