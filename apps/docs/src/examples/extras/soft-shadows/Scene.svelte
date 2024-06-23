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
  let:Transform
  props={{}}
  onchange={() => {
    lightHelper?.update()
  }}
  let:selected
>
  <Transform>
    <T.DirectionalLight
      position={[0, 0, 0]}
      castShadow
      let:ref
      shadow.mapSize.width={1024}
      shadow.mapSize.height={1024}
      shadow.bias={0.0001}
    >
      {#if selected}
        <Portal object={scene}>
          <T.DirectionalLightHelper
            bind:ref={lightHelper}
            args={[ref]}
          />
        </Portal>
      {/if}
    </T.DirectionalLight>
  </Transform>
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
  let:values
>
  {#if values.soft}
    <SoftShadows
      focus={values.focus}
      size={values.size}
      samples={values.samples}
    />
  {/if}
</SheetObject>

<Environment
  path="/hdr/"
  files="mpumalanga_veld_puresky_1k.hdr"
/>
