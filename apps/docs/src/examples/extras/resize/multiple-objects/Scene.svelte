<script lang="ts">
  import { OrbitControls, Resize, useGltf } from '@threlte/extras'
  import { T } from '@threlte/core'

  const duck = useGltf('/models/Duck.glb')
  const fox = useGltf('/models/Fox.glb')

  const duckScale = 1
  // make the fox 15 times as big as the duck
  const foxScale = 15
</script>

<T.PerspectiveCamera
  makeDefault
  position={10}
>
  <OrbitControls />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.2} />
<T.DirectionalLight position={[1, 5, 3]} />

<T.Group position.y={-4}>
  {#await duck then { scene }}
    <Resize
      scale={duckScale}
      position.y={6.2}
    >
      <T is={scene} />
    </Resize>
  {/await}

  {#await fox then { scene }}
    <Resize scale={foxScale}>
      <T is={scene} />
    </Resize>
  {/await}
</T.Group>
