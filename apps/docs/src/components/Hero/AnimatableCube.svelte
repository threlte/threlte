<script lang="ts">
  import { T } from '@threlte/core'
  import { SheetObject } from '@threlte/theatre'
  import KeyboardControls from './KeyboardControls.svelte'
  import { cubeGeometry } from './state'

  export let key: string
</script>

<SheetObject {key}>
  {#snippet children({ Transform, Sync })}
    <KeyboardControls>
      {#snippet children({ transform })}
        <Transform {...transform}>
          <T.Mesh frustumCulled={false}>
            <T
              is={$cubeGeometry}
              dispose={false}
            />
            <T.MeshStandardMaterial
              transparent
              roughness={0.418}
              metalness={0.6139}
              color="#ff1f00"
              emissive="#000105"
            >
              <Sync
                color
                opacity
                emissive
                roughness
                metalness
              />
            </T.MeshStandardMaterial>
          </T.Mesh>
        </Transform>
      {/snippet}
    </KeyboardControls>
  {/snippet}
</SheetObject>
