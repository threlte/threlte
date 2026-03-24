<script
  module
  lang="ts"
>
  const createPoints = (count = 50) => {
    const points: Vector3[] = []
    for (let i = 0; i < count; i += 1) {
      points.push(new Vector3())
    }
    return points
  }
</script>

<script lang="ts">
  import type { Props } from '@threlte/core'
  import type { Vector3Tuple } from 'three'
  import { Mesh, Vector3 } from 'three'
  import { T, useTask } from '@threlte/core'

  type CursorLineProps = Props<typeof Mesh, [{ getPoints(): Vector3[] }]> & {
    cursorPosition: Vector3Tuple
  }

  let { cursorPosition, children, ...props }: CursorLineProps = $props()

  const count = 50
  let front = $state.raw(createPoints(count))
  let back = createPoints(count)

  useTask((delta) => {
    back[0]?.fromArray(cursorPosition)
    const alpha = 1e-6 ** delta
    for (let i = 1; i < count; i += 1) {
      const first = back[i - 1]
      const second = back[i]

      if (first) {
        second?.lerp(first, alpha)
      }
    }
    const temp = front
    front = back
    back = temp
  })
</script>

<T.Mesh {...props}>
  {@render children?.({
    getPoints() {
      return front
    }
  })}
</T.Mesh>
