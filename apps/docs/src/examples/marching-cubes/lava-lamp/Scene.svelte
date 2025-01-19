<script lang="ts">
  import MarchingCubes from './MarchingCubes.svelte'
  import MarchingPlane from './MarchingPlane.svelte'
  import type { MarchingPlaneAxis } from './types'
  import { Color } from 'three'
  import { Environment, OrbitControls } from '@threlte/extras'
  import { MarchingCube } from './MarchingCube'
  import { T, useTask } from '@threlte/core'

  type SceneProps = {
    ballCount?: number
    isolation?: number
    planeAxis: MarchingPlaneAxis
    resolution: number
  }

  let { ballCount = 5, isolation = 80, planeAxis = 'y', resolution = 50 }: SceneProps = $props()

  const randomColor = (): Color => {
    return new Color().setRGB(Math.random(), Math.random(), Math.random())
  }

  /**
   * creates `count` randomly colored balls that are evenly distributed around a unit circle scaled by `scale`
   */
  const createBalls = (count: number, scale = 0.5): MarchingCube[] => {
    const balls: MarchingCube[] = []
    const m = (2 * Math.PI) / count
    for (let i = 0; i < count; i += 1) {
      const ball = new MarchingCube(randomColor())
      const r = m * i
      const x = Math.cos(r)
      const y = Math.sin(r)
      ball.position.set(x, 0, y).multiplyScalar(scale)
      balls.push(ball)
    }
    return balls
  }

  const balls = $derived(createBalls(ballCount))

  let time = 0
  useTask((delta) => {
    time += delta
    let i = 0
    for (const ball of balls) {
      ball.position.setY(0.5 * Math.sin(time + i) - 0.5)
      i += 1
    }
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={5}
>
  <OrbitControls autoRotate />
</T.PerspectiveCamera>

<Environment url="/textures/equirectangular/hdr/shanghai_riverside_1k.hdr" />

<MarchingCubes
  enableColors
  {resolution}
  {isolation}
>
  <T.MeshStandardMaterial vertexColors />
  {#each balls as ball}
    <T is={ball} />
  {/each}
  <MarchingPlane axis={planeAxis} />
</MarchingCubes>
