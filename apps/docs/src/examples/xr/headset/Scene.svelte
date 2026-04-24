<script lang="ts">
  import { T } from '@threlte/core'
  import { Controller, Hand, Headset, XR, pointerControls, teleportControls } from '@threlte/xr'
  import { AudioListener, interactivity } from '@threlte/extras'
  import { MathUtils } from 'three'
  import Turntable from '../../extras/positional-audio/Turntable.svelte'
  import Speaker from '../../extras/positional-audio/Speaker.svelte'
  import Microphone from './Microphone.svelte'

  let turntable = $state.raw<Turntable>()

  let volume = $state(0)

  interactivity()
  pointerControls('left')
  pointerControls('right')
  teleportControls('left')
  teleportControls('right')
</script>

<XR>
  <Headset>
    <Microphone
      position={[-0.1, -0.05, -0.1]}
      rotation.x={Math.PI / 3}
    />
  </Headset>

  <Controller left />
  <Controller right />
  <Hand left />
  <Hand right />
</XR>

<Headset>
  <AudioListener />
</Headset>

<T.Mesh
  teleportSurface
  receiveShadow
  rotation.x={-Math.PI / 2}
>
  <T.CircleGeometry args={[10, 64]} />
  <T.MeshStandardMaterial color="#333333" />
</T.Mesh>

<T.Group
  position={[0, 0.6, -0.5]}
  scale={0.08}
>
  <Turntable
    bind:this={turntable}
    bind:volume
  />
  <Speaker
    position.x={6}
    rotation.y={MathUtils.DEG2RAD * -7}
    {volume}
  />
  <Speaker
    position.x={-6}
    rotation.y={MathUtils.DEG2RAD * 7}
    {volume}
  />
</T.Group>

<T.PerspectiveCamera
  makeDefault
  near={0.001}
  position={[0, 1, 2]}
/>

<T.AmbientLight />
<T.DirectionalLight />
