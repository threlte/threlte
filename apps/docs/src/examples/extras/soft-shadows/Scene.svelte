<script lang="ts">
  import { T } from '@threlte/core'
  import { Environment, OrbitControls, SoftShadows } from '@threlte/extras'
  import Suzanne from './Suzanne.svelte'

  interface Props {
    enabled: boolean
    size: number
    focus: number
    samples: number
  }

  let { enabled, size, focus, samples }: Props = $props()
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 8, 15]}
  fov={36}
>
  <OrbitControls
    enableZoom={false}
    enableDamping
  />
</T.PerspectiveCamera>

<Suzanne />

<T.DirectionalLight
  position={[5, 8, 4]}
  castShadow
  shadow.mapSize.width={1024}
  shadow.mapSize.height={1024}
  shadow.bias={0.0001}
/>

{#if enabled}
  <SoftShadows
    {size}
    {focus}
    {samples}
  />
{/if}

<Environment url="/textures/equirectangular/hdr/mpumalanga_veld_puresky_1k.hdr" />
