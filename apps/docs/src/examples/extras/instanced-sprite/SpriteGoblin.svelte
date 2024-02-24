<!--
	-	builds spritesheet from the SpritesheetMetadata object with buildSpritesheet.from
		utility. Multiple files, each with a single animation. Not set up for typescript
		animation name autocomplete. For that check SpriteFlyersTyped.svelte file
	- these sprites are stationary, but change their animation randomly very often
	- animation update is done directly on the underlying InstancedSpriteMesh exposed
		by a `ref` binding
 -->

<script lang="ts">
  import { useTask } from '@threlte/core'
  import { InstancedSprite, buildSpritesheet, type SpritesheetMetadata } from '@threlte/extras'
  import { Matrix4 } from 'three'

  export let billboarding = false
  export let fps: number

  // DECLARE SPRIRESHEET META & BUILD IT
  const goblinSpriteMeta: SpritesheetMetadata = [
    {
      url: '/textures/sprites/goblin/Attack.png',
      type: 'rowColumn',
      width: 8,
      height: 1,
      animations: [{ name: 'attack', frameRange: [0, 7] }]
    },
    {
      url: '/textures/sprites/goblin/Death.png',
      type: 'rowColumn',
      width: 4,
      height: 1,
      animations: [{ name: 'death', frameRange: [0, 3] }]
    },
    {
      url: '/textures/sprites/goblin/Idle.png',
      type: 'rowColumn',
      width: 4,
      height: 1,
      animations: [{ name: 'idle', frameRange: [0, 3] }]
    },
    {
      url: '/textures/sprites/goblin/Run.png',
      type: 'rowColumn',
      width: 8,
      height: 1,
      animations: [{ name: 'run', frameRange: [0, 8] }]
    },
    {
      url: '/textures/sprites/goblin/TakeHit.png',
      type: 'rowColumn',
      width: 4,
      height: 1,
      animations: [{ name: 'takeHit', frameRange: [0, 3] }]
    }
  ]

  const goblinSpritesheet = buildSpritesheet.from(goblinSpriteMeta)

  let spriteMesh: any
  const goblinCount = 80
  const goblinPositionSpread = 50
  const tempMatrix = new Matrix4()
  let animationNames: string[] = []

  /**
   * GOBLIN LOGIC -
   * randomize positions by directly accessing the instanced sprite api without any helpers
   */
  $: {
    if (spriteMesh) {
      //
      for (let i = 0; i < goblinCount; i++) {
        tempMatrix.makeScale(5, 5, 1)
        tempMatrix.setPosition(
          Math.random() * goblinPositionSpread - goblinPositionSpread / 2,
          0.85,
          Math.random() * goblinPositionSpread - goblinPositionSpread / 2
        )
        spriteMesh.setMatrixAt(i, tempMatrix)
      }
      animationNames = Object.keys(spriteMesh.spritesheet.animations)
    }
  }

  let goblinId = 0

  useTask(() => {
    if (spriteMesh) {
      // Pick a random animation for a goblin, 1 change per frame
      spriteMesh.animation.setAt(
        goblinId,
        animationNames[Math.floor(Math.random() * animationNames.length)]
      )
    }

    goblinId++
    if (goblinId > goblinCount) goblinId = 0
  })
</script>

{#await goblinSpritesheet.spritesheet then spritesheet}
  <InstancedSprite
    count={goblinCount}
    playmode={'FORWARD'}
    {spritesheet}
    {fps}
    {billboarding}
    bind:ref={spriteMesh}
    castShadow
  />
{/await}
