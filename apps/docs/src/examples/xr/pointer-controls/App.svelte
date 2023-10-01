<script lang='ts'>
  import { T, Canvas } from '@threlte/core'
  import { XR, Controller, VRButton } from '@threlte/xr'
  import { OrbitControls } from '@threlte/extras'
  import Scene from './Scene.svelte'
</script>

<Canvas>
  <Scene />

  <XR>
    <Controller left />
    <Controller right />

    <T.PerspectiveCamera slot='fallback' makeDefault position={[5, 5, 5]}>
      <OrbitControls />
    </T.PerspectiveCamera>
  </XR>

  <T.AmbientLight />
  <T.DirectionalLight />
</Canvas>

<VRButton />
