<script lang="ts">
  import { types } from '@theatre/core'
  import { T } from '@threlte/core'
  import { Environment, OrbitControls, SoftShadows, Helper } from '@threlte/extras'
  import { SheetObject } from '@threlte/theatre'
  import { DirectionalLightHelper } from 'three'
  import Suzanne from './Suzanne.svelte'
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
            <Helper
              is={DirectionalLightHelper}
              args={[ref]}
            />
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
