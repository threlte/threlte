<script
  lang="ts"
  context="module"
>
  import { getMarchingCubesContext, isMarchingCubes } from './MarchingCubes.svelte'

  export type Axis = 'x' | 'y' | 'z'
  type addAxisMap = {
    [Key in Axis]: `addPlane${Uppercase<Key>}`
  }

  const map: addAxisMap = {
    x: 'addPlaneX',
    y: 'addPlaneY',
    z: 'addPlaneZ'
  }
</script>

<script lang="ts">
  import { useParent, useTask } from '@threlte/core'

  const parent = useParent()

  if (!isMarchingCubes($parent)) {
    throw new Error('Parent of <MarchingPlane> must be a <MarchingCubes>.')
  }

  type MarchingPlaneProps = {
    axis?: Axis
    strength?: number
    subtract?: number
  }

  let { axis = 'x', strength = 0.5, subtract = 12 }: MarchingPlaneProps = $props()

  const task = getMarchingCubesContext()

  useTask(
    () => {
      parent.current[map[axis]](strength, subtract)
    },
    { after: task }
  )
</script>
