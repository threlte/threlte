<script lang='ts'>
  import { T } from '@threlte/core'
  import { teleportControls } from '@threlte/xr'
  import { colorOptions } from './colors'

  teleportControls('left')
  teleportControls('right')

  const pointOnCircle = (radius: number, theta: number) => {
    const x = radius * Math.cos(theta)
    const y = radius * Math.sin(theta)

    return { x, y }
  }

  const randomColor = () => {
    return colorOptions[Math.trunc(Math.random() * colorOptions.length)]!
  }

  const cylinders = Array.from({ length: 14 }).map((_, index) => {
    return {
      point: pointOnCircle(5, index / 2),
      color: randomColor(),
    }
  })
</script>

<T.Mesh
  teleportSurface
  receiveShadow
  rotation={[-Math.PI / 2, 0, 0]}
>
  <T.CircleGeometry args={[20]} />
  <T.MeshStandardMaterial color='#BDC3C7' />
</T.Mesh>

{#each cylinders as { point, color }, index}
  <T.Mesh
    name='cylinder {index}'
    teleportSurface
    position={[point.x, index / 2, point.y]}
    castShadow
    receiveShadow
  >
    <T.CylinderGeometry args={[1, 1, 0.1]} />
    <T.MeshStandardMaterial {color} />
  </T.Mesh>
{/each}
