<script lang="ts">
  import { T } from '@threlte/core'
  import { XR, Controller, Hand, Headset, TeleportControls, useTeleport, useXR } from '$lib'
  import Gamepad from './Gamepad.svelte'

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
  <Controller left>
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

  <Controller right />

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

<TeleportControls>
  <T.Mesh
    receiveShadow
    teleportSurface
    position.y={-0.05}
  >
    <T.CylinderGeometry args={[2, 2, 0.1]} />
    <T.MeshStandardMaterial />
  </T.Mesh>
</TeleportControls>

<T.PerspectiveCamera
  makeDefault
  position={[3, 3, 3]}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
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
