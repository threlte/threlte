<script lang="ts">
  import { createSpritesheet } from '@threejs-kit/instanced-sprite-mesh'
  import { T } from '@threlte/core'
  import { Grid, OrbitControls, Sky, AnimatedInstancedSprite } from '@threlte/extras'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import PlayerUpdater from './PlayerUpdater.svelte'

  const count = 1000

  const spritesheet = createSpritesheet()
    .add(
      '/textures/sprites/cacodaemon.png',
      {
        type: 'rowColumn',
        w: 8,
        h: 4
      },
      [
        { name: 'fly', frameRange: [0, 6] },
        { name: 'attack', frameRange: [8, 14] },
        { name: 'idle', frameRange: [16, 20] },
        { name: 'death', frameRange: [24, 32] }
      ]
    )
    .build()

  // const flyerSpritesheet = createSpritesheet()
  // 	.add(
  // 		'/textures/sprites/Monsters_Creatures_Fantasy/Flying_eye/Flight.png',
  // 		{
  // 			type: 'rowColumn',
  // 			w: 8,
  // 			h: 1
  // 		},
  // 		'fly'
  // 	)
  // 	.build();

  // const countdownSpritesheet = createSpritesheet()
  // 	.add(
  // 		'/textures/sprites/countdown_sprite.png',
  // 		{
  // 			type: 'rowColumn',
  // 			w: 10,
  // 			h: 1
  // 		},
  // 		'fly'
  // 	)
  // 	.build();
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
  loop={true}
  count={10000}
>
  <PlayerUpdater />
</AnimatedInstancedSprite>

<!-- {#await spritesheet then { spritesheet, texture }}
	<AnimatedInstancedSprite {spritesheet} {texture} fps={10} loop={true} {count}>
		<FlyerUpdater />
	</AnimatedInstancedSprite>
{/await}

{#await flyerSpritesheet then { spritesheet, texture }}
	<AnimatedInstancedSprite {spritesheet} {texture} fps={10} loop={true} count={count * 25}>
		<FlyerUpdater />
	</AnimatedInstancedSprite>
{/await} -->

<!-- {#await countdownSpritesheet then { spritesheet, texture }}
	<AnimatedInstancedSprite {spritesheet} {texture} fps={1} loop={true} count={count * 25}>
		<FlyerUpdater />
	</AnimatedInstancedSprite>
{/await} -->

<Sky elevation={0.15} />
<!-- <T.AmbientLight /> -->

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
