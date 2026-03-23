<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { Environment, OrbitControls, SoftShadows } from '@threlte/extras'
  import { SheetObject } from '@threlte/theatre'
  import type { DirectionalLightHelper } from 'three'
  import Suzanne from './Suzanne.svelte'

  const { scene } = useThrelte()

  let lightHelper = $state<DirectionalLightHelper>()
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
            <T.DirectionalLightHelper
              bind:ref={lightHelper}
              attach={scene}
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
    size: 25,
    focus: 0,
    samples: 10
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

<Environment url="/textures/equirectangular/hdr/mpumalanga_veld_puresky_1k.hdr" />
