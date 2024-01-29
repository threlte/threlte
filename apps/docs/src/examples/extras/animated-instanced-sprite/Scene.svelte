<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid, OrbitControls, Sky, AnimatedInstancedSprite } from '@threlte/extras'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import PlayerUpdater from './PlayerUpdater.svelte'

  export let billboarding = false
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={15}
  position.y={7}
>
  <OrbitControls />
</T.PerspectiveCamera>

<slot />

<AnimatedInstancedSprite
  textureUrl="/textures/sprites/player.png"
  dataUrl="/textures/sprites/player.json"
  fps={10}
  count={50000}
  {billboarding}
>
  <PlayerUpdater />
</AnimatedInstancedSprite>

<Sky elevation={0.15} />

<T.Mesh
  rotation.x={-DEG2RAD * 90}
  receiveShadow
>
  <T.PlaneGeometry args={[1000, 100]} />
  <T.MeshStandardMaterial color={'#aa6644'} />
</T.Mesh>

<Grid
  infiniteGrid
  type={'grid'}
  sectionThickness={0.0}
  position.y={0.01}
/>
