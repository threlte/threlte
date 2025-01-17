<script lang="ts">
  import { T } from '@threlte/core'
  // import Knight from '../objects/knight.svelte'
  import Fruits from '../objects/fruits.svelte'
  import Coin from '../objects/coin.svelte'
</script>

<T.AmbientLight />

<!-- <Knight /> -->

<Fruits />
<Coin />

<!-- the platform -->
<!-- <T.Mesh
  rotation.x={-Math.PI / 2}
  receiveShadow
>
  <T.CircleGeometry args={[4, 40]} />
  <T.MeshStandardMaterial color="white" />
</T.Mesh> -->
