<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid, OrbitControls, Suspense, Text } from '@threlte/extras'
  import Model from './Model.svelte'
</script>

<T.PerspectiveCamera
  position={[0, 20, 20]}
  fov={30}
  makeDefault
>
  <OrbitControls />
</T.PerspectiveCamera>

<Grid />

<T.DirectionalLight position={[5, 10, 3]} />

<Suspense>
  <svelte:fragment slot="fallback">
    <Text
      text="Loading"
      fontSize={1}
      color="black"
      anchorX="50%"
      anchorY="50%"
    />
  </svelte:fragment>

  <Model />
</Suspense>
