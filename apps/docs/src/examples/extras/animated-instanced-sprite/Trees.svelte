<script lang="ts">
  import {
    AnimatedInstancedSprite,
    SpriteAnimation,
    SpriteFile,
    Spritesheet
  } from '@threlte/extras'

  import { AdaptedPoissonDiscSample as Sampler } from '../../geometry/random-placement/poisson-random/sampling'

  import SpriteInstance from './SpriteInstance.svelte'
  import type { Vector3Tuple } from 'three'

  export let billboarding = false

  const treePositions: Vector3Tuple[] = []

  for (let x = 0; x < 5; x++) {
    for (let z = 0; z < 5; z++) {
      treePositions.push([x, 0.5, z])
    }
  }

  const REGION_W = 300
  const REGION_Z = 300

  const greenTrees = [0, 1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 15]
  const redTrees = [8, 9, 10, 11, 20, 21, 22, 23]
  const deadTrees = [16, 17, 18, 19]

  const sampler = new Sampler(1.5, [REGION_W, REGION_Z], undefined, Math.random)
  const points = sampler.GeneratePoints()

  const pickRandomTreeType = () => {
    const rnd = Math.random()

    if (rnd > 0.95) {
      return `deadTree_${Math.floor(deadTrees.length * Math.random())}`
    }
    if (rnd > 0.75) {
      return `redTree_${Math.floor(redTrees.length * Math.random())}`
    }

    return `greenTree_${Math.floor(greenTrees.length * Math.random())}`
  }
</script>

<Spritesheet>
  <SpriteFile
    path="/textures/sprites/trees-pixelart.png"
    options={{
      type: 'rowColumn',
      w: 8,
      h: 3
    }}
  >
    {#each greenTrees as frame, i}
      <SpriteAnimation
        name={`greenTree_${i}`}
        frameRange={[frame, frame + 1]}
      />
    {/each}
    {#each redTrees as frame, i}
      <SpriteAnimation
        name={`redTree_${i}`}
        frameRange={[frame, frame + 1]}
      />
    {/each}
    {#each deadTrees as frame, i}
      <SpriteAnimation
        name={`deadTree_${i}`}
        frameRange={[frame, frame + 1]}
      />
    {/each}
  </SpriteFile>

  <AnimatedInstancedSprite
    count={points.length}
    playmode={'FORWARD'}
    {billboarding}
  >
    {#each points as [x, z], i}
      <SpriteInstance
        position={[x - REGION_W / 2, 1.5, z - REGION_Z / 2]}
        id={i}
        animationName={pickRandomTreeType()}
        scale={[3, 3]}
      />
    {/each}
  </AnimatedInstancedSprite>
</Spritesheet>
