<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, TrackballControls, TransformControls } from '@threlte/extras'

  import { BoxGeometry, MeshStandardMaterial, PerspectiveCamera } from 'three'

  export let controls: '<TrackballControls>' | '<OrbitControls>' = '<OrbitControls>'

  let camera: PerspectiveCamera

  $: if (camera && controls === '<OrbitControls>') {
    // This snaps the camera back into a position that makes sense for OrbitControls
    camera.up.set(0, 1, 0)
  }
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 5, 10]}
  lookAt.y={0.5}
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
  <T.Mesh
    geometry={new BoxGeometry(2, 2, 2)}
    material={new MeshStandardMaterial()}
  />
</TransformControls>
