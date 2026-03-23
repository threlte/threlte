<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Instance, InstancedMesh, useTexture } from '@threlte/extras'
  import { Color, DoubleSide, MathUtils, type Vector3Tuple } from 'three'

  let STARS_COUNT = 350
  let colors = ['#fcaa67', '#C75D59', '#ffffc7', '#8CC5C6', '#A5898C'] as const
  let stars = $state<Star[]>([])

  const map = useTexture('/spaceship-tutorial/textures/star.png')

  function r(min: number, max: number): number {
    let diff = Math.random() * (max - min)
    return min + diff
  }

  interface Star {
    id: string
    position: Vector3Tuple
    length: number
    speed: number
    color: Color
  }

  function resetStar(star: Star) {
    if (r(0, 1) > 0.8) {
      star.position = [r(-10, -30), r(-5, 5), r(6, -6)]
      star.length = r(1.5, 15)
    } else {
      star.position = [r(-15, -45), r(-10.5, 1.5), r(30, -45)]
      star.length = r(2.5, 20)
    }

    star.speed = r(19.5, 42)
    star.color
      .set(colors[Math.floor(Math.random() * colors.length)] ?? 'white')
      .convertSRGBToLinear()
      .multiplyScalar(1.3)
  }

  for (let i = 0; i < STARS_COUNT; i++) {
    const star: Star = {
      id: MathUtils.generateUUID(),
      position: [0, 0, 0],
      length: 0,
      speed: 0,
      color: new Color()
    }

    resetStar(star)
    stars.push(star)
  }

  useTask((delta) => {
    for (const star of stars) {
      star.position[0] += star.speed * delta
      if (star.position[0] > 40) {
        resetStar(star)
      }
    }
  })
</script>

{#await map then value}
  <InstancedMesh
    limit={STARS_COUNT}
    range={STARS_COUNT}
  >
    <T.PlaneGeometry args={[1, 0.05]} />
    <T.MeshBasicMaterial
      side={DoubleSide}
      alphaMap={value}
      transparent
    />

    {#each stars as { id, position, length, color } (id)}
      <Instance
        {position}
        scale={[length, 1, 1]}
        {color}
      />
    {/each}
  </InstancedMesh>
{/await}
