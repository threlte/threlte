<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid, OrbitControls, Sky, AnimatedInstancedSprite, SpriteFile } from '@threlte/extras'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import PlayerUpdater from './PlayerUpdater.svelte'
  import Spritesheet from 'node_modules/@threlte/extras/src/lib/components/AnimatedInstancedSprite/Spritesheet.svelte'
  import SpriteAnimation from 'node_modules/@threlte/extras/src/lib/components/AnimatedInstancedSprite/SpriteAnimation.svelte'

  export let billboarding = false
  export let fps: number
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
  count={10000}
  playmode={'FORWARD'}
  {fps}
  {billboarding}
>
  <Spritesheet
    textureUrl="/textures/sprites/player.png"
    dataUrl="/textures/sprites/player.json"
  >
    <SpriteFile>
      <SpriteAnimation name="fly" />
      <SpriteAnimation name="walk" />
      <SpriteAnimation name="idle" />
    </SpriteFile>
  </Spritesheet>
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
