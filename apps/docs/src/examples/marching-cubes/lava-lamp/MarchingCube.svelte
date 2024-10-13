<script
  lang="ts"
  context="module"
>
  import { Vector3 } from 'three'

  const position = new Vector3()
</script>

<script lang="ts">
  import type { Color } from 'three'
  import { Group } from 'three'
  import { getMarchingCubesContext, isMarchingCubes } from './MarchingCubes.svelte'
  import type { Props } from '@threlte/core'
  import { T, useParent, useTask } from '@threlte/core'

  const parent = useParent()

  if (!isMarchingCubes($parent)) {
    throw new Error('Parent of <MarchingCube> must be a <MarchingCubes>.')
  }

  type MarchingCubeProps = {
    strength?: number
    subtract?: number
    color?: Color
  } & Props<Group>

  const group = new Group()

  let {
    color,
    strength = 0.5,
    subtract = 12,
    children,
    ref = $bindable(),
    ...props
  }: MarchingCubeProps = $props()

  const task = getMarchingCubesContext()

  useTask(
    () => {
      group.getWorldPosition(position)
      position.addScalar(1).multiplyScalar(0.5)
      parent.current.addBall(position.x, position.y, position.z, strength, subtract, color)
    },
    { after: task }
  )
</script>

<T
  is={group}
  bind:ref
  {...props}
>
  {@render children?.({ ref: group })}
</T>
