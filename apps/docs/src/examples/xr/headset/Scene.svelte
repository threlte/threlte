<script lang="ts">
  import { T } from '@threlte/core'
  import { Headset, XR, useXR } from '@threlte/xr'
  import { AudioListener } from '@threlte/extras'
  import { MathUtils } from 'three'
  import Turntable from '../../extras/positional-audio/Turntable.svelte'
  import Speaker from '../../extras/positional-audio/Speaker.svelte'
  import Microphone from './Microphone.svelte'

  let turntable = $state.raw<Turntable>()

  const { isPresenting } = useXR()

  let volume = $state(0)

  $effect.pre(() => {
    if ($isPresenting) turntable?.toggle()
  })
</script>

<XR>
  <Headset>
    <Microphone
      position={[-0.1, -0.05, -0.1]}
      rotation.x={Math.PI / 3}
    />
  </Headset>
</XR>

<Headset>
  <AudioListener />
</Headset>

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
