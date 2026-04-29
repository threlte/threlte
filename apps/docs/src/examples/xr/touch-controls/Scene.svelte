<script lang="ts">
  import { T } from '@threlte/core'
  import { touchControls, useXR, Controller, Hand } from '@threlte/xr'
  import TouchDebug from './TouchDebug.svelte'
  import Button from './Button.svelte'

  const { isPresenting } = useXR()

  touchControls('left')
  touchControls('right')

  let debug = $state(false)
</script>

<Controller left />
<Controller right />
<Hand left />
<Hand right />

<Button
  position={[-0.18, 1.3, -0.25]}
  color="#e11d48"
/>
<Button
  position={[-0.06, 1.3, -0.25]}
  color="#16a34a"
/>
<Button
  position={[0.06, 1.3, -0.25]}
  color="#2563eb"
/>
<Button
  position={[0.18, 1.3, -0.25]}
  color="#6b7280"
  onclick={() => (debug = !debug)}
/>

<T.Mesh
  position.y={1.3}
  position.z={-0.3}
  scale={$isPresenting ? 1 : 0.001}
>
  <T.PlaneGeometry args={[0.6, 0.2]} />
  <T.MeshStandardMaterial
    color="#1f2937"
    transparent
    opacity={0.6}
  />
</T.Mesh>

{#if debug}
  <TouchDebug />
{/if}
