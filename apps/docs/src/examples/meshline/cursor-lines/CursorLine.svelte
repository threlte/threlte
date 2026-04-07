<script
  module
  lang="ts"
>
  const createPoints = (count: number) => {
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
  import { type Mesh, Vector3 } from 'three'
  import { T, useStage, useTask, useThrelte } from '@threlte/core'

  type CursorLineProps = Props<Mesh, [Vector3[]]> & {
    cursorPosition: Vector3Tuple
  }

  let { cursorPosition, children, ...props }: CursorLineProps = $props()

  const { renderStage } = useThrelte()

  const stage = useStage('cursor', {
    after: renderStage
  })

  const count = 20
  let front = $state.raw(createPoints(count))
  let back = createPoints(count)

  useTask(
    () => {
      back[0]?.fromArray(cursorPosition)

      for (let i = 1; i < count; i += 1) {
        back[i]?.copy(front[i - 1]!)
      }

      const temp = front
      front = back
      back = temp
    },
    { stage }
  )
</script>

<T.Mesh {...props}>
  {@render children?.(front)}
</T.Mesh>
