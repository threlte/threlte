<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, TrackballControls, TransformControls } from '@threlte/extras'
  import { PerspectiveCamera } from 'three'

  interface Props {
    controls?: '<TrackballControls>' | '<OrbitControls>'
  }

  let { controls = '<OrbitControls>' }: Props = $props()

  let camera = $state.raw<PerspectiveCamera>()

  $effect(() => {
    if (controls === '<OrbitControls>') {
      // This snaps the camera back into a position that makes sense for OrbitControls
      camera?.up.set(0, 1, 0)
    }
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 5, 10]}
  bind:ref={camera}
>
  {#if controls === '<TrackballControls>'}
    <TrackballControls />
  {:else if controls === '<OrbitControls>'}
    <OrbitControls />
  {/if}
</T.PerspectiveCamera>

<T.DirectionalLight
  position.y={10}
  position.z={10}
/>
<T.AmbientLight intensity={0.3} />

<T.GridHelper args={[10, 10]} />

<TransformControls
  translationSnap={1}
  position.y={1}
>
  <T.Mesh>
    <T.BoxGeometry args={[2, 2, 2]} />
    <T.MeshStandardMaterial />
  </T.Mesh>
</TransformControls>
