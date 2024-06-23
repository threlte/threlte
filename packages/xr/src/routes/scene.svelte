<script lang="ts">
  import { T } from '@threlte/core'
  import { XR, Controller, Hand, Headset, useTeleport, useXR } from '$lib'
  import Gamepad from './Gamepad.svelte'
  import Teleport from './Teleport.svelte'

  const { isPresenting } = useXR()
  const teleport = useTeleport()

  $: if ($isPresenting) teleport([0, 0, 5])

  let listenToGamepad = false
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === 'g') {
      listenToGamepad = !listenToGamepad
    }
  }}
/>

{#if listenToGamepad}
  <Gamepad />
{/if}

<Headset>
  <T.Mesh position.z={-0.5}>
    <T.CylinderGeometry args={[0.01, 0.01, 0.08]} />
    <T.MeshStandardMaterial color="orange" />
  </T.Mesh>
</Headset>

<XR>
  <Controller
    left
    onconnected={() => console.log('connect')}
    onselect={() => console.log('select')}
  >
    <T.Mesh>
      <T.CylinderGeometry args={[0.01, 0.01, 0.08]} />
      <T.MeshStandardMaterial color="orange" />
    </T.Mesh>
    <T.Mesh slot="target-ray">
      <T.BoxGeometry args={[0.05, 0.05, 0.05]} />
      <T.MeshStandardMaterial color="turquoise" />
    </T.Mesh>
    <T.Mesh slot="grip">
      <T.IcosahedronGeometry args={[0.02]} />
      <T.MeshStandardMaterial color="skyblue" />
    </T.Mesh>
  </Controller>

  <Controller
    right
    onconnected={() => console.log('connect')}
    onselect={() => console.log('select')}
  />

  <Hand left>
    <T.Mesh slot="wrist">
      <T.BoxGeometry args={[0.05, 0.05, 0.05]} />
      <T.MeshStandardMaterial color="turquoise" />
    </T.Mesh>
  </Hand>

  <Hand right>
    <T.Mesh>
      <T.BoxGeometry args={[0.05, 0.05, 0.05]} />
      <T.MeshStandardMaterial color="skyblue" />
    </T.Mesh>
  </Hand>
</XR>

<Teleport />

<T.PerspectiveCamera
  makeDefault
  position={[3, 3, 3]}
  oncreate={({ ref }) => ref.lookAt(0, 0, 0)}
/>

<T.Mesh
  position.y={0.5}
  castShadow
  receiveShadow
>
  <T.MeshStandardMaterial color="hotpink" />
  <T.BoxGeometry />
</T.Mesh>

<T.DirectionalLight castShadow />
<T.AmbientLight />
