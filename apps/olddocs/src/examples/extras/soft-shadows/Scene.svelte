<script lang="ts">
  import { types } from '@theatre/core'
  import { T, useThrelte } from '@threlte/core'
  import { Environment, OrbitControls, Portal, SoftShadows } from '@threlte/extras'
  import { SheetObject } from '@threlte/theatre'
  import type { DirectionalLightHelper } from 'three'
  import Suzanne from './Suzanne.svelte'

  const { scene } = useThrelte()

  let lightHelper: DirectionalLightHelper
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 10, 20]}
  fov={36}
>
  <OrbitControls />
</T.PerspectiveCamera>

<Suzanne />

<SheetObject
  key="Light"
  props={{}}
  onchange={() => {
    lightHelper?.update()
  }}
>
  {#snippet children({ Transform, selected })}
    <Transform>
      <T.DirectionalLight
        position={[0, 0, 0]}
        castShadow
        shadow.mapSize.width={1024}
        shadow.mapSize.height={1024}
        shadow.bias={0.0001}
      >
        {#snippet children({ ref })}
          {#if selected}
            <Portal object={scene}>
              <T.DirectionalLightHelper
                bind:ref={lightHelper}
                args={[ref]}
              />
            </Portal>
          {/if}
        {/snippet}
      </T.DirectionalLight>
    </Transform>
  {/snippet}
</SheetObject>

<SheetObject
  key="Shadows"
  props={{
    soft: true,
    size: types.number(25, {
      range: [0, 100]
    }),
    focus: types.number(0, {
      range: [0, 10]
    }),
    samples: types.number(10, {
      range: [0, 100]
    })
  }}
>
  {#snippet children({ values })}
    {#if values.soft}
      <SoftShadows
        focus={values.focus}
        size={values.size}
        samples={values.samples}
      />
    {/if}
  {/snippet}
</SheetObject>

<Environment
  path="/hdr/"
  files="mpumalanga_veld_puresky_1k.hdr"
/>
