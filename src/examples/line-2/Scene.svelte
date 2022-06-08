<script lang="ts">
  import type { Vector3Tuple } from 'three'
  import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
  import { DirectionalLight, Line2, OrbitControls, PerspectiveCamera } from 'threlte'

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
  <OrbitControls autoRotate enableZoom={false} />
</PerspectiveCamera>

<DirectionalLight position={{ y: 10 }} />

{#each lines as line}
  <Line2
    material={new LineMaterial({
      worldUnits: true,
      linewidth: 1,
      // @ts-ignore Bad types :/
      color: getRandomColor()
    })}
    points={line}
  />
{/each}
