<script lang="ts">
  import { T } from '@threlte/core'
  import {
    CameraControls,
    OrbitControls,
    TrackballControls,
    TransformControls
  } from '@threlte/extras'
  import { PerspectiveCamera } from 'three'

  interface Props {
    controls?: '<OrbitControls>' | '<TrackballControls>' | '<CameraControls>'
    autoPauseControls?: boolean
  }

  let { controls = '<OrbitControls>', autoPauseControls = true }: Props = $props()

  let camera = $state.raw<PerspectiveCamera>()
</script>

{#key controls}
  <T.PerspectiveCamera
    makeDefault
    position={[10, 5, 10]}
    bind:ref={camera}
  >
    {#if controls === '<TrackballControls>'}
      <TrackballControls />
    {:else if controls === '<OrbitControls>'}
      <OrbitControls />
    {:else if controls === '<CameraControls>'}
      <CameraControls />
    {/if}
  </T.PerspectiveCamera>
{/key}

<T.DirectionalLight
  position.y={10}
  position.z={10}
/>
<T.AmbientLight intensity={0.3} />

<T.GridHelper args={[10, 10]} />

<TransformControls
  {autoPauseControls}
  translationSnap={1}
  position.y={1}
>
  <T.Mesh>
    <T.BoxGeometry args={[2, 2, 2]} />
    <T.MeshStandardMaterial />
  </T.Mesh>
</TransformControls>
