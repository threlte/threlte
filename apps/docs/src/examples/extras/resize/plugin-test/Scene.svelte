<script lang="ts">
  import { OrbitControls, Resize } from '@threlte/extras'
  import { T } from '@threlte/core'
  import { interactivity } from '@threlte/extras'

  interactivity()

  let show = $state(true)
</script>

<T.PerspectiveCamera
  makeDefault
  position={5}
>
  <OrbitControls />
</T.PerspectiveCamera>

<Resize
  auto
  onresize={() => console.log('resizing')}
>
  <T.Mesh
    position.x={2}
    onclick={() => {
      show = !show
    }}
  >
    <T.MeshBasicMaterial color="hotpink" />
    <T.BoxGeometry />
  </T.Mesh>
  <T.Mesh position.x={-2}>
    <T.MeshBasicMaterial color="cyan" />
    <T.SphereGeometry />
  </T.Mesh>
  {#if show}
    <T.Mesh position.z={-2}>
      <T.MeshBasicMaterial color="yellow" />
      <T.CylinderGeometry />
    </T.Mesh>
  {/if}
</Resize>
