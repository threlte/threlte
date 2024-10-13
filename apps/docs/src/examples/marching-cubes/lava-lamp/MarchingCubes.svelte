<script
  lang="ts"
  context="module"
>
  import { MarchingCubes } from 'three/examples/jsm/Addons.js'
  import { setContext as svelteSetContext, getContext as svelteGetContext } from 'svelte'
  import type { Task } from '@threlte/core'

  const KEY = Symbol('marching-cubes')

  type Context = Task

  const setMarchingCubesContext = (task: Task): Context => {
    return svelteSetContext<Context>(KEY, task)
  }

  export const getMarchingCubesContext = (): Context => {
    return svelteGetContext<Context>(KEY)
  }

  export const isMarchingCubes = (a: any): a is MarchingCubes => {
    return a.isMarchingCubes
  }

  const defaultResolution = 50
</script>

<script lang="ts">
  import type { Props } from '@threlte/core'
  import { MeshBasicMaterial } from 'three'
  import { T, useTask } from '@threlte/core'

  type MarchingCubesProps = {
    resolution?: number
    enableUvs?: boolean
    enableColors?: boolean
    isolation?: number
  } & Props<MarchingCubes>

  let {
    resolution = defaultResolution,
    children,
    ref = $bindable(),
    ...props
  }: MarchingCubesProps = $props()

  const material = new MeshBasicMaterial()
  const marchingCubes = new MarchingCubes(defaultResolution, material, true, true, 20_000)

  $effect(() => {
    if (resolution !== marchingCubes.resolution) {
      marchingCubes.init(resolution)
    }
  })

  const { task } = useTask(() => {
    marchingCubes.update()
    marchingCubes.reset()
  })

  setMarchingCubesContext(task)

  // cleanup default material if marchingCubes.material has been set to something else
  $effect(() => {
    return () => {
      if (marchingCubes.material !== material) {
        material.dispose()
      }
    }
  })
</script>

<T
  is={marchingCubes}
  bind:ref
  {...props}
>
  {@render children?.({ ref: marchingCubes })}
</T>
