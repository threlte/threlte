<script lang="ts">
  import { T } from '@threlte/core'
  import { SheetObject } from '@threlte/theatre'
  import KeyboardControls from './KeyboardControls.svelte'
  import { cubeGeometry } from './state'
  import DissolveMaterial from './materials/DissolveMaterial.svelte'
  import { types } from '@theatre/core'

  interface Props {
    key: string
  }

  let { key }: Props = $props()
</script>

<SheetObject {key}>
  {#snippet children({ Transform, Sync, Declare })}
    <KeyboardControls>
      {#snippet children({ transform })}
        <Transform {...transform}>
          <T.Mesh frustumCulled={false}>
            {#if $cubeGeometry}
              <T
                is={$cubeGeometry}
                dispose={false}
              />
            {/if}
            <Declare
              props={{
                progress: types.number(0, { range: [0, 1] }),
                noiseScale: types.number(1, { range: [0, 10] })
              }}
            >
              {#snippet children(values)}
                <DissolveMaterial
                  progress={values.values.progress}
                  scale={values.values.noiseScale}
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
                </DissolveMaterial>
              {/snippet}
            </Declare>
          </T.Mesh>
        </Transform>
      {/snippet}
    </KeyboardControls>
  {/snippet}
</SheetObject>
