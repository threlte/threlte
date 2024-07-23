<!--
	-	Example of using animations as a static sprite atlas
	- each frame is named and used as a different tree randomly
	- to achieve this playmode is "PAUSE" and autoUpdate={false}
	- the instanced sprite has to be updated once when initialized
		and then, each time the atlas changes
	- uses <Instance/> component instead of hook to set positions and frames
 -->

<script lang="ts">
  import { InstancedSprite, buildSpritesheet, type SpritesheetMetadata } from '@threlte/extras'
  import { AdaptedPoissonDiscSample as Sampler } from '../util'
  import type { Vector3Tuple } from 'three'

  export let billboarding = false

  const treeAtlasMeta = [
    {
      url: '/textures/sprites/trees-pixelart.png',
      type: 'rowColumn',
      width: 8,
      height: 3,
      animations: [
        { name: 'green_0', frameRange: [0, 0] },
        { name: 'green_1', frameRange: [1, 1] },
        { name: 'green_2', frameRange: [2, 2] },
        { name: 'green_3', frameRange: [3, 3] },
        { name: 'green_4', frameRange: [4, 4] },
        { name: 'green_5', frameRange: [5, 5] },
        { name: 'green_6', frameRange: [6, 6] },
        { name: 'green_7', frameRange: [7, 7] },
        { name: 'green_8', frameRange: [12, 12] },
        { name: 'green_9', frameRange: [13, 13] },
        { name: 'green_10', frameRange: [14, 14] },
        { name: 'green_11', frameRange: [15, 15] },
        { name: 'red_0', frameRange: [8, 8] },
        { name: 'red_1', frameRange: [9, 9] },
        { name: 'red_2', frameRange: [10, 10] },
        { name: 'red_3', frameRange: [11, 11] },
        { name: 'red_4', frameRange: [20, 20] },
        { name: 'red_5', frameRange: [21, 21] },
        { name: 'red_6', frameRange: [22, 22] },
        { name: 'red_7', frameRange: [23, 23] },
        { name: 'dead_0', frameRange: [16, 16] },
        { name: 'dead_1', frameRange: [17, 17] },
        { name: 'dead_2', frameRange: [18, 18] },
        { name: 'dead_3', frameRange: [19, 19] }
      ]
    }
  ] as const satisfies SpritesheetMetadata

  const treeAtlas = buildSpritesheet.from<typeof treeAtlasMeta>(treeAtlasMeta)

  const treePositions: Vector3Tuple[] = []

  for (let x = 0; x < 5; x++) {
    for (let z = 0; z < 5; z++) {
      treePositions.push([x, 0.5, z])
    }
  }

  const REGION_W = 600
  const REGION_Z = 600

  const greenTrees = 11
  const redTrees = 7
  const deadTrees = 3

  const maxRadius = 300

  const sampler = new Sampler(4, [REGION_W, REGION_Z], undefined, Math.random)

  const points = sampler.GeneratePoints().filter((v) => {
    return Math.sqrt((v[0] - REGION_W / 2) ** 2 + (v[1] - REGION_Z / 2) ** 2) < maxRadius
  })

  const pickRandomTreeType = () => {
    const rnd = Math.random()
    if (rnd > 0.97) {
      return `dead_${Math.floor(deadTrees * Math.random())}`
    }
    if (rnd > 0.9) {
      return `red_${Math.floor(redTrees * Math.random())}`
    }
    return `green_${Math.floor(greenTrees * Math.random())}`
  }

  let sprite: any

  $: {
    // manually update once to apply tree atlas
    // also, flip random trees on X axis for more variety
    if (sprite) {
      for (let i = 0; i < points.length; i++) {
        sprite.flipX.setAt(i, Math.random() > 0.6 ? true : false)
      }
      sprite.update()
    }
  }
</script>

{#await treeAtlas.spritesheet then spritesheet}
  <InstancedSprite
    count={points.length}
    autoUpdate={false}
    playmode={'PAUSE'}
    {billboarding}
    {spritesheet}
    bind:ref={sprite}
    castShadow
  >
    {#snippet children({ Instance })}
      {#each points as [x, z], i}
        {#if i < points.length / 2}
          <!-- Pick a random tree from atlas via animation name -->
          <Instance
            position={[x - REGION_W / 2, 1.5, z - REGION_Z / 2]}
            id={i}
            animationName={pickRandomTreeType()}
            scale={[3, 3]}
          />
        {:else}
          <!-- Set and freeze a random frame from the spritesheet -->
          <Instance
            position={[x - REGION_W / 2, 1.5, z - REGION_Z / 2]}
            id={i}
            scale={[3, 3]}
            frameId={Math.floor(Math.random() * 24)}
          />
        {/if}
      {/each}
    {/snippet}
  </InstancedSprite>
{/await}
