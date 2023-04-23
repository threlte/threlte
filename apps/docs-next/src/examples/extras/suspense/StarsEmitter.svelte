<script lang="ts">
  import { T, useFrame } from '@threlte/core'
  import { InstancedMesh } from '@threlte/extras'
  import Star from './Star.svelte'

  type Star = {
    id: string
    spawnedAtFrame: number
  }

  const makeUniqueId = () => {
    return Math.random().toString(36).substring(2, 9)
  }

  let stars: Star[] = []
  /**
   * spawnRate is the number of stars to spawn per frame
   */
  const spawnRate = 5
  const lifetimeInFrames = 40

  let frame = 0
  useFrame(() => {
    frame += 1
    for (let i = 0; i < spawnRate; i++) {
      stars.push({
        id: makeUniqueId(),
        spawnedAtFrame: frame
      })
    }
    stars.forEach((star) => {
      if (frame - star.spawnedAtFrame > lifetimeInFrames) {
        // remove star from array
        stars.splice(stars.indexOf(star), 1)
      }
    })
    stars = stars
  })
</script>

<InstancedMesh>
  <T.BoxGeometry args={[0.02, 0.02, 30]} />
  <T.MeshBasicMaterial
    color="white"
    transparent
    opacity={0.5}
  />

  {#each stars as star (star.id)}
    <Star />
  {/each}
</InstancedMesh>
