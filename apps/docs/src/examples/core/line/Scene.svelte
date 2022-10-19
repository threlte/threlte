<script lang="ts">
  import { LineBasicMaterial, type Vector3Tuple } from 'three'
  import { Line, OrbitControls, PerspectiveCamera } from '@threlte/core'

  const lines: Vector3Tuple[][] = []
  for (let index = 0; index < 10; index++) {
    const points: Vector3Tuple[] = []
    for (let index = 0; index < 10; index++) {
      const point = [
        25 - Math.random() * 50,
        25 - Math.random() * 50,
        25 - Math.random() * 50
      ] as Vector3Tuple
      points.push(point)
    }
    lines.push(points)
  }

  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }
</script>

<PerspectiveCamera position={{ y: 80, x: 80, z: 80 }}>
  <OrbitControls enableZoom={false} autoRotate />
</PerspectiveCamera>

{#each lines as line}
  <Line
    points={line}
    material={new LineBasicMaterial({
      color: getRandomColor()
    })}
  />
{/each}
