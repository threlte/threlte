<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid, OrbitControls, Sky, AnimatedInstancedSprite, SpriteFile } from '@threlte/extras'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import PlayerUpdater from './PlayerUpdater.svelte'
  import FlyerUpdater from './FlyerUpdater.svelte'
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

<Spritesheet
  textureUrl="/textures/sprites/player.png"
  dataUrl="/textures/sprites/player.json"
>
  <AnimatedInstancedSprite
    textureUrl="/textures/sprites/player.png"
    count={500}
    playmode={'FORWARD'}
    {fps}
    {billboarding}
  >
    <PlayerUpdater />
  </AnimatedInstancedSprite>
</Spritesheet>

<Spritesheet>
  <SpriteFile
    path="/textures/sprites/cacodaemon.png"
    options={{
      type: 'rowColumn',
      w: 8,
      h: 4
    }}
  >
    <SpriteAnimation
      name="fly"
      frameRange={[0, 6]}
    />
    <SpriteAnimation
      name="attack"
      frameRange={[8, 14]}
    />
    <SpriteAnimation
      name="idle"
      frameRange={[16, 20]}
    />
    <SpriteAnimation
      name="death"
      frameRange={[24, 32]}
    />
  </SpriteFile>

  <AnimatedInstancedSprite
    count={30000}
    playmode={'REVERSE'}
    {fps}
    {billboarding}
  >
    <FlyerUpdater />
  </AnimatedInstancedSprite>
</Spritesheet>

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
