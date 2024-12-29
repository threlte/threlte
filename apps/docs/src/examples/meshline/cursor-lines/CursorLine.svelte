<script lang="ts">
  import type { Props } from '@threlte/core'
  import type { Vector3Tuple } from 'three'
  import { Mesh, Vector3 } from 'three'
  import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras'
  import { Spring } from 'svelte/motion'
  import { T, useTask } from '@threlte/core'

  type CursorLineProps = Props<typeof Mesh> & {
    color: string
    cursorPosition: Vector3Tuple
    damping: number
    stiffness: number
    width: number
  }

  let { cursorPosition, color, width, stiffness, damping, ...props }: CursorLineProps = $props()

  const tween = Spring.of(() => cursorPosition, {
    damping,
    stiffness
  })

  const createPoints = (count = 50) => {
    const points: Vector3[] = []
    for (let i = 0; i < count; i += 1) {
      points.push(new Vector3())
    }
    return points
  }

  const count = 50
  let front = $state.raw(createPoints(count))
  // back doesn't need to be reactive because we're only concerned when `front` updates
  let back = createPoints(count)

  useTask((delta) => {
    back[0]?.fromArray(tween.current)
    const alpha = 1e-6 ** delta
    for (let i = 1; i < count; i += 1) {
      const first = back[i - 1]
      const second = back[i]
      second?.lerp(first, alpha)
    }
    const temp = front
    front = back
    back = temp
  })
</script>

<T.Mesh {...props}>
  <MeshLineGeometry
    points={front}
    shape="taper"
  />
  <MeshLineMaterial
    {width}
    {color}
    scaleDown={0.1}
    attenuate={false}
  />
</T.Mesh>
