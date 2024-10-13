<script lang="ts">
  import MarchingCube from './MarchingCube.svelte'
  import MarchingCubes from './MarchingCubes.svelte'
  import MarchingPlane from './MarchingPlane.svelte'
  import type { MarchingPlaneAxis } from './MarchingPlane'
  import { Color, Vector2 } from 'three'
  import { OrbitControls } from '@threlte/extras'
  import { T, useTask } from '@threlte/core'

  type SceneProps = {
    ballCount?: number
    isolation?: number
    planeAxis: MarchingPlaneAxis
    resolution: number
  }

  let { ballCount = 5, isolation = 80, planeAxis = 'y', resolution = 50 }: SceneProps = $props()

  type Ball = {
    color: Color
    position: Vector2
  }

  /**
   * creates `count` randomly colored balls that are evenly distributed around a unit circle scaled by `scale`
   */
  const createBalls = (count: number, scale = 0.5): Ball[] => {
    const balls: Ball[] = []
    const m = (2 * Math.PI) / count
    for (let i = 0; i < count; i += 1) {
      const r = m * i
      const x = Math.cos(r)
      const y = Math.sin(r)
      const position = new Vector2(x, y).multiplyScalar(scale)
      const color = new Color().setRGB(Math.random(), Math.random(), Math.random())
      balls.push({ position, color })
    }
    return balls
  }

  let time = $state(0)
  useTask((delta) => {
    time += delta
  })

  const balls = $derived(createBalls(ballCount))
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={5}
>
  <OrbitControls autoRotate />
</T.PerspectiveCamera>

<T.AmbientLight />

<MarchingCubes
  enableColors
  {resolution}
  {isolation}
>
  <T.MeshStandardMaterial vertexColors />
  {#each balls as { position, color }, i}
    <MarchingCube
      position.x={position.x}
      position.z={position.y}
      position.y={0.5 * Math.sin(time + i) - 0.5}
      {color}
    />
  {/each}
  <MarchingPlane axis={planeAxis} />
</MarchingCubes>
