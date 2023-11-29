<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras'
  import { Vector3 } from 'three'
  import { spring } from 'svelte/motion'

  export let cursorPosition: { x: number; z: number }
  export let color: string
  export let width: number
  export let stiffness: number
  export let damping: number

  let sprungCursor = spring(
    { x: 0, z: 0 },
    {
      stiffness,
      damping
    }
  )

  let points: Vector3[] = []

  for (let j = 0; j < 50; j++) {
    points.push(new Vector3(0, 0, 0))
  }

  $: sprungCursor.set(cursorPosition)

  $: {
    if (points[0]) {
      points[0].x = $sprungCursor.x
      points[0].z = $sprungCursor.z
      points = points
    }
  }

  useTask((delta) => {
    let previousPoint = points[0]
    points.forEach((point, i) => {
      if (previousPoint && i > 0) {
        point.lerp(previousPoint, Math.pow(0.000001, delta))
        previousPoint = point
      }
    })
    points = points
  })
</script>

<T.Mesh {...$$restProps}>
  <MeshLineGeometry
    {points}
    shape={'taper'}
  />
  <MeshLineMaterial
    {width}
    {color}
    scaleDown={0.1}
    attenuate={false}
  />
</T.Mesh>
