<script lang="ts">
  import { T } from '@threlte/core'
  import { Gizmo, OrbitControls } from '@threlte/extras'
  import { BoxGeometry } from 'three'
</script>

<T.PerspectiveCamera
  makeDefault
  position={[15, 15, 15]}
  fov={36}
  target={[0, 0, 0]}
>
  <OrbitControls>
    <Gizmo />
  </OrbitControls>
</T.PerspectiveCamera>

<!-- Make a box in every second cell to show aligment -->

{#each { length: 10 } as _h, x}
  {#each { length: 10 } as _v, y}
    {#if x % 3 == 0 && y % 3 == 0}
      <T.Group position={[x - 4.5, 0.5, y - 4.5]}>
        <T.Mesh>
          <T.BoxGeometry />
          <T.MeshBasicMaterial
            args={[
              {
                color: '#ffffff',
                opacity: 0.9,
                transparent: true
              }
            ]}
          />
        </T.Mesh>
        <T.LineSegments>
          <T.EdgesGeometry args={[new BoxGeometry()]} />

          <T.MeshBasicMaterial
            args={[
              {
                color: 0x000000
              }
            ]}
          />
        </T.LineSegments>
      </T.Group>
    {/if}
  {/each}
{/each}
