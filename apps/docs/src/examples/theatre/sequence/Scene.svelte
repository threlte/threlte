<script lang="ts">
  import { T } from '@threlte/core'
  import { SheetObject } from '@threlte/theatre'
</script>

<!-- Box -->
<SheetObject key="Box">
  {#snippet children({ Transform, Sync })}
    <Transform>
      <T.Mesh
        receiveShadow
        castShadow
      >
        <T.BoxGeometry args={[1, 1, 1]} />
        <T.MeshStandardMaterial>
          <Sync
            color
            emissive
          />
        </T.MeshStandardMaterial>
      </T.Mesh>
    </Transform>
  {/snippet}
</SheetObject>

<T.DirectionalLight
  position={[0.5, 2, 1]}
  castShadow
/>

<T.AmbientLight intensity={0.2} />

<T.PerspectiveCamera
  position={[4, 5, 10]}
  makeDefault
  oncreate={({ ref }) => {
    ref.lookAt(0, 0.5, 0)
  }}
/>
